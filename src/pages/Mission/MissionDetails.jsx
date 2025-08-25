import React ,{useState ,useEffect} from "react";
import { useSearchParams ,Link ,useNavigate } from "react-router-dom";
import { HOST_NAME } from "../../config";

const MissionDetail = () => {

    const navigate = useNavigate()
    const [loading ,setLoading] = useState(false)
    const [mission ,setMission] = useState()
    const [searchParams ,setSearchParams] = useSearchParams()
    // console.log(searchParams);
    
    async function getMissionDetail(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/mission?id=${searchParams.get('mission_id')}`)
            if(response.ok){
                const data = await response.json()
                setMission(data.mission)
            }
        }
        catch(e){
            console.log(e);
            
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getMissionDetail()
    },[0])

    function goToForm(){
        setSearchParams({mission_id:searchParams.get('mission_id'), deadline:mission.duration, proposals:mission.proposals, status:mission.status, category:mission.type})
        console.log(searchParams.toString());
    }

if(mission){
    return(
        <React.Fragment>
            <div className="mission-page">
                <div>
                    <Link to={'/mission'}>Mission</Link> &nbsp;&nbsp;/&nbsp;&nbsp; <span>Mission-details</span>
                </div>

                <div>
                    <h1>{mission.title }</h1>
                    <div style={{display:'flex' ,justifyContent:'space-evenly'}}>
                        <div style={{display:'flex' ,flexDirection:'column' ,alignItems:'center'}}>
                            <span style={{color:'grey'}}>mission deadline</span>
                            <span style={{fontWeight:1000}}> {(new Date(mission.duration).toDateString())}</span>
                        </div>
                        <div style={{display:'flex' ,flexDirection:'column' ,alignItems:'center'}}>
                            <span style={{color:'grey'}}> proposal(s) </span>
                            <span style={{fontWeight:1000}} >{mission.proposals.length }</span>
                        </div>
                        <div style={{display:'flex' ,flexDirection:'column' ,alignItems:'center'}}>
                            <span style={{color:'grey'}}> mission status </span>
                            <span style={{fontWeight:1000 ,color:mission.status == 'open' ?'green':'' }} >{mission.status }</span>
                        </div>
                        <div style={{display:'flex' ,flexDirection:'column' ,alignItems:'center'}}>
                            <span style={{color:'grey'}}> category </span>
                            <span style={{fontWeight:1000 }} >{mission.type }</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>About the mission</h3>
                    <p>{mission.description}</p>
                </div>

                <div>
                    <h3>Budget</h3>
                    <span>500xaf - 2000xaf</span>
                </div>

                <div>
                    <button className="btn" onClick={()=>{goToForm();navigate("/application-form?"+searchParams.toString())}}>Apply for mission</button>
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

export default MissionDetail