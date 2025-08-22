import React from "react";

const Dashboard = () => {
    return(
        <React.Fragment>
            <div className="dashboard-page" >
                <div>
                    <h2>Overview</h2>
                        <div className="dashboard-blocks">
                            <div className="dashboard-block">
                                <span>Published Projects</span>
                                <span style={{color:"black" ,fontWeight:600 ,fontSize:'large'}}>12</span>
                            </div>
                            <div className="dashboard-block">
                                <span>Active Missions</span>
                                <span style={{color:"black" ,fontWeight:600 ,fontSize:'large'}}>2</span>
                            </div>
                            <div className="dashboard-block">
                                <span>Recent Applications</span>
                                <span style={{color:"black" ,fontWeight:600 ,fontSize:'large'}}>8</span>
                            </div>
                        </div>
                </div>

                <div>
                    <h3>Quick Actions</h3>
                    <div style={{display:'flex' ,gap:'10px'}}>
                        <button style={{border:'solid 1px purple', color:'purple'}} >Create New Project</button>
                        <button style={{border:'solid 1px purple', color:'purple'}}>Create New Mission</button>
                    </div>
                </div>

                <div>
                    <h3>Recent Activity</h3>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard