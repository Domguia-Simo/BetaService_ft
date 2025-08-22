import React, { useEffect, useState } from 'react'
import { Link ,useLocation ,useNavigate } from 'react-router-dom'
import '../styles/headerStyles.css'


const AuthHeader =() =>{

    const navigate = useNavigate()
    const location = useLocation()

    return(
        <React.Fragment> 
            <div className='header-container'>
                <div className='header-left'>
                    <span className='header-logo'  onClick={()=>navigate("/")} > ⬛BetaService</span>
                </div>

                <div className='header-right'>
                    <div className='header-links'>
                        <span className='header-link'>About</span>
                        <span className='header-link'>Help</span>
                    </div>
                    {
                        location.pathname == '/auth/login' ?
                        <button className='header-btn register' onClick={()=>navigate("/auth/register")}>Register</button>
                        :
                        <button className='header-btn login' onClick={()=>navigate("/auth/login")}>Login</button>
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

export default AuthHeader