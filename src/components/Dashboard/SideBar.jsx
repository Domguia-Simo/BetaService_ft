import React ,{useState} from "react";
import { useNavigate  ,useLocation} from "react-router-dom";
import '../../styles/sidebarStyles.css'

const routes = [
    {
        name:'Dashboard Overview',
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
    const [show ,setShow] = useState(true)
    return(
        <React.Fragment>
            <div className={true ? "sidebar-container":'hide-sidebar'}>
                <div className="sidebar-header">
                    <span className="sidebar-img"><img/></span>
                    <div className="sidebar-header-content">
                        <span className="sidebar-title">Domguia Simo</span>
                        <span>6cf08952</span>
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