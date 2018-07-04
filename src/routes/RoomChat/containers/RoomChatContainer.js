import { connect } from 'react-redux'
import { makeState, sendMessage, search, initial, kickUser, addParticipant, changeRoomName, loadMoreMessage, clearNoti, directVideoCall, unTyping, typing, repareAttachFile, removeAttachFile, closeDialog } from '../modules/roomChat'
import { hideRoom, makeState as makeStateMain } from '../../Main/modules/main'

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
    removeAttachFile,
    closeDialog,
    makeStateMain
}

const mapStateToProps = (state) => ({
    roomChat : state.roomChat
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat)
