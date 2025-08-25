import React ,{useState ,useEffect ,useContext} from "react";
import { HOST_NAME } from "../../config";
import DataTable from "../../components/Dashboard/DataTable";
import Select from "../../components/Select";
import UserContext from "../../providers/userProvider";

const ManageProject = () => {
    const {user } = useContext(UserContext)
    const [create , setCreate] = useState(false)
    const [projects ,setProjects] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState()
    const [refresh ,setRefresh] = useState(false)
    const [info ,setInfo] = useState({
        name:'',
        type:'',
        description:'',
        link:'',
        status:''
    })

    async function getUserProjects(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/project?user=${''}`)
            if(response.ok){
                const data =  await response.json()
                setProjects(data.projects)
            }
        }   
        catch(e){
            console.log(e);
            
        }
        finally{
            setLoading(false)
        }
    }
// Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, repellendus laboriosam. Quis modi voluptatibus veniam unde corporis culpa deserunt alias, illo officia? Porro ea eligendi voluptatibus harum iusto voluptate maiores!
    useEffect(()=>{
        getUserProjects()
    },[create ,refresh])

    async function saveProject(e) {
        e.preventDefault()
        const {name ,status ,type ,link, description} = info
        // console.log(info);
        
        // return 
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/project` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({name ,status ,link ,type ,description})
            })
            if(response.ok){
                const data = await response.json()
                console.log(data);
                
                setProjects(data.projects)
                setInfo({
                    name:'',
                    type:'',
                    description:'',
                    link:'',
                    status:''
                })
                setCreate(false)
            }
        }
        catch(e){
            console.log(e);
            
        }finally{
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setInfo({...info ,[e.target.name]:e.target.value})
    }

    async function deleteProject(id){
        try{
            const response = await fetch(`${HOST_NAME}/api/project/${id}` ,{
                method:'delete',
            })
            if(response.ok){
                setRefresh(prev => !prev)
            }
        }
        catch(e){
            console.log(e);
        }
    }


    if(create){
    return(
        <React.Fragment>
            <div className="dashboard-page">
                <div className="dashboard-headLink">
                    <span>Dashboard &nbsp;/&nbsp; Projects</span>
                    <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>View project</button></span>
                </div>

                <div >
                    <h3>Create a projects</h3>
                </div>

                <form action="" className="dashboard-form" onSubmit={(e)=>saveProject(e)} >
                <div className="form">
                    <div className="form-group">
                        <span>Project Title</span>
                        <input 
                            type="text"
                            name="name"
                            value={info.name}
                            onChange={e=>handleChange(e)}
                            required
                        />  
                    </div>

                    <div className="form-group">
                        <span>Project Description</span>
                        <textarea style={{height:100}} onChange={e=>handleChange(e)} name="description" value={info.description} ></textarea>
                    </div>

                    {/* <div style={{display:'flex' ,gap:10}}> */}
                        <div className="" style={{display:'flex' ,gap:10}}>
                            <span>Select Category</span>
                            <Select firstOption={false} onChange={handleChange} name={'Category'} data={['design' ,'software' ,'electronics' ,'other']} />
                        </div>
                        <div className="form-group">
                            <span>Status</span>
                            <div style={{display:'flex' ,gap:5}}>
                                <input type="radio" name="status" value={'pending'} id="pending" onChange={e=>handleChange(e)}/> <label htmlFor="pending">Pending</label>
                                <input type="radio" name="status" value={'in progress'} id="in_progress" onChange={e=>handleChange(e)}/> <label htmlFor="in_progress"> In progress </label>
                                <input type="radio" name="status" value={'done'} id="done" onChange={e=>handleChange(e)}/><label htmlFor="done"> Done</label>  
                            </div>
                        </div>
                    {/* </div> */}
                    <div className="form-group">
                        <span>Project url (optional)</span>
                        <input type="text" 
                            name="link"
                            value={info.link}
                            onChange={e=>handleChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <span>Upload project images</span>
                        <input type="file" />
                    </div>
                    <br/>
                    <button className="dashboard-btn2" disabled={loading}>Save</button>

                </div>
                </form>

            </div>
        </React.Fragment>
    )
    }else{
    return(
        <React.Fragment>
            <div className="dashboard-page">
                <div className="dashboard-headLink">
                    <span>Dashboard &nbsp;/&nbsp; Projects</span>
                    <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>Create project</button></span>
                </div>

                <div>
                    <h3>My Projects</h3>
                </div>

                <DataTable 
                    columns={['Name' ,'Type' , 'description', 'link','Status']} 
                    data={projects || []} 
                    deleteFxn={deleteProject}

                />

            </div>
        </React.Fragment>
    )
    }

}

export default ManageProject