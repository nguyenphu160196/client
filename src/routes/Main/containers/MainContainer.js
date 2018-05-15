import { connect } from 'react-redux'
import { signOut, makeState, changeStatus, closeSnacke} from '../modules/main'

import Main from '../components/Main'


const mapDispatchToProps = {
  signOut,
  makeState,
  changeStatus,
  closeSnacke
}

const mapStateToProps = (state) => ({
  main : state.main
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
