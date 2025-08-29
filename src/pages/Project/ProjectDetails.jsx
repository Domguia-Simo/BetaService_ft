import React ,{useContext, useEffect ,useState} from "react";
import { useSearchParams ,Link, useNavigate } from "react-router-dom";
import { HOST_NAME } from "../../config";
import UserContext from "../../providers/userProvider";


const ProjectDetail = () => {

    const navigate = useNavigate()
    const {user ,setUser} = useContext(UserContext)
    const [project ,setProject] = useState()
    const [loading ,setLoading] = useState(false)
    const [searchParams ,setSearchParams] = useSearchParams()
    const [comment,setComment] = useState('')
    const [refresh ,setRefresh] = useState(false)

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
    },[refresh])

    async function sendComment(){
        if(!user){ return navigate("/auth/login") }
        if(!comment){
            return;
        }
        try{
            const response = await fetch(`${HOST_NAME}/api/project/comment/${searchParams.get('project_id')}` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Token ${user.token}`
                },
                body:JSON.stringify({message:comment})
            })
            if(response.ok){
                setRefresh(prev => !prev)
                setComment('')
            }
        }
        catch(e){
            console.log(e.message);
        }
    }

    async function deleteComment(id){
        
        try{
            const response = await fetch(`${HOST_NAME}/api/project/comment/${searchParams.get('project_id')}?commentId=${id}` ,{
                method:'delete',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Token ${user.token}`
                },
            })
            if(response.ok){
                setRefresh(prev => !prev)
                setComment('')
            }
        }
        catch(e){
            console.log(e.message);
        }
    }


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
                        <div style={{display:'flex' ,gap:10, flexWrap:'wrap'}}>
                            {
                                project.files.map((f, idx) => (
                                    <a href={`${HOST_NAME}/uploads/${f.fileName}`} key={idx} target="_blank">
                                        <img  
                                        style={{backgroundColor:'rgb(0,0,0,0.3)', borderRadius:5 ,width:200 ,height:150 ,objectFit:'cover' }} 
                                        src={`${HOST_NAME}/uploads/${f.fileName}`}
                                        />
                                    </a>
                                ))
                            }
                            {/* <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/>
                            <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/>
                            <img src={''} style={{backgroundColor:'grey' ,width:200 ,height:150 }}/> */}
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
                            {
                                project.comments && project.comments.length != 0 ?
                                <div style={{display:'flex' ,flexDirection:'column' ,gap:20 , padding:'20px 0px'}}>
                                    {project.comments.map((comment, idx) => <Comment key={idx} deleteComment={deleteComment} data={comment} userId={user && user.id || ''} />)}
                                </div>
                                :
                                <center>No comment</center>
                            }
                        </div>
                        <div style={{display:'flex'}}>
                            <input 
                            disabled={!user}
                                type="text" 
                                style={{flex:1}} 
                                placeholder="Feel free to express your self about the project"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}    
                            />
                            <button className="btn" onClick={()=>sendComment()}>Send</button>
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


const Comment = ({data ,userId ,deleteComment}) => {
    return(
        <div style={{ display:'flex' ,gap:5 ,alignItems:'center', justifyContent:data.user_id._id == userId ? 'right':'' }}>
            <div style={{width:40, height:40,borderRadius:20, fontWeight:1000,  backgroundColor:'rgb(0,0,0,0.2)' ,display:'flex' ,alignItems:'center' ,justifyContent:'center'}}>{data.user_id.name.charAt(0)}</div>
            
            <div style={{display:'flex',maxWidth:500}}>
                <div style={{display:'flex' ,flexDirection:'column' ,backgroundColor:'white' ,padding:'10px 5px ',borderRadius:10}}>
                    <span>{data.message}</span>
                    <span style={{fontSize:'x-small' ,textAlign:'right'}}>{(new Date(data.date)).toDateString() || 'now'}</span>
                </div>
                {data.user_id._id == userId && <div style={{fontSize:'x-small' ,color:'crimson' ,cursor:'pointer'}} onClick={()=>deleteComment(data._id)}> ✖ </div>}
            </div>
        </div>  
    )
}