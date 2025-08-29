import React ,{useEffect ,useState} from "react";
import '../../styles/projectStyles.css'
import Select from "../../components/Select";
import ProjectItem from "../../components/ProjectItem";
import { HOST_NAME } from "../../config";

const ps = [
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
    {
        title:'test',
        img:'',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores rem, aut suscipit quis '
    },
]

const Projects = () => {

    const [loading, setLoading] = useState(false)
    const [projects ,setProjects] = useState()
    const [filter ,setFilter] = useState()

    async function getProjects(){
        try{
            let query = ''
            if(filter){
                let tmp = filter.map(f => {

                })
            }
            const response = await fetch(`${HOST_NAME}/api/project${query && query}`)
            if(response.ok){
                const data = await response.json()
                // console.log(data);
                
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

    useEffect(()=>{
        getProjects()
    },[filter])

    return(
        <React.Fragment>
            <div className="project-page">
                <div className="project-header">
                    <span className="project-title1" >Explore Projects</span>
                    <span className="project-title2">Discover innovative projects from our community</span>
                </div>

                {/* Filters */}
                <div className="filter-container" > 
                    <Select data={['s' ,'e' ,'t']} name={'Category'} />
                    <Select data={['s' ,'e' ,'t']} name={'Skill'} />
                    <Select data={['s' ,'e' ,'t']} name={'Popularity'} />
                </div>

                <div className="projects">
                    {projects && projects.length != 0 && projects.map((item ,index) => (
                        <ProjectItem key={index} 
                            _id={item._id}
                            title={item.project_name} 
                            img={item.files[0] || ''}
                            desc={item.description} 
                        />) )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Projects