import api from '../../../../src/api'
import {browserHistory} from 'react-router'
import {makeState as makeStateMain} from '../../Main/modules/main'

export const GET_AVATAR = 'GET_AVATAR'
export const MAKE_STATE_CREROOM = 'MAKE_STATE_CREROOM'

export function createNR(){
  return (dispatch, getState) => {
    dispatch(makeStateMain('block', 'flex'));
    let state = {...getState().createRoom};
    let room_name = state.room_name;
    let list_participants = state.list_participants;
    let array = [];
    let brray = {...getState().main}.roomlist;
    return new Promise((resolve, reject) => {
      for(let i=0 ;i<list_participants.length; i++){
        array.push(list_participants[i]._id);
      }
      array.push(JSON.parse(localStorage.user)._id);
      api({
        method: 'post',
        url: '/create.room',
        headers: {'x-access-token': localStorage.getItem('authToken')},
        data: {
          name: room_name,
          paticipant: array,
          direct: false
        }
      })
      .then(res => {
        let st = JSON.parse(localStorage.getItem('user'));
        st.room.push(res.data.user);
        localStorage.setItem('user', JSON.stringify(st));
        brray.push(res.data.room);
        dispatch(makeStateMain('roomlist',brray));
        browserHistory.push('/c/' + res.data.room._id);
        dispatch(makeStateMain('block', 'none'));
      })
      .catch(err => {})
      resolve();
    })
  }
}

export function deleteChip(id){
  return (dispatch, getState) => {
    let state = {...getState().createRoom}
    let array = state.list_participants;
    return new Promise((resolve, reject) => {
      array.map((val, i) => {
        if(val._id == id){
          array.splice(i, 1);
          dispatch(makeState('list_participants', array));
        }
      })
      resolve();
    })
  } 
}

export function addInviteList(value){
  return (dispatch, getState) => {
    let state = {...getState().createRoom}
    let array = state.list_participants;;
    return new Promise((resolve, reject) => {
      if(value.avatar.charAt(0) != '#'){
        api({
          method: 'get',
          url: '/user.avatar/'+value._id,
          headers: {'x-access-token': localStorage.getItem('authToken')},
          responseType: 'arraybuffer',
        })
        .then(res => {
          let bytes = new Uint8Array(res.data);
          let image = 'data:image/png;base64,'+ encode(bytes);
          value.avatar = image;
          array.push(value);
          dispatch(makeState('list_participants', array));
        })
        .catch(err => {
          
        })
      }else{
        array.push(value);
        dispatch(makeState('list_participants', array));
      }
      resolve();
    })
  }
}

export function act_btn(){
  return (dispatch, getState) => {
    let state = {...getState().createRoom};
    let room_name = state.room_name;
    let list_participants = state.list_participants;
    return new Promise((resolve, reject) => {
      if(room_name != '' && (list_participants.length > 0)){
        dispatch(makeState('cre_btn',''));
      }else{
        dispatch(makeState('cre_btn','disabled'));
      }
      resolve();
    })
  }
}

function checkList(id){
  return (dispatch, getState) => {
    let c = 0;
    let state = {...getState().createRoom};
    let array = state.list_participants;
    if(array.length > 0){
      for(let i=0; i<array.length; i++){
        if(array[i]._id == id){
          c = 1;
        }
      }
      if(c != 1){
        return true;
      }
    }else{
      return true;
    }

  }
}

export function search(value){
  return (dispatch, getState) => {
    dispatch(makeState('invite_list',[]));
    return new Promise((resolve, reject) => {
      let array = [];
      if(value != ''){
        api({
          method: 'get',
          url: '/search.user/' + value,
          headers: {'x-access-token': localStorage.getItem('authToken')},
        })
        .then(res => {
            res.data.user.map((val, i) => {
              if(val._id != JSON.parse(localStorage.user)._id && (dispatch(checkList(val._id)) == true)){
                if(val.avatar.charAt(0) != '#'){
                  api({
                    method: 'get',
                    url: '/user.avatar/'+val._id,
                    headers: {'x-access-token': localStorage.getItem('authToken')},
                    responseType: 'arraybuffer',
                  })
                  .then(ava => {
                    let bytes = new Uint8Array(ava.data);
                    let image = 'data:image/png;base64,'+ encode(bytes);
                    val.avatar = image;
                    array.push(val);
                    dispatch(makeState('invite_list',array));
                  })
                  .catch(err => {      
                  })
                }
                else{
                  array.push(val);
                  dispatch(makeState('invite_list',array));
                }
              }
            })
        })
        .catch(err => {          
        })
      }else{
        dispatch(makeState('searchlist',[]));
      }
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

export function getAvatar(){
  return (dispatch, getState) => {
    let createRoom = {...getState().createRoom};
    let default_avat = localStorage.user ? JSON.parse(localStorage.user).avatar.charAt(0) : '';
    let id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
    if(createRoom.avatar == '' && default_avat != '#'){
      return new Promise((resolve, reject) => {
        api({
          method: 'get',
          url: '/user.avatar/'+id,
          headers: {'x-access-token': localStorage.getItem('authToken')},
          responseType: 'arraybuffer',
        })
        .then(res => {
          let bytes = new Uint8Array(res.data);
          let image = 'data:image/png;base64,'+ encode(bytes);
          dispatch({
            type: GET_AVATAR,
            payload: image
          })
        })
        .catch(err => {
          
        })
        resolve();
      })
    }
  }
}

export function makeState(key, text){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type : MAKE_STATE_CREROOM,
        payload : text,
        key
      })
      resolve();
    })
  }  
}
const ACTION_HANDLERS = {
  [GET_AVATAR]: (state, action) => {
    return Object.assign({}, state, {
      avatar: action.payload
    })
  },
  [MAKE_STATE_CREROOM]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.payload
    })
  },
}

const initialState = {
  list_participants: [],
  invite_list: [],
  cre_btn: 'disabled',
  toogle_list_invite: 'none',
  avatar: '',
  invite_input: '',
  room_name: '',
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}