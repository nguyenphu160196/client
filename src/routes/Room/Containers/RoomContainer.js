import { connect } from 'react-redux'
import {  } from '../modules/room'

import Room from '../components/Room'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    room : state.room
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
