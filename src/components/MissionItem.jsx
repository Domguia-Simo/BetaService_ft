import React from "react";
import { useNavigate } from "react-router-dom";

const MissionItem = ({img ,desc ,title, budget, date}) => {
        const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className="mission" onClick={()=>navigate("/mission-details")}>
                <div className="mission-img"><img src={img} /></div>

                <div className="mission-content">
                    <span className="mission-title">{title}</span>
                    <span> {budget} | {date} </span>
                    <span> {desc} </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MissionItem