import React from 'react'
import PropTypes from 'prop-types'


export const Profile = ({ profile }) => (
  	<div className="container">
  		Profile page
  	</div>
)

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default Profile