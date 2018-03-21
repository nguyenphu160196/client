import React from 'react'
import PropTypes from 'prop-types'

export const Main = ({ ounter, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    Main page
  </div>
)
Main.propTypes = {
  main: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Main
