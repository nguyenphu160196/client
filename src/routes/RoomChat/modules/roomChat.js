import '../../../external_api'
import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import socket from '../../../socketio'
import {makeState as makeStateMain, getRoom} from '../../Main/modules/main'

import $ from 'jquery'


export const MAKE_STATE_ROOM = 'MAKE_STATE_ROOM'



export function initial(){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      socket.on('recieve-change-room-name', data => {
        let roomInfo = {...getState().roomChat}.roomInfo;
        roomInfo.name = data;
        dispatch(makeState('roomInfo', roomInfo));
      })
      socket.on('recieve-user-status-off', data => {
        let state = {...getState().roomChat}
        let roomInfo = state.roomInfo;
        if(roomInfo._id == data.room){
          if(roomInfo.direct == true){
            dispatch(makeState('status',"Inactive"));
          }else{
            let userInfo = state.userInfo && state.userInfo.length != 0 ? state.userInfo : [];
            let array = [];
            userInfo.map((val, i) => {
              if(val._id == data.user){
                val.status = false;
                array.push(val);
                dispatch(makeState('userInfo', array));
              }else{
                array.push(val);
                dispatch(makeState('userInfo', array));
              }
            })
          }
        }
      })
      socket.on('recieve-user-status-on', data => {
        let state = {...getState().roomChat}
        let roomInfo = state.roomInfo;
        if(roomInfo._id == data.room){
          if(roomInfo.direct == true){
            dispatch(makeState('status',"Active"));
          }else{
            let userInfo = state.userInfo && state.userInfo.length != 0 ? state.userInfo : [];
            let array = [];
            userInfo.map((val, i) => {
              if(val._id == data.user){
                val.status = true;
                array.push(val);
                dispatch(makeState('userInfo', array));
              }else{
                array.push(val);
                dispatch(makeState('userInfo', array));
              }              
            })
          }
        }
      })
      socket.on('recieve-add-participant', data => {
        let state = {...getState().roomChat};
        let userInfo = state.userInfo;
        let roomInfo = state.roomInfo;
        if(roomInfo._id == data.room){
          api({
            method: 'get',
            url: '/info.user/'+data.user,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(resp => {
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
                resp.data.user.avatar = image;
                userInfo.push(resp.data.user);
                dispatch(makeState('userInfo', userInfo));
              })
              .catch(err => {      
              })
            }else{
              userInfo.push(resp.data.user);
              dispatch(makeState('userInfo', userInfo));
            }
          })
        }
      })
      socket.on('recieve-update-kick-user', data => {
        let state = {...getState().roomChat};
        let userInfo = state.userInfo;
        userInfo.map((val, i) => {
          if(val._id == data.user){
            userInfo.splice(i,1);
            dispatch(makeState('userInfo',userInfo));
          }
        })
      })
      socket.on('recieve-message', data => {
        let state = {...getState().roomChat};
        let roomInfo = state.roomInfo;
        if(roomInfo._id == data.room){
          let userInfo = state.userInfo;
          let message = state.message;
          userInfo.map((val, i) => {
            if(val._id == data.message.user){
              data.message.name = val.name;
              data.message.avatar = val.avatar;
              message.push(data.message);
            }
          })
          dispatch(makeState('message', message));
          $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
        }
      });
      resolve();
    })
  }
}

