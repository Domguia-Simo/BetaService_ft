import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectItem = ({title ,img ,desc ,_id}) => {
        const navigate = useNavigate()

    return(
        <React.Fragment>
            <div className="project" onClick={()=> navigate("/project-details?project_id="+_id)}>
                <div className="project-img"> <img src={img}/> </div>
                <div className="project-title"> {title} </div>
                <div className="project-desc"> {desc} </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectItem