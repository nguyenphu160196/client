import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'


export const PageLayout = ({ children }) => (
    <div style={{ height: '100%' }}>
      {children}
    </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
