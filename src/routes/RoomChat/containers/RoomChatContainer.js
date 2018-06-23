import { connect } from 'react-redux'
import { makeState, sendMessage, search, initial, kickUser, addParticipant, changeRoomName, loadMoreMessage, clearNoti, directVideoCall, unTyping, typing, repareAttachFile, removeAttachFile } from '../modules/roomChat'
import { hideRoom } from '../../Main/modules/main'

import RoomChat from '../components/RoomChat'

const mapDispatchToProps = {
    makeState,
    sendMessage,
    hideRoom,
    search,
    initial,
    kickUser,
    addParticipant,
    changeRoomName,
    loadMoreMessage,
    clearNoti,
    directVideoCall,
    unTyping, 
    typing,
    repareAttachFile,
    removeAttachFile
}

const mapStateToProps = (state) => ({
    roomChat : state.roomChat
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
