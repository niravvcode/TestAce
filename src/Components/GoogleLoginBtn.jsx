import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLoginBtn() {

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLoginSucess =async (credentialResponse) => {
        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log(decodedToken)
        const requestBody = {
          userEmail : decodedToken.email,
          userName : decodedToken.name,
          userPhoto: decodedToken.picture
        };

        try{
          const response = await axios.post("http://localhost:8080/auth/google",requestBody);
          if(response.status === 200){
              login(response.data.name, response.data.photo,response.data.email, response.data.jwtToken,response.data.role,response.data.registrationDate);
              navigate("/");
          }
        }catch(error){
         console.log(error);
        }
    }
    const handleGoogleLoginFailer = () => {
        console.log("login failure")
    }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID} >
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleLoginSucess}
          onError={handleGoogleLoginFailer}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginBtn;
