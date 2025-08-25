import React from "react";
import { useNavigate } from "react-router-dom";

const MissionItem = ({img ,desc ,title, budget, date ,_id}) => {
        const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className="mission" onClick={()=>navigate("/mission-details?mission_id="+_id)}>
                <div className="mission-img" style={{display:'flex' ,alignItems:'center' ,justifyContent:'center' ,fontWeight:1000}}><img src={img} /> {title.charAt(0).toUpperCase()}  </div>

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