import { connect } from 'react-redux'
import {  } from '../modules/indirect'

import Indirect from '../components/Indirect'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    indirect : state.indirect
})

export default connect(mapStateToProps, mapDispatchToProps)(Indirect)
