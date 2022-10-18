import AuthContext from "./Contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function PublicRoutes() {
    const {auth} = useContext(AuthContext);

    return auth ? <Navigate to="/" /> : < Outlet />
}
