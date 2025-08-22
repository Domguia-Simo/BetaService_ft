import React ,{useState ,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { HOST_NAME } from "../../config";

const MissionDetail = () => {

    const [loading ,setLoading] = useState(false)
    const [mission ,setMission] = useState()
    const [searchParams ,setSearchParams] = useSearchParams()
    console.log(searchParams);
    
    async function getMissionDetail(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/mission/${searchParams.get('id')}`)
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

    return(
        <React.Fragment>
            <div>
                <div>
                    <span>Mission</span> / <span>Mission-details</span>
                </div>

                <div>
                    <h2 className="mission-title">{mission.title || 'mission title'}</h2>
                    <span>{mission.date || '20 September 2025'} | {mission.postulate.length || 10}</span>
                </div>

                <div>
                    <h3>About the mission</h3>
                    <p>{mission.desc}</p>
                </div>

                <div>
                    <h3>Required skills</h3>
                    <div></div>
                </div>

                <div>
                    <h3>Budget</h3>
                    <span>500xaf - 2000xaf</span>
                </div>

                <div>
                    <h3>Dealine</h3>
                    <span>4 weeks</span>
                </div>

                <div>
                    <button>Apply for mission</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MissionDetail