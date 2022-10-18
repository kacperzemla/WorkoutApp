import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";



const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null,
});

export function AuthProvider({children}){

    const [auth, setAuth] = useState(isLoggedIn());
    const [user, setUser] = useState(null);

    useEffect(() =>{
        setAuth(isLoggedIn())
        setUser(isLoggedIn())
    }, [])

    return <AuthContext.Provider value={{auth, setAuth, user }}>
        {children}
    </AuthContext.Provider>
}

function isLoggedIn(){
    const token = localStorage.getItem('token')
        if(token) {
            const user = jwtDecode(token);
            if(!user){
                localStorage.removeItem('token');
                localStorage.removeItem('userID');
                return false;
            }else {
               return true;
            }
        }
}

export default AuthContext;