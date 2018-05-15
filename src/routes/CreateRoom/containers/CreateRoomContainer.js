import { connect } from 'react-redux'
import {  } from '../modules/createRoom'

import CreateRoom from '../components/CreateRoom'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    createRoom : state.createRoom
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
