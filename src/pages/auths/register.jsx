import React ,{useState} from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import { HOST_NAME } from '../../config'


const Register =()=>{

    const navigate = useNavigate()
    const [error ,setError] = useState('')
    const [loading ,setLoading] = useState(false)
    const [data ,setData] = useState({
        name:'',
        email:'',
        password:'',
        confirm:''
    })

    const submitForm=async(e)=>{
        e.preventDefault()

            let {name ,email,password ,confirm} = data
        if(!email || !password || !password || !confirm || !name){
            setError("Please fill the entire form")
            return
        }
        try{
            setError('')
            setLoading(true)
            const response = await fetch(`${HOST_NAME}/api/auths/register` ,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(data)
            })
            const result = await response.json()
            console.log(response)
            console.log(result)
            if(response.ok){
                navigate("/auth/login")

                // navigate("/auths/email-validation" ,{state:{email:email}})
            }else{
                setError(result.error)
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
            <form onSubmit={(e)=>submitForm(e)} >
                <div className='form'>
                <div>
                    <h2>Create your account</h2>
                </div>

                <div className='form-group'>
                        <span>
                            Name
                            <i className='fas fa-user'></i>
                        </span>
                            <input
                                type='text'
                                value={data.name}
                                onChange={(e)=>setData({...data ,name:e.target.value})}
                                required
                            />

                    </div>

                    <div className='form-group'>
                        <span>
                            Email
                            <i className='fas fa-envelope'></i>
                        </span>
                            <input
                                type='email'
                                value={data.email}
                                onChange={(e)=>setData({...data ,email:e.target.value})}
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
                                value={data.password}
                                onChange={(e)=>setData({...data ,password:e.target.value})}
                                required
                            />
                    </div>

                    <div className='form-group'>
                        <span>
                            Confirm Password
                            <i className='fas fa-lock'></i>
                        </span>
                            <input
                                type='password'
                                value={data.confirm}
                                onChange={(e)=>setData({...data ,confirm:e.target.value})}
                                required
                            />
                    </div>

                    <span style={{color:'crimson' ,textAlign:'center' ,fontSize:'small' }}>{ error }</span>

                    <button className='btn'>Sign Up {loading ? "...":""}</button>

                    <div className='auth-option'>
                        <Link to="/auth/login" >Already have an account</Link>
                    </div>


                </div>
            </form>
        </React.Fragment>
    )
}

export default Register

