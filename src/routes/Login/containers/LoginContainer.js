import { connect } from 'react-redux'
import { handleLogin, makeState, handleSignup,handleScroll, closeDialog, signupClick, signupCancel } from '../modules/login'

import Login from '../components/Login'


const mapDispatchToProps = {
  handleLogin,
  makeState,
  handleSignup,
  handleScroll,
  closeDialog, 
  signupClick, 
  signupCancel
}

const mapStateToProps = (state) => ({
  login : state.login
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)
