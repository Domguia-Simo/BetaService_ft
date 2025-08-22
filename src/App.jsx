import { BrowserRouter ,Routes ,Route  ,Navigate } from 'react-router-dom'
import LandingPage from './pages/Home.jsx'
import Layout from './layouts/Layout.jsx'
import NotFound from './pages/404.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import Login from './pages/auths/login.jsx'
import Register from './pages/auths/register.jsx'
import Projects from './pages/Project/Projects.jsx'
import Missions from './pages/Mission/Missions.jsx'
import MissionDetail from './pages/Mission/MissionDetails.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ManageProject from './pages/Dashboard/ManageProject.jsx'
import ManageMission from './pages/Dashboard/manageMission.jsx'
import ManageProposal from './pages/Dashboard/ManageProposal.jsx'
import { UserProvider } from './providers/userProvider.jsx'
import ProjectDetail from './pages/Project/ProjectDetails.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
    <UserProvider>
        <Routes>
          {/* <Route path='/' element={<LandingPage/>} /> */}
          <Route path='/' element={<Layout/>}>
            <Route index path='/home' element={<LandingPage/>} />
            <Route index path='/' element={<Navigate to={"/home"} />} />

            <Route path='project' element={<Projects/>} />
            <Route path='project-details' element={<ProjectDetail/>} />


            <Route path='mission' element={<Missions/>} />
            <Route path='mission-details' element={<MissionDetail/>} />
            <Route path='apply-mission' element={<MissionDetail/>} />
          </Route>

          <Route path='/dashboard' element={<DashboardLayout/>} >
            <Route path='' index element={<Dashboard/>}/>
            <Route path='manage-projects' element={<ManageProject/>} />
            <Route path='manage-missions' element={<ManageMission/>} />
            <Route path='manage-proposals' element={<ManageProposal/>} />

          </Route>

          <Route path='/auth' element={<AuthLayout/>}>
            <Route path='login'  index element={<Login/>} />
            <Route path='register' element={<Register/>} />
            <Route path='/auth' element={<Navigate to={"login"}/>} />
          </Route>

          <Route path='*' element={<NotFound/>} />
        </Routes>
    </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