export function loadMoreMessage() {
  return (dispatch, getState) => {    
    dispatch(makeState('mess_loaders','block'));
    let state = {...getState().roomChat};
    let room = state.roomInfo._id;
    let loadMoreMessage = state.loadMoreMessage;
    let messagePage = state.messagePage;
    return new Promise((resolve, reject) => {
      if(loadMoreMessage == true){
        let elmnt = document.getElementById("id-chat-content");
        let y = elmnt.scrollTop;
        if(y == 0){
          dispatch(makeState('loadMoreMessage',false));
          api({
            method: 'get',
            url: '/message.get/'+room,
            headers: {'x-access-token': localStorage.getItem('authToken'),
                      'message-page'  : messagePage+1
                    }
          })
          .then(res => {
            dispatch(makeState('messagePage',messagePage+1));
            resolve(res.data.message.docs);
          })
          .catch(err => {})
        }
      }
    })
    .then(message => {
      let userInfo = state.userInfo;
      let currentMessage = state.message;
      if(message.length !== 0){
        message.map((val, i) => {
          if(val.user != JSON.parse(localStorage.user)._id){
            userInfo.map((value, j) => {
              if(value._id == val.user){
                val.name = value.name;
                val.avatar = value.avatar;
                currentMessage.unshift(val);    
                dispatch(makeState('message',
                  currentMessage.sort(function(a, b){
                    var dateA = new Date(a.createAt),
                        dateB = new Date(b.createAt);
                    return dateA - dateB;
                  })          
                ));
              }
            })
          }else{
            currentMessage.unshift(val);
            dispatch(makeState('message',
              currentMessage.sort(function(a, b){
                var dateA = new Date(a.createAt),
                    dateB = new Date(b.createAt);
                return dateA - dateB;
              })          
            ));
          }
        });
      }
      dispatch(makeState('loadMoreMessage',true));
      dispatch(makeState('mess_loaders','none'));      
    })
  }
}

export function sendMessage(){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let id =JSON.parse(localStorage.user)._id;
      let state = {...getState().roomChat}
      let room_id = state.roomInfo._id;
      let userInfo = state.userInfo;
      let message_text = state.message_text;
      let currentMessage = state.message;
      let array = [];
      userInfo.map((val, i) => {
        if(val._id != id){
          array.push(val._id);
        }
      })
      socket.emit('client-send-message', {room: room_id, message: message_text, recieve: array});
      currentMessage.push({ roomId: room_id, user: id, text: message_text });
      dispatch(makeState('message',currentMessage))
      resolve(currentMessage);
    })
    .then((currentMessage) => {
      $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
    })
  }
}

export function addParticipant(id){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let roomInfo = state.roomInfo;
    let userInfo = state.userInfo;
    return new Promise((resolve, reject) => {
      api({
        method: 'put',
        url: '/add.user.room/' + roomInfo._id,
        headers: {'x-access-token': localStorage.getItem('authToken')},
        data: { user: id }
      })
      .then(res => {
        userInfo.map((val, i) => {
          if(val._id != JSON.parse(localStorage.user)._id){
            socket.emit('add-participant',{ who : val._id, room : roomInfo._id, user: id });
          }
        })
        socket.emit('update-room',[id]);
        api({
          method: 'get',
          url: '/info.user/'+id,
          headers: {'x-access-token': localStorage.getItem('authToken')},
        })
        .then(resp => {
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
              resp.data.user.avatar = image;
              userInfo.push(resp.data.user);
              dispatch(makeState('userInfo', userInfo));
            })
            .catch(err => {      
            })
          }else{
            userInfo.push(resp.data.user);
            dispatch(makeState('userInfo', userInfo));
          }
        })
      })
      .catch(err => {})
      resolve();
    })
  }
}

export function changeRoomName(){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let roomInfo = state.roomInfo;
    let name = state.new_room_name;
    return new Promise((resolve, reject) => {
      api({
        method: 'put',
        url: '/room.change.name/' + roomInfo._id,
        headers: {'x-access-token': localStorage.getItem('authToken')},
        data: { name: name }
      })
      .then(res => {
        roomInfo.name = name;
        dispatch(makeState('roomInfo',roomInfo));
        dispatch(makeState('name_show',''));
        dispatch(makeState('name_hidden','hidden'));
        dispatch(getRoom());
        roomInfo.paticipant.map((val, i) => {
          if(val != JSON.parse(localStorage.user)._id){
            socket.emit('change-room-name', {id: val, name:name});
          }
        })
      })
      .catch(err => {})
      resolve();
    })
  }
}

