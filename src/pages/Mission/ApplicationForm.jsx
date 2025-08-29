import React ,{useState ,useContext} from "react";
import { Link ,useLocation,useSearchParams } from "react-router-dom";
import { HOST_NAME } from "../../config";
import UserContext from "../../providers/userProvider";

const ApplicationForm =  () => {

    const location = useLocation()
    const {user ,setUser} = useContext(UserContext)
    const [searchParams ,setSearchParams] = useSearchParams()
    const [info ,setInfo] = useState({
        letter:'',
        price:location.state.budget,
        files:[]
    })
    const [loading, setLoading] = useState(false)
    const [error ,setError] = useState()


    async function applyMission(e){
        e.preventDefault()
        try{
            const {letter ,price} = info
            setLoading(true)
            // console.log({mission:searchParams.get('mission_id') ,message:letter ,budget:price});
            // return
            const response = await fetch(`${HOST_NAME}/api/proposal` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'authorization':`Token ${user.token}`
                },
                body:JSON.stringify({mission:searchParams.get('mission_id') ,message:letter ,budget:price})
            })
            if(response.ok){
                alert("Application Successfully submitted")
                setInfo({
                    letter:'',
                    price:'',
                    files:[]
                })
            }
        }
        catch(e){
            console.log(e.message);
        }
        finally{
            setLoading(false)
        }
    }

    function handleChange(e){
        setInfo({...info ,[e.target.name]:e.target.value})
    }

    return(
        <React.Fragment>
            <div className="mission-page">

                <div>
                    <span> <Link to={'/mission'}> Missions</Link> &nbsp;&nbsp;/&nbsp;&nbsp; mission detail &nbsp;&nbsp;/&nbsp;&nbsp; application-form</span>
                </div>

                <div>
                    <h4>Mission Summary</h4>
                    <div style={{display:'flex' ,flexDirection:'column' ,padding:'0px 50px'}}>
                        <strong>{location.state.title}</strong>
                        <span>{location.state.description}</span>
                    </div>
                </div>

                    <form action="" onSubmit={e=>applyMission(e)} style={{marginTop:-20}}>
                <div className="form">
                    <div className="form-group">
                        <span>Fixed budget (xaf)</span>
                        <input type="text" name="price" disabled value={location.state.budget} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <span>Deadline</span>
                        <input type="text"  disabled value={(new Date(location.state.deadline)).toDateString()} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <span>Cover letter</span>
                        <textarea style={{height:50}} name="letter" value={info.letter}  onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <span>Attachments (ex: certifications ,PoW...)</span>
                        <input type="file" />
                    </div>

                        <br/>
                    <div className="form-group">
                        <button className="btn" >Submit application</button>
                    </div>

                </div>
                    </form>
            </div>
        </React.Fragment>
    )
}

export default ApplicationForm