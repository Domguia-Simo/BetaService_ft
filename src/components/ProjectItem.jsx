import React from "react";
import { useNavigate } from "react-router-dom";
import { HOST_NAME } from "../config";

const ProjectItem = ({title ,img ,desc ,_id}) => {
        const navigate = useNavigate()
// console.log(img);
let url = img ? `${HOST_NAME}/uploads/`+img.fileName: ''

    return(
        <React.Fragment>
            <div className="project" onClick={()=> navigate("/project-details?project_id="+_id)}>
                <div className="project-img"> <img src={url} style={{}}/> </div>
                <div className="project-title"> {title} </div>
                <div className="project-desc"> {desc} </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectItem