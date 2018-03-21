import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/main'

import Main from '../components/Main'


const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  main : state.main
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
