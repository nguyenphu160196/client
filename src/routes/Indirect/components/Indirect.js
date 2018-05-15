import React from 'react'
import PropTypes from 'prop-types'

export const Indirect = ({ children, indirect }) => (
  	<div>
  		{children}
  	</div>
)

Indirect.propTypes = {
  children: PropTypes.node,
  indirect: PropTypes.object.isRequired,
}

export default Indirect