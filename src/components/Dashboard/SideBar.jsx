import React ,{useState ,useContext ,useEffect} from "react";
import { useNavigate  ,useLocation} from "react-router-dom";
import '../../styles/sidebarStyles.css'
import UserContext from "../../providers/userProvider";

const routes = [
    {
        name:'Overview',
        path:'/dashboard',
        icon:'📊'
    },
    {
        name:'Projects',
        path:'/dashboard/manage-projects',
        icon:'➕'
    },
    {
        name:'Missions',
        path:'/dashboard/manage-missions',
        icon:'➕'
    },
    {
        name:'Proposals',
        path:'/dashboard/manage-proposals',
        icon:'⁉'
    },
    {
        name:'Settings',
        path:'/dashboard/settings',
        icon:'⚙'
    },
]

const SideBar = () => {
    const {user ,setUser} = useContext(UserContext)
    const [show ,setShow] = useState(true)

    async function getLocalUser(){
        try{
            const raw = await localStorage.getItem('beta-user')
            console.log('raw string' ,raw);
            
            if(raw){
                const data = await JSON.parse(raw)
                console.log("in sidebar :" ,data);
                
                setUser(data)
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
    },[user])

    return(
        <React.Fragment>
            <div className={true ? "sidebar-container":'hide-sidebar'}>
                <div className="sidebar-header">
                    <div className="sidebar-img"> <div style={{fontWeight:1000, fontSize:'x-large' ,color:'grey' ,display:'flex' ,alignItems:'center' ,justifyContent:'center' ,height:'100%'}}>{user.name.charAt(0) || ''}</div> </div>
                    <div className="sidebar-header-content">
                        <span className="sidebar-title">{user.name || 'Admin'}</span>
                        <span style={{fontSize:'small'}}>{user.id.slice(0,10) ||'6cf08952'}</span>
                    </div>
                </div>

                <div className="sidebar-routes">
                    {routes.map((route ,index) => (
                        <MenuItem key={index}
                            icon={route.icon}
                            path={route.path}
                            name={route.name}
                        />))}
                </div>
            </div>
            {/* <button className="show-menu" onClick={()=>setShow(prev => !prev)}>⬜</button> */}
        </React.Fragment>
    )
}

export default SideBar

const MenuItem = ({icon ,name ,path}) => {
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <React.Fragment>
            <div  className={location.pathname == path ? 'sidebar-item active':"sidebar-item"} onClick={()=>navigate(path)}>
                <span>{icon}</span>
                <span>{name}</span>
            </div>
        </React.Fragment>
    )
}