import React from 'react'
import PropTypes from 'prop-types'


export const CreateRoom = ({ createRoom, children }) => (
  	<div className="container">
  		create room page
  	</div>
)

CreateRoom.propTypes = {
	children: PropTypes.node,
  createRoom: PropTypes.object.isRequired,
}

export default CreateRoom