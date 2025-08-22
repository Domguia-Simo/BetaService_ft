import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({title ,img ,desc}) => {
        const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className="project" onClick={()=> navigate("/project-details")}>
                <div className="project-img"> <img src={img}/> </div>
                <div className="project-title"> {title} </div>
                <div className="project-desc"> {desc} </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectItem