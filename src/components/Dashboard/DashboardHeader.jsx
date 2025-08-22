import React from "react";
import { useNavigate ,Link} from "react-router-dom";

const DashboardHeader = () => {
    const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className='header-container'>
                <div className='header-left'>
                    <span className='header-logo' onClick={()=>navigate("/")} > ⬛BetaService</span>
                    <div className='header-links'>
                        <span className='header-link'> <Link to={"/project"}>Projects</Link> </span>
                        <span className='header-link'> <Link to={'/mission'}> Missions</Link></span>
                        <span className='header-link'>Help</span>
                    </div>
                </div>

                <div className='header-right'>
                    <button style={{border:'solid 1px rgb(0,0,0,0.2)'}}>🔔</button>
                    <button style={{border:'solid 1px rgb(0,0,0,0.2)' , color:"grey" ,fontWeight:1000}}>D</button>
                </div>

            </div>
        </React.Fragment>
    )
}

export default DashboardHeader