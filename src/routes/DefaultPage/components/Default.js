import React from 'react'
import PropTypes from 'prop-types'

export const Default = ({ defaultpage }) => (
  	<div className="container">
  		Home page
  	</div>
)

Default.propTypes = {
    defaultpage: PropTypes.object.isRequired,
}

export default Default