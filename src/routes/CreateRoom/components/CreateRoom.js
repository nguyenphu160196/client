import React from 'react'
import PropTypes from 'prop-types'


export const CreateRoom = ({ createRoom, children }) => (
  	<div className='row d-flex justify-content-center' style={{height: '100%'}}>
				<div className='col-md-8' style={{padding: 50}}>
						
				</div>
  	</div>
)

CreateRoom.propTypes = {
	children: PropTypes.node,
  createRoom: PropTypes.object.isRequired,
}

export default CreateRoom