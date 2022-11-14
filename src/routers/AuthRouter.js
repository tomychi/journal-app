import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className='auth__main'>    
            <div className='auth-box-container'>
                <Routes>
                    <Route path="login" element={ <LoginScreen /> } />
                    <Route path="register" element={ <RegisterScreen /> } />
        
                    <Route path="*" element={<Navigate replace to="login" />} />
                </Routes>
            </div>
        </div>
    )
}  