import React from 'react'
import PropTypes from 'prop-types'


export const Setting = ({ setting, children }) => (
  	<div>
  		{children}
  	</div>
)

Setting.propTypes = {
	children: PropTypes.node,
  setting: PropTypes.object.isRequired,
}

export default Setting