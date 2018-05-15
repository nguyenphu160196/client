import React from 'react'
import PropTypes from 'prop-types'


export const Preferences = ({ preferences }) => (
  	<div className="container">
  		Preferences page
  	</div>
)

Preferences.propTypes = {
  preferences: PropTypes.object.isRequired,
}

export default Preferences