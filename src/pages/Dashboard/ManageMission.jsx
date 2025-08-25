import React ,{useState ,useEffect} from "react";
import { HOST_NAME } from "../../config";
import DataTable from "../../components/Dashboard/DataTable";
import Select from "../../components/Select";

const ManageMission = () => {
    const [create , setCreate] = useState(false)
    const [missions ,setMissions] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState()

    async function getUserMissions(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/mission?user=${''}`)
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

    useEffect(()=>{
        getUserMissions()
    },[0])


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

                <form action="" className="dashboard-form">
                <div className="form">
                    <div className="form-group">
                        <span>Mission Title</span>
                        <input 
                            type="text"
                        
                        />
                    </div>

                    <div className="form-group">
                        <span>Mission Description</span>
                        <textarea style={{height:100}}></textarea>
                    </div>

                    {/* <div style={{display:'flex' ,gap:10}}> */}
                        <div className="" style={{display:'flex' ,gap:10}}>
                            <span>Select Category</span>
                            <Select name={'Category'} data={[]} />
                        </div>
                        
                    {/* </div> */}
                    <div className="form-group">
                        <span>Project deadline</span>
                        <input type="date" />
                    </div>

                    <div className="form-group">
                        <span>Budget range</span>
                        <input type="text" placeholder="ex: 100 - 2000xaf"  />
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
                    columns={['id' ,'name' ,'surName']} 
                    data={[{id:'1' ,name:'Simo' ,surName:'Ulrich'} ,{id:'2' ,name:'test', surName:'test'}]} 
                />

            </div>
        </React.Fragment>
    )
    }

}

export default ManageMission