export function kickUser(id){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let roomInfo = state.roomInfo;
    return new Promise((resolve, reject) => {
      api({
        method: 'put',
        url: '/kick.user/' + roomInfo._id,
        headers: {'x-access-token': localStorage.getItem('authToken')},
        data: { user:id }
      })
      .then(res => {
        let userInfo = state.userInfo;
        userInfo.map((val, i) => {
          if(val._id == id){
            userInfo.splice(i,1);
            dispatch(makeState('userInfo', userInfo));
            socket.emit('kick-user',{ user:id, room:roomInfo._id });
          }
        })
      })
      .catch(err => {})
      resolve();
    })
  }
}

function checkList(id){
  return (dispatch, getState) => {
    let c = 0;
    let state = {...getState().roomChat};
    let array = state.userInfo;
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

export function creRoomInfo(){
  return (dispatch, getState) => {
    dispatch(makeState('mess_loaders','block'));
    let pathname = window.location.pathname;
    let id = (new RegExp("/c/")).test(pathname) ? pathname.split('/c/')[1] : '';
    let array = [];
    return new Promise((resolve, reject) => {
        if(id != ''){
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
                      resp.data.user.avatar = image;
                      array.push(resp.data.user);
                      dispatch(makeState('userInfo', array));
                      if(j == (user.length - 1)){
                        resolve(array);
                      }
                    })
                    .catch(err => {      
                    })
                  }else{
                    array.push(resp.data.user);
                    dispatch(makeState('userInfo', array));
                    if(j == (user.length - 1)){
                      resolve(array);
                    }
                  }
  
                  if((res.data.room.direct == true) && (resp.data.user._id != JSON.parse(localStorage.user)._id)){
                    dispatch(makeState('status',resp.data.user.status == true ? "Active":"Inactive"));
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
          .catch(err => {
            browserHistory.push('/');
          });
        }
    })
    .then(userInfo => {
      return new Promise((resolve, reject) => {
        api({
          method: 'get',
          url: '/message.get/'+id,
          headers: {'x-access-token': localStorage.getItem('authToken'),
                    'message-page'  : 1
                    }
        })
        .then(res => {
          resolve(res.data.message.docs);
        })
        .catch(err => {})
      })
      .then(message => {
        let brray = [];
        if(message.length !== 0){
          message.map((val, i) => {
            if(val.user != JSON.parse(localStorage.user)._id){
              api({
                method: 'get',
                url: '/info.user/'+val.user,
                headers: {'x-access-token': localStorage.getItem('authToken')},
              })
              .then(resp => {
                val.name = resp.data.user.name;
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
                    val.avatar = image;
                    brray.push(val);
                    dispatch(makeState('message',
                      brray.sort(function(a, b){
                        var dateA = new Date(a.createAt),
                            dateB = new Date(b.createAt);
                        return dateA - dateB;
                      })          
                    ));  
                    $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight); 
                  })
                  .catch(err => {      
                  })
                }else{
                  val.avatar = resp.data.user.avatar;
                  brray.push(val);
                  dispatch(makeState('message',
                    brray.sort(function(a, b){
                      var dateA = new Date(a.createAt),
                          dateB = new Date(b.createAt);
                      return dateA - dateB;
                    })          
                  ));
                  $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
                }
              })
            }else{
              brray.push(val);
              dispatch(makeState('message',
                brray.sort(function(a, b){
                  var dateA = new Date(a.createAt),
                      dateB = new Date(b.createAt);
                  return dateA - dateB;
                })          
              ));
              $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight); 
            }
          });
        }
        dispatch(makeState('mess_loaders','none'));
      })
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
  participantOn: 'none',
  name_hidden: 'hidden',
  name_show: '',
  new_room_name: '',
  status: '',
  invite_input: '',
  toogle_list_invite: 'none',
  invite_list: [],
  loadMoreMessage: true, 
  messagePage: 1,
  mess_loaders: 'none'
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}