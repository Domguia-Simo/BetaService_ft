import React ,{useState ,useEffect ,useContext} from "react";
import { useSearchParams } from "react-router-dom";
import { HOST_NAME } from "../../config";
import UserContext from "../../providers/userProvider";
import mtn from '../../assets/mtnMoney.jpg'
import orange from '../../assets/orangeMoney.jpg'


const ManageApplication = () => {
    
    const {user ,setUser} = useContext(UserContext)
    const [searchParams ,setSearchParams] = useSearchParams()
    const [apply ,setApply] = useState(false)
    const [proposals ,setProposals] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] =  useState()
    const [info ,setInfo] = useState({
        phone:'',
        message:'',
    })
    
    
    async function getMissionProposals(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/proposal/mission-proposal/${searchParams.get('mission-id')}`)
            if(response.ok){
                const data = await response.json()
                setProposals(data.proposals)
                console.log(data);
                
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
        getMissionProposals()
    } ,[0])

    async function rejectApplication(id){
        try{
            const response = await fetch(`${HOST_NAME}/api/proposal/reject/${id}`)
            if(response.ok){
                const data = response.json()
                console.log(data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    function acceptApplication(){
        setApply(true)
    }

    async function validate(e){
        e.preventDefault()
        return
        try{
            const {phone ,message} = info
            const response = await fetch(`${HOST_NAME}/api/transaction` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Token ${user.token}`
                },
                body:JSON.stringify({phone ,message})
            })
        }
        catch(e){
            console.log();
        }
    }

    function handleChange(e){
        setInfo({...info ,[e.target.name]:e.target.value})
    }

    if(apply){
    return(
        <React.Fragment>
            <div className="dashboard-page">
                <div className="dashboard-headLink">
                    <span>Dashboard &nbsp;/&nbsp; Missions &nbsp;&nbsp;/&nbsp;&nbsp; Applications</span>
                    <span><button className="dashboard-btn" onClick={()=>setApply(prev => !prev)}>View Applicants</button></span>
                </div>

                <div>
                    <h3>Accptation form</h3>
                </div>

                <form action="" className="dashboard-form" onSubmit={e=>validate(e)}>
                    <div className="form">
                        <div className="form-group">
                            <span>Budget 💲 </span>
                            <input disabled type="text" value={50} required/>
                        </div>

                        <div className="form-group">
                            <div style={{display:'flex' ,alignItems:'center',gap:10 ,padding:3}}>
                                <span>Phone Number</span> <b>|</b>
                                <div style={{display:'flex', gap:5}}>
                                    <img src={mtn} style={{width:40, height:40, borderRadius:5}} />
                                    <img src={orange} style={{width:40, height:40, borderRadius:5}}/>
                                </div>
                            </div>
                            <input type="text" name='phone' value={info.phone} onChange={handleChange} placeholder="ex: 6xxxxxxxx" required/>
                        </div>

                        <div className="form-group">
                            <span>Message</span>
                            <textarea name="message" id="" value={info.message} onChange={handleChange} placeholder="Your last clarifications..." required></textarea>
                        </div>

                        <button className="btn">Validate</button>
                    </div>
                </form>

            </div>
        </React.Fragment>
    )
    }
    else{
    return(
        <React.Fragment>
            <div className="dashboard-page">
                <div className="dashboard-headLink">
                    <span>Dashboard &nbsp;/&nbsp; Missions &nbsp;&nbsp;/&nbsp;&nbsp; Applications</span>
                    {/* <span><button className="dashboard-btn" onClick={()=>setCreate(prev => !prev)}>View missions</button></span> */}
                </div>

                <div>
                    <h3> Mission Applicants</h3>
                </div>
                
                <div style={{display:'flex' ,flexDirection:'column' ,gap:30 ,padding:'10px 20px'}}>
                    {proposals && proposals.map((proposal ,index) => (
                        <Item key={index} 
                            data={proposal}
                            rejectFxn={rejectApplication}
                            acceptFxn={acceptApplication}
                            ViewFxn={()=>{}}
                        />))}
                </div>

            </div>
        </React.Fragment>
    )
    }
}

export default ManageApplication

const Item = ({data ,rejectFxn ,ViewFxn, acceptFxn}) => {
    return(
        <div style={{display:'flex' ,justifyContent:'space-between' ,padding:'0px 20px' ,alignItems:'center'}} >
            <div style={{display:'flex' ,flexDirection:'column'}}>
                <strong>{data.user.name}</strong>
                <span style={{fontSize:'small'}}>{(new Date(data.createdAt)).toDateString()}</span>
            </div>
            
            <div style={{display:'flex' ,gap:10}} >
                <button onClick={()=>ViewFxn(data._id)} >View</button>
                <button onClick={()=>rejectFxn(data._id)} style={{color:'white' , backgroundColor:'crimson'}} >Reject</button>
                <button onClick={()=>acceptFxn(data._id)} style={{color:'white' , backgroundColor:'rgb(0,100,200)'}}>Accept</button>
            </div>
        </div>
    )
}