import {all, call} from 'redux-saga/effects';
import userSagas from './user.sagas';
import productsSagas from '../Products/products.sagas';
 import ordersSagas from '../Orders/orders.sagas';

//funcion que permite usar las funciones en el redux
export default function* rootSaga(){
    yield all([call(userSagas), call(productsSagas), call(ordersSagas)
    ])
}