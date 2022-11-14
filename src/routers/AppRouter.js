import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import {login} from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true); // si estoy autenticado

                dispatch( startLoadingNotes(user.uid) );
            }else {
                setIsLoggedIn(false); // no estoy autenticado
            }

            setChecking(false); // ya tengo respuesta(termine de chequear, autenticado)

        });
    
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if (checking) {
        // Loading (componente)
        return (
            <h1> Wait... </h1>
        )
    }

    return ( 
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route 
                        path="/auth/*" 
                        element={ 
                            <PublicRoute isAuth={isLoggedIn}>
                                <AuthRouter />
                            </PublicRoute>
                        } 

                        />
                        <Route 
                            path="/" 
                            element={
                                <PrivateRoute isAuth={isLoggedIn}>
                                    <JournalScreen />
                                </PrivateRoute>
                            } 
                        
                        />
        
                        <Route path="*" element={<Navigate replace to="/auth/" />} />
                    </Routes>
                </div>
            </BrowserRouter>  
    );
}