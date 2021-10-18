import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from '@firebase/auth';

 
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);



 export const firestore = firebase.firestore();

export const GoogleProvider = new GoogleAuthProvider();
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({prompt: 'select_account'})

//se abre un popUp para q inicie sesion
// export const signInWithGoogle = () => auth.signInWithPopUp(GoogleProvider);

// export const auth = firebase.auth();
export const auth = getAuth();

export const handleUserProfile = async ({userAuth, additionalData})=>{
    if(!userAuth) return;
    const {uid}= userAuth; //id del usuario

    const userRef = firestore.doc(`users/${uid}`); //usuario lo buscamos en firebase

    const snapshot = await userRef.get();
    //si no esta en la DB lo creo y lo guardo
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        const userRoles = ['user']

        try{
await userRef.set({
    displayName,
    email,
    createdDate: timestamp,
    userRoles,
    ...additionalData

})
        }catch(err){
console.log(err)
        }
    }
    return userRef // es el obje q contiene el display name, etc
}

export const getCurrentUser = ()=>{
    return new Promise((resolve, reject)=> {
        const unsuscribe = onAuthStateChanged(auth, (userAuth) =>{
            unsuscribe();
            resolve(userAuth);
            // alert("FUNCIONA CURRENT")
        }, reject)
    })
    
}