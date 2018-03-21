import React from 'react'
import PropTypes from 'prop-types'


export const Login = ({ login, handleLogin, makeState, handleSignup }) => (
  <div className="row" >
    <form onSubmit={(event)=>{
					event.preventDefault();
					handleLogin()
				}}>
      <button className="btn btn-success" type="submit">Login</button>      
    </form>
    <form onSubmit={(event)=>{
					event.preventDefault();
					handleSignup()
				}}>
      <button className="btn btn-warning" type="submit">Sign up</button>      
    </form>
  </div>
)
Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired
}

export default Login
