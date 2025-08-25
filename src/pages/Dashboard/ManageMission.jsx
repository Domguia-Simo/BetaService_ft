import React ,{useState ,useEffect ,useContext} from "react";
import { HOST_NAME } from "../../config";
import DataTable from "../../components/Dashboard/DataTable";
import Select from "../../components/Select";
import UserContext from "../../providers/userProvider";

const ManageMission = () => {
    const {user ,setUser} = useContext(UserContext)
    const [create , setCreate] = useState(false)
    const [missions ,setMissions] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState()
    const [info ,setInfo] = useState({
        title:'',
        description:'',
        deadline:'',
        budget:'',
        type:''
    })
    const [refresh ,setRefresh] = useState(false)
    

    async function getUserMissions(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/mission/user-missions` ,{
                method:'get',
                headers:{
                    'authorization':`Token ${user.token}`
                }
            })
            if(response.ok){
                const data =  await response.json()
                setMissions(data.missions)
            }
        }   
        catch(e){
            console.log(e);
            
        }
        finally{
            setLoading(false)
        }
    }

    async function createMission(e){
        e.preventDefault()
        try{
            const {title ,description,budget, type ,deadline } = info
            // console.log(info);
            // return
            const response = await fetch(`${HOST_NAME}/api/mission` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Token ${user.token}`
                },
                body:JSON.stringify({title ,description, duration:deadline ,budget ,type})
            })
            if(response.ok){
                setCreate(prev => !prev)
            }
        }
        catch(e){
            console.log(e.message);
            
        }
    }

    async function getLocalUser(){
        try{
            const raw = await localStorage.getItem('beta-user')
            let tmp = await JSON.parse(raw)
            setUser(tmp)
        }
        catch(e){console.log(e.message);}
    }

    async function deleteMission(id){
        try{
            
            const response = await fetch(`${HOST_NAME}/api/mission/${id}` ,{
                method:'delete',
                headers:{
                    'authorization':`Token ${user.token}`
                }
            })
            if(response.ok){
                setRefresh(prev => !prev)
            }
        }
        catch(e){
            console.log(e.message);
            
        }
    }


    useEffect(()=>{
        if(!user){
            getLocalUser()
        }
        getUserMissions()
    },[create ,refresh])

    function handleChange(e){
        setInfo({...info ,[e.target.name]:e.target.value})
    }


    if(create){
    return(
        <React.Fragment>
            <div className="dashboard-page">
                <div className="dashboard-headLink">
                    <span>Dashboard &nbsp;/&nbsp; Missions</span>
                    <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>View missions</button></span>
                </div>

                <div >
                    <h3>Create a mission</h3>
                </div>

                <form action="" className="dashboard-form" onSubmit={e=>createMission(e)} >
                <div className="form">
                    <div className="form-group">
                        <span>Mission Title</span>
                        <input 
                            type="text"
                            value={info.title}
                            name="title"
                            onChange={e=>handleChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <span>Mission Description</span>
                        <textarea style={{height:100}}  value={info.description} name="description" onChange={e=>handleChange(e)}></textarea>
                    </div>

                    {/* <div style={{display:'flex' ,gap:10}}> */}
                        <div className="" style={{display:'flex' ,gap:10}}>
                            <span>Select Category</span>
                            <Select name={'Category'} onChange={handleChange} data={['software development' ,'graphic design' ,'3d animation', 'video editing' ,'other']} />
                        </div>
                        
                    {/* </div> */}
                    <div className="form-group">
                        <span>Project deadline</span>
                        <input type="date" name="deadline" value={info.deadline} onChange={e=>handleChange(e)}/>
                    </div>

                    <div className="form-group">
                        <span>Budget range</span>
                        <input type="text" placeholder="ex: 100 - 2000xaf" name="budget" value={info.budget} onChange={e=>handleChange(e)}  />
                    </div>
                    <br/>
                    <button className="dashboard-btn2" >Save</button>

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
                    <span>Dashboard &nbsp;/&nbsp; Missions</span>
                    <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>Create mission</button></span>
                </div>

                <div>
                    <h3>My Missions</h3>
                </div>

                <DataTable 
                    columns={['Title' ,'Deadline' ,'Description' ,'budget' ,'type' ]} 
                    data={missions || []} 
                    deleteFxn={deleteMission}
                />

            </div>
        </React.Fragment>
    )
    }

}

export default ManageMission