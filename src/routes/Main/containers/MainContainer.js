import { connect } from 'react-redux'
import { signOut, makeState, changeStatus, closeSnacke, search, dirrect, initial, hideRoom, closeDialog } from '../modules/main'
import { makeState as makeStateRoom } from '../../RoomChat/modules/roomChat'

import Main from '../components/Main'


const mapDispatchToProps = {
  signOut,
  makeState,
  changeStatus,
  closeSnacke,
  search,
  dirrect,
  initial,
  hideRoom,
  closeDialog,
  makeStateRoom
}

const mapStateToProps = (state) => ({
  main : state.main
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)
