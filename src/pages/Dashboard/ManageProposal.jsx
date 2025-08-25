import React ,{useState ,useEffect ,useContext} from "react";
import { HOST_NAME } from "../../config";
import DataTable from "../../components/Dashboard/DataTable";
import Select from "../../components/Select";
import UserContext from "../../providers/userProvider";

const ManageProposal = () => {
    const {user ,setUser} = useContext(UserContext)
    const [create , setCreate] = useState(false)
    const [proposals ,setProposals] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState()

    async function getUserProposals(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/proposal/user-proposal/${user.id}`)
            if(response.ok){
                const data =  await response.json()
                setProposals(data.proposals)
            }
        }   
        catch(e){
            console.log(e);
        }
        finally{
            setLoading(false)
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

    useEffect(()=>{
        if(!user){
            getLocalUser()
        }
        if(user){
            getUserProposals()
        }
    },[user])


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

                <form action="" className="dashboard-form">
                <div className="form">
                    <div className="form-group">
                        <span>Project Title</span>
                        <input 
                            type="text"
                        
                        />
                    </div>

                    <div className="form-group">
                        <span>Project Description</span>
                        <textarea style={{height:100}}></textarea>
                    </div>

                    {/* <div style={{display:'flex' ,gap:10}}> */}
                        <div className="" style={{display:'flex' ,gap:10}}>
                            <span>Select Category</span>
                            <Select name={'Category'} data={[]} />
                        </div>
                        <div className="form-group">
                            <span>Status</span>
                            <div style={{display:'flex' ,gap:5}}>
                                <input type="radio" /> Pending
                                <input type="radio" /> In progress
                                <input type="radio" /> Done
                            </div>
                        </div>
                    {/* </div> */}
                    <div className="form-group">
                        <span>Project url (optional)</span>
                        <input type="text" />
                    </div>

                    <div className="form-group">
                        <span>Upload project images</span>
                        <input type="file" />
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
                    <span>Dashboard &nbsp;/&nbsp; Proposals</span>
                    {/* <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>Create project</button></span> */}
                </div>

                <div>
                    <h3>My Proposals (0)</h3>
                </div>

                <DataTable 
                    columns={['Message' ,'Budget' ,'Mission' , 'Date', 'Status']} 
                    data={proposals || []} 
                    update={false}
                    view={false}
                />

            </div>
        </React.Fragment>
    )
    }

}

export default ManageProposal

