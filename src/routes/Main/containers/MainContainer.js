import { connect } from 'react-redux'
import { signOut, makeState, changeStatus, closeSnacke, search, dirrect } from '../modules/main'

import Main from '../components/Main'


const mapDispatchToProps = {
  signOut,
  makeState,
  changeStatus,
  closeSnacke,
  search,
  dirrect
}

const mapStateToProps = (state) => ({
  main : state.main
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
