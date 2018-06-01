import '../../../external_api'
import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import socket from '../../../socketio'

export const MAKE_STATE_ROOM = 'MAKE_STATE_ROOM'

export function creRoomInfo(){
  return (dispatch, getState) => {
    let mainState = {...getState().main};
    let location = {...getState().location}
    let id = location.pathname.split('/c/')[1];
    let array = []
    let ObjectRoom = {};
    return new Promise((resolve, reject) => {
      api({
        method: 'get',
        url: '/info.room/'+id,
        headers: {'x-access-token': localStorage.getItem('authToken')},
      })
      .then(res => {
          ObjectRoom.roominfo = res.data.room;
          let user = res.data.room.paticipant;
          for(let j=0; j<user.length; j++){
            api({
              method: 'get',
              url: '/info.user/'+user[j],
              headers: {'x-access-token': localStorage.getItem('authToken')},
            })
            .then(res => {
              array.push(res.data.user);
              ObjectRoom.userinfor = array;
              dispatch(makeState('roomInfo', ObjectRoom));
            })
            .catch(err => {})
        }
      })
      .catch(err => {});

      resolve();
    })
  }
}


export function makeState(key, text){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type : MAKE_STATE_ROOM,
        payload : text,
        key
      })
      resolve();
    })
  }  
}


const ACTION_HANDLERS = {
  [MAKE_STATE_ROOM]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.payload
    })
  },
}

const initialState = {}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}