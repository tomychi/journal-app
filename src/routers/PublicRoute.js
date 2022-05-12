import { Navigate } from "react-router-dom";


// recibe los componentes hijos
export const PublicRoute = ({isAuth,  children }) => {
    return isAuth ? <Navigate to="/" /> : children;
};