import React ,{useEffect ,useState} from "react";
import { useSearchParams ,Link } from "react-router-dom";
import { HOST_NAME } from "../../config";


const ProjectDetail = () => {
    const [project ,setProject] = useState()
    const [loading ,setLoading] = useState(false)
    const [searchParams ,setSearchParams] = useSearchParams()


    async function getProject(){
        try{
            const response = await fetch(`${HOST_NAME}/api/project?id=${searchParams.get('project_id')}`)
            if(response.ok){
                const data = await response.json()
                setProject(data.project)
            }
        }
        catch(e){
            console.log(e.message);
        }
    }
    useEffect(()=>{
        getProject()
    },[0])
// console.log(project);
if(project){
    return(
        <React.Fragment>
            <div className="project-page">
                <div>
                    <div> <Link to={"/project"}> Projects</Link> &nbsp;&nbsp; / &nbsp;&nbsp; Project details </div>

                    <div>
                        <h1>{project.project_name}</h1>
                    </div>
                    
                    <div>
                        <div style={{display:'flex' ,gap:10}}>
                            <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/>
                            <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/>
                            <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/>
                        </div>

                        <p>{project.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus quis impedit sunt necessitatibus sed. Illo consequatur quibusdam impedit error nam nulla, corrupti, recusandae doloremque pariatur ea perferendis dignissimos optio vel!</p>
                    </div>

                    <div style={{display:'flex' ,justifyContent:'space-evenly' ,padding:'30px 10px'}}>
                        <div style={{display:'flex' ,flexDirection:'column', alignItems:'center'}}>
                            <span style={{color:'grey'}}>Status</span>
                            <b>{project.status}</b>
                        </div>
                        <div style={{display:'flex' ,flexDirection:'column', alignItems:'center'}}>
                            <span style={{color:'grey'}}>Category</span>
                            <b>{project.project_type}</b>
                        </div>

                        <div style={{display:'flex' ,flexDirection:'column', alignItems:'center'}}>
                            <span style={{color:'grey'}}>Project url</span>
                            <b>{project.link || 'no link'}</b>
                        </div>
                    </div>

                    <div>
                        <h3>Comments | Feedbacks</h3>
                        <div style={{minHeight:100}}>
                            <center>No comment</center>
                        </div>
                        <div style={{display:'flex'}}>
                            <input type="text" style={{flex:1}} placeholder="Feel free to express your self about the project" />
                            <button className="btn" >Send</button>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}
else{
    return(
    <React.Fragment>
        <div style={{display:'flex' ,alignItems:'center' ,justifyContent:'center' ,flex:1, minHeight:'50vh'}}>
            <center>
                <h1>404 🔍</h1>
                <h1>PAGE NOT FOUND</h1>
            </center>
        </div>
    </React.Fragment>
    )
}
}

export default ProjectDetail