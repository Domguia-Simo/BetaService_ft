import React ,{useState ,useContext} from "react";
import { Link ,useSearchParams } from "react-router-dom";
import { HOST_NAME } from "../../config";
import UserContext from "../../providers/userProvider";

const ApplicationForm =  () => {

    const {user ,setUser} = useContext(UserContext)
    const [searchParams ,setSearchParams] = useSearchParams()
    const [info ,setInfo] = useState({
        letter:'',
        price:'',
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

                </div>

                    <form action="" onSubmit={e=>applyMission(e)}>
                <div className="form">
                    <div className="form-group">
                        <span>Cover | Motivation letter</span>
                        <textarea style={{height:100}} name="letter" value={info.letter}  onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <span>Your price</span>
                        <input type="text" name="price" value={info.price} onChange={handleChange} />
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