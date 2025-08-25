import React, { useEffect, useState ,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/headerStyles.css'
import UserContext from '../providers/userProvider'
import logo from '../assets/cube.png'

const Header =() =>{
    const userContext = useContext(UserContext)
    const navigate = useNavigate()

    async function getLocalUser() {
        try{
            let raw = await localStorage.getItem('beta-user')
            let user = await JSON.parse(raw)
            // console.log(user);
            userContext.setUser(user)
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(!userContext.user){
            getLocalUser()
        }
    },[userContext.user])

    return(
        <React.Fragment> 
            <div className='header-container'>
                <div className='header-left'>
                    <span className='header-logo' onClick={()=>navigate("/")} > <img src={logo} width={30} height={30} /> <span> BetaService</span></span>
                    <div className='header-links'>
                        <span className='header-link'> <Link to={"/project"}>Projects</Link> </span>
                        <span className='header-link'> <Link to={'/mission'}> Missions</Link></span>
                        <span className='header-link'>Help</span>
                    </div>
                </div>

                <div className='header-right'>
                    {
                        userContext.user ? 
                        <>
                            <button className='header-btn login' onClick={()=>navigate("/dashboard")}>Dashboard 📊</button>
                            <button className='header-btn login' style={{fontWeight:1000 ,color:'grey'}}  onClick={()=>navigate("/profile")}>{userContext.user.name.charAt(0)}</button>
                        </>
                        :
                        <>
                            <button className='header-btn login' onClick={()=>navigate("/auth/login")}>Login</button>
                            <button className='header-btn register' onClick={()=>navigate("/auth/register")}>Register</button>
                        </>
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

export default Header