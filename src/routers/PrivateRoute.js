import { Navigate} from "react-router-dom";


// recibe los componentes hijos
export const PrivateRoute = ({isAuth, children}) => {
    return isAuth ? children : <Navigate to="/auth/login" />;
};