import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import socket from '../../../socketio'
import '../../../external_api'
import { MAKE_STATE_ROOM } from '../../RoomChat/modules/roomChat';

export const MAKE_STATE_MAIN = 'MAKE_STATE_MAIN'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const CLOSE_SNACKE = 'CLOSE_SNACKE'
export const GET_AVATAR = 'GET_AVATAR'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

// var domain = "http://localhost:8080/";
// var options = {
//     roomName: "JitsiMeetAPIExample",
//     width: 700,
//     height: 700,
//     // parentNode: document.querySelector('#meet')
// }
// var jit = new JitsiMeetExternalAPI(domain, options);

export function initial(){
  return (dispatch, getState) => {
    let st = JSON.parse(localStorage.user);
    var x = document.getElementById("joinRoom");
    var y = document.getElementById("funcMessage");
    return new Promise((resolve, reject) => {
        dispatch(getAvatar());
        api({
          method: 'get',
          url: '/user.get.room',
          headers: {'x-access-token': localStorage.getItem('authToken')}
        })
        .then(res => {
          st.room = res.data.room;
          localStorage.setItem('user', JSON.stringify(st));
          dispatch(getRoom());
        })
        .catch(err => {})
        socket.on('recieve-change-room-name', data => {
          let state = {...getState().main};
          let roomlist = state.roomlist;
          let array = [];
          roomlist.map((val, i) => {
            if(val._id == data.room){
              val.name = data.name;
              array.push(val);
              dispatch(makeState('roomlist',array));
            }else{
              array.push(val);
              dispatch(makeState('roomlist',array));
            }
          })
        })
        socket.on('recieve-kick-user', data => {
            let st = JSON.parse(localStorage.user);
            st.room.map((val, i) => {
              if(val == data._id){
                st.room.splice(i,1);
                localStorage.setItem('user', JSON.stringify(st));
              }
            })
            let state = {...getState().main};
            let roomlist = state.roomlist;
            roomlist.map((value, j) => {
              if(value._id == data._id){
                roomlist.splice(j,1);
                dispatch(makeState('roomlist', roomlist));
              }
            })
            browserHistory.push('/');
            dispatch(makeState('dialogMess','You have kicked out from room ' + data.name));
            dispatch(makeState('dialog',true));
        })
        socket.on('update-socketid',(data) => {
          st.socketID = data;
          localStorage.setItem('user', JSON.stringify(st));
        })
        socket.emit('user-online', st.status);
        socket.on('recieve-update-direct-room', data => {
          st.room.push(data);
          localStorage.setItem('user', JSON.stringify(st));
          let array = {...getState().main}.roomlist;
          api({
            method: 'get',
            url: '/info.room/'+data,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(res => {
            if(res.data.room.avatar.charAt(0) != '#'){
              res.data.room.paticipant.map((val, j) => {
                if(val != JSON.parse(localStorage.user)._id){
                  api({
                    method: 'get',
                    url: '/info.user/'+val,
                    headers: {'x-access-token': localStorage.getItem('authToken')},
                  })
                  .then(resp => {
                    res.data.room.name = resp.data.user.name;
                    if(resp.data.user.avatar.charAt(0) != "#"){
                      api({
                        method: 'get',
                        url: '/user.avatar/'+val,
                        headers: {'x-access-token': localStorage.getItem('authToken')},
                        responseType: 'arraybuffer',
                      })
                      .then(ava => {
                        let bytes = new Uint8Array(ava.data);
                        let image = 'data:image/png;base64,'+ encode(bytes);
                        res.data.room.avatar = image;
                        array.push(res.data.room);
                        dispatch(makeState('roomlist',array));
                      })
                      .catch(err => {      
                      })
                    }else{
                      res.data.room.avatar = resp.data.user.avatar;
                      array.push(res.data.room);
                      dispatch(makeState('roomlist',array));
                    }
                  })
                  .catch(err => {})
                }
              })
            }else{
              array.push(res.data.room);
              dispatch(makeState('roomlist',array));
            }
          }).catch(err => {})
          if (x.play() !== undefined) {
            x.play().then(_ => {}).catch(error => {});
          }
        });

        socket.on('recieve-update-room', data => {
          st.room.push(data);
          localStorage.setItem('user', JSON.stringify(st));
          let array = {...getState().main}.roomlist;
          api({
            method: 'get',
            url: '/info.room/'+data,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(res => {
            array.push(res.data.room);
            dispatch(makeState('roomlist',array));
          }).catch(err => {})
          if (x.play() !== undefined) {
            x.play().then(_ => {}).catch(error => {});
          }       
        });

        socket.on('recieve-message', data => {
          let state = {...getState().main};
          let roomlist = state.roomlist;
          let array = [];
          roomlist.map((val, i) => {
            if(val._id == data.room){
              val.noti = true;
              array.push(val);
              dispatch(makeState('roomlist', array));
            }else{
              array.push(val);
              dispatch(makeState('roomlist', array));
            }
          })
          if (y.play() !== undefined) {
            y.play().then(_ => {}).catch(error => {});
          }
        })
        resolve();
    })
  }
}

export function hideRoom(room){
  return (dispatch, getState) => {
    let st = JSON.parse(localStorage.user);
    let state = {...getState().main};
    return new Promise((resolve, reject) => {
      st.room.map((val, i) => {
        if(val == room){
          st.room.splice(i,1);
          st.blacklist.push(val);
          localStorage.setItem('user', JSON.stringify(st));
          api({
            method: 'put',
            url: '/room.hide',
            headers: {'x-access-token': localStorage.getItem('authToken')},
            data: {
                room: room
              }
          })
          .then(res => {
            let array = state.roomlist;
            array.map((value, j) => {
              if(value._id == room){
                array.splice(j,1);
                dispatch(makeState('roomlist', array));
              }
            })            
            browserHistory.push('/');
          })
          .catch(err => {})
        }
      })
      resolve();
    })
  }
}

export function dirrect(value){
  return (dispatch, getState) => {
    let state = {...getState().main}
    let array = state.roomlist;
    let brray = state.direct_room;
    let x = document.getElementById("joinRoom");
    dispatch(makeState('block', 'flex'));
    return new Promise((resolve, reject) => {
        if(value.email){
          if(dispatch(checkDirect(value.room)) == true){
            api({
              method: 'post',
              url: '/create.room',
              headers: {'x-access-token': localStorage.getItem('authToken')},
              data: {
                  paticipant: [value._id,JSON.parse(localStorage.user)._id],
                  direct: true
                }
            })
            .then(res => {
              res.data.room.paticipant.map((val, i) => {
                if(val != JSON.parse(localStorage.user)._id){
                  api({
                    method: 'get',
                    url: '/info.user/'+val,
                    headers: {'x-access-token': localStorage.getItem('authToken')},
                  })
                  .then(resp => {
                    res.data.room.name = resp.data.user.name;
                    if(resp.data.user.avatar.charAt(0) != '#'){
                      api({
                        method: 'get',
                        url: '/user.avatar/'+val,
                        headers: {'x-access-token': localStorage.getItem('authToken')},
                        responseType: 'arraybuffer',
                      })
                      .then(ava => {
                        let bytes = new Uint8Array(ava.data);
                        let image = 'data:image/png;base64,'+ encode(bytes);
                        res.data.room.avatar = image;       
                        array.push(res.data.room);   
                        dispatch(makeState('roomlist',array));          
                      })
                      .catch(err => {      
                      })
                    }else{
                        res.data.room.avatar = resp.data.user.avatar;
                        array.push(res.data.room);   
                        dispatch(makeState('roomlist',array));  
                    }                   
                  })
                  .catch(err => {});                  
                  socket.emit("update-direct-room", {room: res.data.room._id, user: val});
                  if (x.play() !== undefined) {
                    x.play().then(_ => {}).catch(error => {});
                  }
                  brray.push(res.data.room);
                  dispatch(makeState('direct_room',brray));
                  let st = JSON.parse(localStorage.getItem('user'));
                  st.room.push(res.data.user);
                  localStorage.setItem('user', JSON.stringify(st));
                  browserHistory.push('/c/' + res.data.room._id);
                  dispatch(makeState('block', 'none'));
                  dispatch(makeState('searchValue', ''));
                  dispatch(makeState('searchlist', []));
                  dispatch(makeState('search', false));
                }
              })
            })
            .catch(err => {})
          }else{
              for(let i=0; i< brray.length; i++){
                for(let j=0; j< value.room.length; j++){
                  if(brray[i]._id == value.room[j]){
                    browserHistory.push('/c/' + value.room[j]);
                  }
                }
              }
              dispatch(makeState('block', 'none'));
              dispatch(makeState('searchValue', ''));
              dispatch(makeState('searchlist', []));
              dispatch(makeState('search', false));
          }
        }else{
          browserHistory.push('/c/' + value._id);
          dispatch(makeState('block', 'none'));
          dispatch(makeState('searchValue', ''));
          dispatch(makeState('searchlist', []));
          dispatch(makeState('search', false));
        }
      resolve();
    })
  }
}

function checkDirect(room){
  return (dispatch, getState) => {
    let direct_room = {...getState().main}.direct_room;
    let array = [];
    if((direct_room.length != 0) && (room.length != 0)){
      let c = 0;
      for(let i=0; i< direct_room.length; i++){
        for(let j=0; j< room.length; j++){
          if(direct_room[i]._id == room[j]){
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
}

export function getRoom(){
  return (dispatch, getState) => {
    let room = localStorage.user ? JSON.parse(localStorage.user).room : '';
    let roomlist = {...getState().main}.roomlist;
    let array = [];
    let brray = [];
    return new Promise((resolve, reject) => {
      if((room.length != 0)){
        room.map((id, i) => {
          api({
            method: 'get',
            url: '/info.room/'+id,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(res => {
            if(res.data.room.avatar.charAt(0) != '#'){
              res.data.room.paticipant.map((val, j) => {
                if(val != JSON.parse(localStorage.user)._id){
                  api({
                    method: 'get',
                    url: '/info.user/'+val,
                    headers: {'x-access-token': localStorage.getItem('authToken')},
                  })
                  .then(resp => {
                    res.data.room.name = resp.data.user.name;
                    if(resp.data.user.avatar.charAt(0) != "#"){
                      api({
                        method: 'get',
                        url: '/user.avatar/'+val,
                        headers: {'x-access-token': localStorage.getItem('authToken')},
                        responseType: 'arraybuffer',
                      })
                      .then(ava => {
                        let bytes = new Uint8Array(ava.data);
                        let image = 'data:image/png;base64,'+ encode(bytes);
                        res.data.room.avatar = image;
                        array.push(res.data.room);
                        dispatch(makeState('roomlist',array));
                        if(res.data.room.direct == true){
                          brray.push(res.data.room);
                          dispatch(makeState('direct_room',brray));
                        }
                      })
                      .catch(err => {      
                      })
                    }else{
                      res.data.room.avatar = resp.data.user.avatar;
                      array.push(res.data.room);
                      dispatch(makeState('roomlist',array));
                      if(res.data.room.direct == true){
                        brray.push(res.data.room);
                        dispatch(makeState('direct_room',brray));
                      }
                    }
                  })
                  .catch(err => {

                  })
                }
              })
            }else{
              array.push(res.data.room);
              dispatch(makeState('roomlist',array));
              if(res.data.room.direct == true){
                brray.push(res.data.room);
                dispatch(makeState('direct_room',brray));
              }  
            }
          })
          .catch(err => {})
        })
      }else{
        dispatch(makeState('roomlist',[]));
      }
      resolve();
    })
  }
}

function checkBlackList(room){
    let st = JSON.parse(localStorage.user);
    let blacklist = st.blacklist;
    if(blacklist.length != 0){
      let c = 0;
      for(let i=0; i< blacklist.length; i++){
        for(let j=0; j< room.length; j++){
          if(blacklist[i] == room[j]){
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
    let roomlist = {...getState().main}.roomlist;
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
              if((val._id != JSON.parse(localStorage.user)._id) && (checkBlackList(val.room) == true)){
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
        if(roomlist.length != 0){
          roomlist.map((val, i) => {
            if(((new RegExp(value.toLowerCase())).test(val.name) || (new RegExp(value.toUpperCase())).test(val.name)) && (val.direct != true)){
              array.push(val);
              dispatch(makeState('searchlist',array));
            }
          })
        }
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
    let default_avat = localStorage.user ? JSON.parse(localStorage.user).avatar : '';
    let id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
    if(default_avat.charAt(0) != '#'){
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
                color: '#fff'
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
        window.location.href = '/login'
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

export function closeDialog(){
  return{
    type: CLOSE_DIALOG,
    payload: false
  }
}

const initialState = {
  direct_room: [],
  roomlist: [],
  searchlist: [],
  searchValue: '',
  dialog: false,
  dialogMess: '',
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
  [CLOSE_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      dialog: action.payload
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
