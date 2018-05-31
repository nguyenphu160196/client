import { connect } from 'react-redux'
import { search, makeState, act_btn, addInviteList, deleteChip, createNR } from '../modules/createRoom'

import CreateRoom from '../components/CreateRoom'

const mapDispatchToProps = {
    search,
    makeState,
    act_btn,
    addInviteList,
    deleteChip,
    createNR
}

const mapStateToProps = (state) => ({
    createRoom : state.createRoom
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
