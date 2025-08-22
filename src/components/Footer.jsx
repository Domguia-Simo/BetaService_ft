import React from "react";
import '../styles/footerStyles.css'

const Footer = () =>{
    return(
        <React.Fragment>
            <div className="footer-container">
                <div className="footer-links">
                    <span>About Us</span>
                    <span>Contact</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
                <div className="footer-media">
                    <span>facebook</span>
                    <span>Twitter</span>
                    <span>Instagram</span>
                </div>
                <div> &copy; 2025 BetaService. All rights reserved </div>
            </div>
        </React.Fragment>
    )
}

export default Footer