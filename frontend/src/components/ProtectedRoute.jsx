import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function ProtectedRoute({children}){

    const [isAuthorized, setIsAuthorized]= useState(null)

    useEffect(()=> {
        auth().catch(()=> setIsAuthorized(false))
    }, [])

    const refreshToken = async ()=> {
        const refreshToken= localStorage.getItem(REFRESH_TOKEN)
        console.log(1)
        console.log({refreshToken})
        try {
            const res= await api.post("api/token/refresh/",
                 {
                    refresh: refreshToken
                })
            console.log(res.data)
            if (res.status === 200){
                console.log(200)
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                
                setIsAuthorized(true)
            }
        }
        catch(error){
            console.log(error);
            setIsAuthorized(false)

        }
    } 
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        console.log({token})
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now= Date.now()/1000
        if(tokenExpiration < now){
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }
    if (isAuthorized === null){
        return <div>
            Loading...
        </div>

    }
    return isAuthorized ? children: <Navigate to="/login"/>
}

export default ProtectedRoute