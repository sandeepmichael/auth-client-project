import React, { useState} from 'react'
import{Link} from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {
    const[data, setData] = useState({
        email:"",
        password:"",
        error:null
    })
    const{ email, password, error} = data;
  const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        setData({...data, error:null})
          const res = await axios.post('https://secret-crag-15800.herokuapp.com/auth/login', {email, password}, {
              headers:{
                  "Content-Type":"application/json"
              }
            }
          )
          localStorage.setItem("token", res.data.token)
          props.history.push("/")
          
      } catch (err) {
          setData({...data, error:err.response.data.error})
         
      }
  }


    return (
        <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <h4 className="text-muted text-center mb-5">Log into your account</h4>
          <div className="card p-5 shadow">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                placeholder = "Email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                placeholder="password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <p className="mt-3 text-center">Not a user ? <Link to='/register'>Back to Register</Link></p>
            </form>
          </div>
        </div>
        <div className="col-sm-2" />
      </div>
    );
    
}

export default Login
