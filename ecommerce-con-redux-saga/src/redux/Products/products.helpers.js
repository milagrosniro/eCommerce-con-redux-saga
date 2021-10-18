import { firestore } from './../../firebase/utils';

export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
      //obtengo de firestore la colleccion de productios, el doc y seteo con el producto
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;

    let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    if (filterType) ref = ref.where('productCategory', '==', filterType);

    //si clickearon Load More
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then(snapshot => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts, //productos previo que estaban cargados
          ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products') //busca en product-el doc con el ID y lo elemina
      .doc(documentID)
      .delete()
      .then(() => {
        //console.log(documentID, 2)
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then(snapshot => {

        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID
          });
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}