import React, {useState} from 'react'
import "../css/login.css"
import { useNavigate } from 'react-router-dom'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const onChnageUsername = (e) => { 
    setUsername(e.target.value)
  }

  const onChnagePassword = (e) => { 
    setPassword(e.target.value)
  }


  const formSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    console.log("Form submitted");
    navigate("/home")
  }
  return (
    <div className='login-page'>

      <div className='login-box'>
           <div className='elements'>
           <h2 className='logo'>liveshoper</h2>
            <form className="form" onSubmit={formSubmit}>
                <h4>Username</h4>
                <input id="username" onChange={onChnageUsername} type='text' placeholder='username'></input>
                <h4>Password</h4>

                <input id="password" onChange={onChnagePassword} type='password' placeholder='password'></input>
                <button type='submit'><h3>login</h3></button>
            </form>
           </div>
      </div>
    </div>
  )
}

export default Login