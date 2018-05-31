import {browserHistory} from 'react-router'
import '../../../external_api'
import api from '../../../../src/api'
import socket from '../../../socketio'

export const MAKE_STATE_MAIN = 'MAKE_STATE_MAIN'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const CLOSE_SNACKE = 'CLOSE_SNACKE'
export const GET_AVATAR = 'GET_AVATAR'

// var domain = "http://localhost:8080/";
// var options = {
//     roomName: "JitsiMeetAPIExample",
//     width: 700,
//     height: 700,
//     // parentNode: document.querySelector('#meet')
// }
// var jit = new JitsiMeetExternalAPI(domain, options);

export function dirrect(id,name){
  return (dispatch, getState) => {
    let state = {...getState().main}
    let array = state.roomlist;
    let body = {
      name: JSON.parse(localStorage.user).name + ', ' + name,
      paticipant: [id,JSON.parse(localStorage.user)._id]
    }
    dispatch(makeState('block', 'flex'));
    dispatch(makeState('search', false));
    return new Promise((resolve, reject) => {
      api({
        method: 'post',
        url: '/create.room',
        headers: {'x-access-token': localStorage.getItem('authToken')},
        data: body
      })
      .then(res => {
        let st = JSON.parse(localStorage.getItem('user'));
        st.room.push(res.data.user);
        localStorage.setItem('user', JSON.stringify(st));
        array.push(res.data.room);
        dispatch(makeState('roomlist',array));
        dispatch(makeState('block', 'none'));
        dispatch(makeState('searchValue', ''));
      })
      .catch(err => {})
      resolve();
    })
  }
}

export function getRoom(){
  return (dispatch, getState) => {
    let room = localStorage.user ? JSON.parse(localStorage.user).room : '';
    let array = [];
    return new Promise((resolve, reject) => {
      if(room.length > 0){
        room.map((id, i) => {
          api({
            method: 'get',
            url: '/info.room/'+id,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(res => {
            array.push(res.data.room);
            dispatch(makeState('roomlist',array));
          })
          .catch(err => {})
        })
      }
      resolve();
    })
  }
}

function checkDirect(room){
  let c = 0;
  let rooms = JSON.parse(localStorage.user).room;
  if(rooms.length > 0){
    for(let i=0; i< rooms.length; i++){
      for(let j=0; j< room.length; j++){
        if(rooms[i] == room[j]){
          c = 1;
        }
      }
    }
    if(c != 1){
      return true;
    }
  }else{
    return true;
  }
}

export function search(value){
  return (dispatch, getState) => {
    dispatch(makeState('searchlist',[]));
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
              if(val._id != JSON.parse(localStorage.user)._id && (checkDirect(val.room) == true)){
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
                    dispatch(makeState('searchlist',array));
                  })
                  .catch(err => {      
                  })
                }
                else{
                  array.push(val);
                  dispatch(makeState('searchlist',array));
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

export function progress_on() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(makeState('block', 'flex'));
      resolve();
    })
  }
}

export function progress_off() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(makeState('block', 'none'));
      resolve();
    })
  }
}

export function sett_prof(){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(makeState('setting', true));
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
    let main = {...getState().main};
    let default_avat = localStorage.user ? JSON.parse(localStorage.user).avatar.charAt(0) : '';
    let id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
    if(main.avatar == '' && default_avat != '#'){
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

export function changeStatus(status){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if(JSON.parse(localStorage.user).status != status){
        api({
            method: 'put',
            url: '/user.status',
            headers: {'x-access-token': localStorage.getItem('authToken')},
            data: {status: status}
          })
          .then(res => {
            if(status == true){
              localStorage.setItem('user', JSON.stringify(res.data.user));
              dispatch({
                type: CHANGE_STATUS,
                payload: true,
                message: "You are online now",
                color: 'limegreen'
              })
            }else{
              localStorage.setItem('user', JSON.stringify(res.data.user));
              dispatch({
                type: CHANGE_STATUS,
                payload: true,
                message: "You are offline now",
                color: 'red'
              })
            }
          })
          .catch(err => {

          })   
      }   
      resolve();
    })
  }
}

export function signOut() {
  return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        localStorage.clear();
        window.location.reload();
        browserHistory.push('/login');
    })
  }
}

export function makeState(key, text){
    return {
      type : MAKE_STATE_MAIN,
      payload : text,
      key
    }
  }

export function closeSnacke(){
  return{
    type: CLOSE_SNACKE,
    payload: false
  }
}



const initialState = {
  roomlist: [],
  searchlist: [],
  searchValue: '',
  dialog: false,
  avatar: '',
  active: true,
  search: false,
  setting: false,
  snackeOpen: false,
  snackeMess: "",
  snakeColor: "#fff",
  block: 'none'
}

const ACTION_HANDLERS = {
  [MAKE_STATE_MAIN]: (state, action) => {
      return Object.assign({}, state, {
        [action.key]: action.payload
      })
  },
  [CLOSE_SNACKE]: (state, action) => {
    return Object.assign({}, state, {
      snackeOpen: action.payload
    })
  },
  [CHANGE_STATUS]: (state, action) => {
    return Object.assign({}, state, {
      snackeOpen: action.payload,
      snackeMess: action.message,
      snakeColor: action.color
    })
  },
  [GET_AVATAR]: (state, action) => {
    return Object.assign({}, state, {
      avatar: action.payload
    })
  },
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
