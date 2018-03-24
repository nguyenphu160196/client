import React from 'react'
import PropTypes from 'prop-types'
import { GoogleLogout } from 'react-google-login';

const logout = (response) => {
  console.log(response);
}

export const Main = ({ ounter, signOut }) => (
  <div className='row' style={{ margin: '0 auto' }} >
    Main page
    <form onSubmit={(event)=>{
					event.preventDefault();
					signOut()
				}}>
      <button className="btn btn-danger" type="submit">Sign Out</button>      
    </form>
    <GoogleLogout
      className="btn btn-danger"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
  </div>
)
Main.propTypes = {
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func
}

export default Main
