import React from 'react'
import PropTypes from 'prop-types'

export const Main = ({ ounter, signOut }) => (
  <div style={{ margin: '0 auto' }} >
    Main page
    <form onSubmit={(event)=>{
					event.preventDefault();
					signOut()
				}}>
      <button className="btn btn-danger" type="submit">Sign Out</button>      
    </form>
  </div>
)
Main.propTypes = {
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func
}

export default Main
