import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, setProduct, fetchProductsStart } from './products.actions';
import { handleAddProduct, handleFetchProducts,
  handleFetchProduct, handleDeleteProduct } from './products.helpers';
import productsTypes from './products.types';

//agregar producto a la DB
export function* addProduct({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload, //envio todo el obj del producto
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(
        //para colocarlo uno abajo del otro
      fetchProductsStart()
    );


  } catch (err) {
     console.log(err);
  }

}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload); //devuelve el porducto
    yield put(
      setProducts(products)
    ); //despacho  la funcion q coloca el producto en el estado product

  } catch (err) {
     console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload); //payload es el ID, llamo a al funcion q elimina el prod
    yield put (
      fetchProductsStart()
    );

  } catch (err) {
     console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(
      setProduct(product)
    );

  } catch (err) {
     console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

//exporto todas las funciones
export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ])
}