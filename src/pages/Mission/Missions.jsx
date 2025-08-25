import React ,{useState ,useEffect} from "react";
import Select from "../../components/Select";
import { HOST_NAME } from "../../config";
import MissionItem from "../../components/MissionItem";
import '../../styles/missionStyles.css'

const ms = [
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },
    {
        img:'',
        title:'Mission title',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quam quibusdam hic iste, rem et voluptates neque harum adipisci est! ',
        budget:'500xaf - 2000xaf',
        date:'12 September 2024'
    },

]

const Missions = () => {

    const [loading ,setLoading] = useState(false)
    const [missions ,setMissions] = useState()
    const [filter ,setFilter] = useState()

    async function getMissions(){
        try{
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/mission/`)
            if(response.ok){
                const data = await response.json()
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
        getMissions()
    },[filter])

// console.log(missions);


    return(

        <React.Fragment>
            <div className="mission-page">
                <div className="mission-header">
                    <span className="mission-title" >Find your next mission</span>
                </div>

                <div className="filter-container">
                    <Select name={'Category'} data={['test' ,'test1' ,'test2']} />
                    <Select name={'Skill'} data={['test' ,'test1' ,'test2']}/>
                    <Select name={'Budget'} data={['test' ,'test1' ,'test2']}/>
                    <Select name={'Deadline'} data={['test' ,'test1' ,'test2']}/>
                </div>

                <div className="missions">
                    {missions && missions.map((item ,index) => (
                        <MissionItem key={index}
                            _id={item._id}
                            img={item.img}
                            title={item.title}
                            desc={item.description}
                            date={item.duration}
                            budget={item.budget}
                        />))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Missions