import React from 'react'
import PropTypes from 'prop-types'


export const Login = ({ login, handleLogin, makeState, handleSignup}) => (
  <div className="row" >
    <form onSubmit={(event)=>{
					event.preventDefault();
					handleLogin()
				}}>
      <button className="btn btn-success" type="submit">Login</button>  
    </form>

    <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-use-continue-as="true"
          ></div>
    
    
    {/* <form onSubmit={(event)=>{
					event.preventDefault();
					handleSignup()
				}}>
      <button className="btn btn-warning" type="submit">Sign up</button>      
    </form> */}
  </div>
)
Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired
}

export default Login
