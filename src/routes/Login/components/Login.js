import React from 'react'
import PropTypes from 'prop-types'
import { GoogleLogin } from 'react-google-login';
import './Login.scss'


const responseGoogle = (response) => {
  console.log(response);
}

export const Login = ({ login, handleLogin, makeState, handleSignup}) => (
  <div className="row" >
    <GoogleLogin
        className='btn btn-danger form-inline'
        clientId={'878435691543-6onie784kklsgrjhmbketu5lkq465t1l.apps.googleusercontent.com'}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      > 
        <div className='google-search-icon form-control'></div>
        <span className="form-control" style={{backgroundColor: 'inherit',color:'#fff',border:'unset'}}>Login in With Google</span>
    </GoogleLogin>
    <form onSubmit={(event)=>{
					event.preventDefault();
					handleLogin()
				}}>
      <button className="btn btn-success" type="submit">Login</button>  
    </form>
    <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" onClick={() =>
        <script>
          checkLoginState()
        </script>}>
    </div>
    
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
