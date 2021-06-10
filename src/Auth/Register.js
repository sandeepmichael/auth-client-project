import React, {useState} from 'react'
import './register.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Register = (props) => {
    const[data, setData] = useState({
        name:"",
        email:"",
        password:"",
        error:null
    })
    const {name, email, password, error} = data;

  const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          setData({...data, error:null})
          await axios.post('https://secret-crag-15800.herokuapp.com/auth/register', { name, email, password}, {
              headers : {
                 "Content-Type":"application/json",
              }
            }
          )
          props.history.push('/login')
        }  catch (err) {
            setData({...data, error:err.response.data.error})
            
      }
  }

    return (
      <div className="signup-form">
    <form>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>                    
				</div>
				<input type="name" className="form-control" name="name" value={name} onChange={handleChange} placeholder="Username" required="required" />
			</div>
        </div>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" className="form-control" name="email" value ={email} onChange={handleChange}placeholder="Email Address" required="required" />
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="password" className="form-control" name="password" value={password} onChange={handleChange} placeholder="Password" required="required" />
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
			                 
        </div>
			</div>
      </div>
      {error ? <p className="text-danger">{error}</p> : null}
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button>
        </div>
    </form>
	<div className="text-center">Already have an account? <Link to ='/login'>Login here</Link></div>
</div>
)
 
 }
      
       

export default Register;

