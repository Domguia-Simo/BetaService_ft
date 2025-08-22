import React ,{useState} from "react";
import { useNavigate ,Link } from 'react-router-dom'
import { HOST_NAME } from "../../config";


const Login = () => {

    const navigate = useNavigate()
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [error ,setError] = useState('')
    const [loading ,setLoading] = useState(false)


    const submitForm=async(e)=>{
        e.preventDefault()
        if(!email || !password){
            setError("Please fill the entire form")
            return
        }
        try{
            setError('')
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/auths/login` ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({email:email ,password:password})
            })
            const data = await response.json()
            // console.log(data)
            if(response.ok){
                await localStorage.setItem("beta-user" ,JSON.stringify(data.user))
                if(data.user){
                    navigate("/dashboard")
                }
            }else{
                setError(data.error)
            }

        }
        catch(e){
            // console.log(e)
            setError('Please verify your internet')
        }
        finally{
            setLoading(false)
        }
    }


    return(
        <React.Fragment>
            <form onSubmit={e=>submitForm(e)} >
            <div className='form'>
                <div>
                    <h2>Welcome back</h2>
                </div>

                <div className='form-group'>
                    <span>
                        Email
                        <i className='fas fa-envelope'></i>
                    </span>
                        <input
                            type='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                </div>

                <div className='form-group'>
                    <span>
                        Password
                        <i className='fas fa-lock'></i>
                    </span>
                        <input
                            type='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                </div>

                <span style={{color:'crimson' ,textAlign:'center' ,fontSize:'small' }}>{ error }</span>

                {/* <div> */}
                    <button className="btn">Sign In {loading ? "...":""}</button>
                {/* </div> */}

                <div className='auth-option'>
                    {/* <span>Forgot password ?</span> */}
                    <Link to="/auth/register" >No account ?</Link>
                </div>

            </div>
            </form>

        </React.Fragment>
    )
}

export default Login