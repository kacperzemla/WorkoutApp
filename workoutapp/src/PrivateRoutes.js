import AuthContext from "./Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRoutes({ children, ...rest }) {

  const { auth } = useContext(AuthContext);



  return auth ? <Outlet /> : <Navigate to="/login" />;
}
