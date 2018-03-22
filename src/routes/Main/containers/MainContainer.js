import { connect } from 'react-redux'
import { signOut} from '../modules/main'

import Main from '../components/Main'


const mapDispatchToProps = {
  signOut
}

const mapStateToProps = (state) => ({
  main : state.main
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
