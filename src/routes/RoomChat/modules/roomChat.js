import '../../../external_api'
import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import socket from '../../../socketio'
import {makeState as makeStateMain} from '../../Main/modules/main'

export const MAKE_STATE_ROOM = 'MAKE_STATE_ROOM'

export function creRoomInfo(){
  return (dispatch, getState) => {
    let location = {...getState().location}
    let id = location.pathname.split('/c/')[1];
    let array = []
    return new Promise((resolve, reject) => {
      api({
        method: 'get',
        url: '/info.room/'+id,
        headers: {'x-access-token': localStorage.getItem('authToken')},
      })
      .then(res => {
          dispatch(makeState('roomInfo',res.data.room));
          let user = res.data.room.paticipant;
          for(let j=0; j<user.length; j++){
            api({
              method: 'get',
              url: '/info.user/'+user[j],
              headers: {'x-access-token': localStorage.getItem('authToken')},
            })
            .then(res => {
              array.push(res.data.user);
              dispatch(makeState('userInfo', array));
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

const initialState = {
  widthLeft: "col-md-12",
  displayRight: 'none',
  iconButton: 'col-md-9',
  emoji: 'none',
  sendDisable: true
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}