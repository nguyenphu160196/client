import { connect } from 'react-redux'
import { makeState, creRoomInfo, sendMessage } from '../modules/roomChat'

import RoomChat from '../components/RoomChat'

const mapDispatchToProps = {
    makeState,
    creRoomInfo,
    sendMessage
}

const mapStateToProps = (state) => ({
    roomChat : state.roomChat
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
