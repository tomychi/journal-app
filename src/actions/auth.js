import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app, googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';


export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{


        dispatch(startLoading());

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );

                dispatch(finishLoading());

            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(finishLoading());

                Swal.fire('Error', errorMessage, 'error');
            });        
    }
}

export const startRegisterWithEmailPasswordAndPasssword = (email, password, name) =>{
    return (dispatch) =>{
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {
                await updateProfile( user, { displayName: name });
                console.log(user);
            })
            .catch(error => {
                const errorMessage = error.message;
                Swal.fire('Error', errorMessage, 'error');
            });
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth(app);

        signInWithPopup(auth, googleAuthProvider )
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
);

export const startLogout = () =>{
    return async(dispatch) =>{
        const auth = getAuth();
        await signOut(auth);
        dispatch( logout() );
        dispatch(noteLogout());
    }
}

export const logout = () =>({
    type: types.logout
})