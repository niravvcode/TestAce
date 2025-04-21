import axios from "axios";
import { createContext, useContext, useState,useEffect } from "react";
import { isSession } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isSessionOn, setIsSessionOn] = useState(localStorage.getItem("sessionOn" || false));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail" || null));
    const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [selectedTopic, setSelectedTopic] = useState(localStorage.getItem("selectedTopic") || null);
    const [userPhoto, setUserPhoto] = useState(localStorage.getItem("userPhoto") || null)
    const [role, setrole] = useState(localStorage.getItem("role") || null)
    const [registrationDate, setregistrationDate] = useState(localStorage.getItem("registrationDate") || null)
    

    const login = (userName,userPhoto, userEmail, jwtToken,role,registrationDate) => {
        console.log(role)
        console.log(registrationDate)
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("role",role);

        localStorage.setItem("registrationDate",registrationDate);
        localStorage.setItem("userName",userName);
        localStorage.setItem("userEmail",userEmail);      
        localStorage.setItem("sessionOn",true);
        localStorage.setItem("userPhoto", userPhoto);

        setUserName(userName);
        setToken(jwtToken);
        setUserEmail(userEmail);
        setIsSessionOn(true);
        setUserPhoto(userPhoto);
        setrole(role);
        setregistrationDate(registrationDate);

    }

    const logout = () => {
        setUserName(null);
        setToken(null);
        setUserEmail(null);
        setIsSessionOn(false)
        setUserPhoto(null);
        setrole(null);
        setregistrationDate(null);

        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail"); 
        localStorage.removeItem("sessionOn"); 
        localStorage.removeItem("userPhoto"); 
        localStorage.removeItem("role"); 
        localStorage.removeItem("registrationDate");   
    }

    return (
        <AuthContext.Provider value={{userEmail, userName, token, login, logout, setUserEmail, setUserName, setToken, setIsSessionOn, isSessionOn,userPhoto,setUserPhoto,role,registrationDate}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);