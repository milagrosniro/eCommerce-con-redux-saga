import {takeLatest, call, all, put} from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from "../../firebase/utils";
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess } from "./user.actions";
import { signInWithEmailAndPassword } from '@firebase/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { handleResetPasswordAPI } from './user.helpers';
import { signInWithPopup } from '@firebase/auth';
import { signOut } from '@firebase/auth';

export function* getSnapshotFromUserAuth(user, additionalData= {}){
    try{    
                 const userRef = yield call(handleUserProfile, {userAuth: user, additionalData}) //crequea si el usuario inicio sesion (userAuth); //que devuelva al usuario 
                  const snapshot = yield userRef.get();
                 
                  yield put(signInSuccess({
                    id: snapshot.id,
                    ...snapshot.data()
                  }))
  
    }catch(err){
        console.log(err)
    }
}

export function* emailSignIn({payload:{email, password}}){
        try{
           const {user} = yield signInWithEmailAndPassword(auth,email, password);

           yield getSnapshotFromUserAuth(user)

        }catch(err){
            console.log(err)
        }

}
export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGNIN_START, emailSignIn);
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();

        if(!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth);

    }catch(err){
        console.log(err)
    }
}

export function* onCheckUserSession(){
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser(){
    try{
       yield signOut(auth);
       yield put(signOutUserSuccess()) //"despacha la funcion"

    }catch(err){
        console.log(err)
    }
}

export function* onSignOutUserStart(){
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({payload: {displayName, email, password, confirmPassword}}){
  if(password !== confirmPassword){
      const err = ['Password don`t match'];      
      yield put(userError(err));
      return    
  }
  try{       
      //creo el usuario
      const {user} = yield createUserWithEmailAndPassword(auth, email, password);
      const additionalData = {displayName}

      yield getSnapshotFromUserAuth(user, additionalData )

      //lo agrego a la DB  
  }catch(err){
      console.log(err)
  }
}

export function* onSignUpUserStart(){
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email }}) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(
      resetPasswordSuccess()
    );

  } catch (err) {
    yield put(
      userError(err)
    )
  }
}

  export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
  }
  
  export function* googleSignIn() {
    try {
      const { user } = yield signInWithPopup(auth,GoogleProvider);
      yield getSnapshotFromUserAuth(user);
  
    } catch (err) {
       console.log(err);
    }
  }
  
  export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
  }

export default function* userSagas(){
    yield all([call(onEmailSignInStart), call(onCheckUserSession), 
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)  
 ]) 
}
