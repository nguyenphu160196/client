import React from 'react'
import PropTypes from 'prop-types'

export const Indirect = ({ children, indirect }) => (
  	<div style={{height: '100%'}}>
  		{children}
  	</div>
)

Indirect.propTypes = {
  children: PropTypes.node,
  indirect: PropTypes.object.isRequired,
}

export default Indirect