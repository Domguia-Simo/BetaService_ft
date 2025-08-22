import React from "react";
import SideBar from "../components/Dashboard/SideBar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { Outlet } from "react-router-dom";
import '../styles/dashboardStyles.css'

const DashboardLayout = () => {
    return(
        <React.Fragment>
            <div style={{display:'flex' ,flexDirection:'column' }}>
                <DashboardHeader/>

                <div className="dashboard-container" style={{}}>
                    <SideBar/>
                    <div style={{ flex:1,padding:'20px', border:'solid 0px blue'}}>
                        <Outlet/>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default DashboardLayout