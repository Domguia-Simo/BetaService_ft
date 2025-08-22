import React from "react";
import AuthHeader from "../components/AuthHeader";
import { Outlet } from "react-router-dom";
import '../styles/authStyles.css'
import Footer from "../components/Footer";

const AuthLayout = () => {
    return(
        <React.Fragment>    
            <AuthHeader/>
            <div className="auth-container">
                <Outlet/><br />
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default AuthLayout