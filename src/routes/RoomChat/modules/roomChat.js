import '../../../external_api'
import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import socket from '../../../socketio'
import {makeState as makeStateMain} from '../../Main/modules/main'

export const MAKE_STATE_ROOM = 'MAKE_STATE_ROOM'

export function socketio(){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      socket.on('recieve-message', data => {
        console.log(data);
      });
      resolve();
    })
  }
}

export function sendMessage(message){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let state = {...getState().roomChat}
      let id = JSON.parse(localStorage.user)._id;
      let room_id = state.roomInfo._id;
      let userInfo = state.userInfo;
      let array = []
      userInfo.map((val, i) => {
        if(val._id != id){
          array.push(val._id);
        }
      })
      socket.emit('client-send-message', {room: room_id, message: message, recieve: array});
      resolve();
    })
  }
}

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
            .then(resp => {
              array.push(resp.data.user);
              dispatch(makeState('userInfo', array));
              if((res.data.room.direct == true) && (resp.data.user._id != JSON.parse(localStorage.user)._id)){
                if(resp.data.user.avatar.charAt(0) != '#'){
                  api({
                    method: 'get',
                    url: '/user.avatar/'+resp.data.user._id,
                    headers: {'x-access-token': localStorage.getItem('authToken')},
                    responseType: 'arraybuffer',
                  })
                  .then(ava => {
                    let bytes = new Uint8Array(ava.data);
                    let image = 'data:image/png;base64,'+ encode(bytes);
                    res.data.room.avatar = image;
                    res.data.room.name = resp.data.user.name;
                    dispatch(makeState('roomInfo',res.data.room));
                  })
                  .catch(err => {      
                  })
                }else{
                  res.data.room.avatar = resp.data.user.avatar;
                  res.data.room.name = resp.data.user.name;
                  dispatch(makeState('roomInfo',res.data.room));
                }
              }
            })
            .catch(err => {})
        }
      })
      .catch(err => {});

      resolve();
    })
  }
}

function encode (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
          enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
          enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
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
  sendDisable: true,
  message_text:'',
  settingOn: 'none',
  settingDel: 'disabled',
  name_hidden: 'hidden',
  name_show: '',
  new_room_name: '',
  status: ''
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}