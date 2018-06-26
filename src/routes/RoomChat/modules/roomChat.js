import {browserHistory} from 'react-router'
import { api, socket, peer } from '../../../config'
import {makeState as makeStateMain, getRoom} from '../../Main/modules/main'

import $ from 'jquery'

export const MAKE_STATE_ROOM = 'MAKE_STATE_ROOM'




export function directVideoCall(){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let roomInfo = state.roomInfo;
    let count = 0;
    roomInfo.paticipant.splice(roomInfo.paticipant.indexOf(JSON.parse(localStorage.user)._id),1);
    socket.emit('signal-video-call', {room: roomInfo._id, user: roomInfo.paticipant});
    openStream().then(stream => {
      playStream('localStream', stream);
      if(roomInfo.paticipant.length != 0){
        roomInfo.paticipant.map((val, i) => {          
          count++;
          $('.remoteClass').append('<video id="remoteStream'+count+'" width="200" style={{marginRight: 20}} ></video>');
          let call = peer.call(val, stream);
          call.on('stream', remoteStream => {
              playStream('remoteStream'+count, remoteStream);
          })
        })
      }
    })  
  }
}

function openStream(){
  return new Promise((resolve, reject) => {
    const config = {audio: false, video: true};
    resolve(navigator.mediaDevices.getUserMedia(config));
  })
};
function playStream(idVideoTag, stream){
  let video = document.getElementById(idVideoTag); 
  video.srcObject = stream;
  let videoplay = video.play();
  if (videoplay !== undefined) {
    videoplay.then(_ => {

    }).catch(error => {

    });
  }
}



export function initial(){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      socket.on('recieve-change-room-name', data => {
        let roomInfo = {...getState().roomChat}.roomInfo;
        if(roomInfo._id == data.room){
          roomInfo.name = data.name;
          dispatch(makeState('roomInfo', roomInfo));
        }
      })
      socket.on('recieve-user-status-off', data => {
        let state = {...getState().roomChat}
        let roomInfo = state.roomInfo ? state.roomInfo : '';
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
        let roomInfo = state.roomInfo ? state.roomInfo : '';
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
          roomInfo.paticipant.push(data.user);
          dispatch(makeState('roomInfo', roomInfo));
          api({
            method: 'get',
            url: '/info.user/'+data.user,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(resp => {
            userInfo.push(resp.data.user);
            dispatch(makeState('userInfo', userInfo));
          })
        }
      })
      socket.on('recieve-update-kick-user', data => {
        let state = {...getState().roomChat};
        let userInfo = state.userInfo;
        let roomInfo = state.roomInfo;
        if(roomInfo._id == data.room){
          roomInfo.paticipant.splice(roomInfo.paticipant.indexOf(data.user),1);
          dispatch(makeState('roomInfo', roomInfo));
          userInfo.map((val, i) => {
            if(val._id == data.user){
              userInfo.splice(i,1);
              dispatch(makeState('userInfo',userInfo));
            }
          })
        }
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
      socket.on('recieve-typing', data => {
        let state = {...getState().roomChat};
        let roomInfo = state.roomInfo;
        let userInfo = state.userInfo;
        let typing = state.typing;
        if(roomInfo._id == data.room){
          if(typing.length == 0){
            userInfo.map((val, i) => {
              if(val._id == data.user){
                  typing.push({id: data.user, name: val.name});
                  dispatch(makeState('typing', typing));
              }
            })
          }else{
            typing.map((value, j) => {
              if(value.id != data.user){
                userInfo.map((val, i) => {
                  if(val._id == data.user){
                      typing.push({id: data.user, name: val.name});
                      dispatch(makeState('typing', typing));
                  }
                })
              }
            })
          }
        }
      })
      socket.on('recieve-untyping', data => {
        let state = {...getState().roomChat};
        let roomInfo = state.roomInfo;
        let typing = state.typing;
        if(roomInfo._id == data.room){
          typing.map((val, i) => {
            if(val.id == data.user){
              typing.splice(i,1);
              dispatch(makeState('typing', typing));
            }
          })
        }
      })
      resolve();
    })
  }
}

export function removeAttachFile(i){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let attachArray = state.attachArray;
    return new Promise((resolve, reject) => {
      attachArray.splice(i,1);
      dispatch(makeState('attachArray', attachArray));
      if(attachArray.length == 0){
        dispatch(makeState('attachHeight', '15px'));
      }
      resolve();
    })
  }
}

export function repareAttachFile(){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let attachFile = state.attachFile;
    let attachArray = state.attachArray;
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      if(attachFile.name && attachFile.size <= 25000000){
        dispatch(makeState('attachHeight','55px'));
        if(attachFile.type.indexOf('image') == -1){
          attachArray.push(attachFile);
          dispatch(makeState('attachArray', attachArray));
        }else{
          reader.onload = function(e) {
            attachFile.imagebase64 = e.target.result;
            attachArray.push(attachFile);
            dispatch(makeState('attachArray', attachArray));
          }
          reader.readAsDataURL(attachFile);
        }
        resolve();
      }else{
        dispatch(makeStateMain('snackeOpen', true));
        dispatch(makeStateMain('snackeMess', 'File is too large. (Less than 25MB)'));
      }
    })
  }
}

export function unTyping(){
  return ((dispatch, getState) => {
    let room = {...getState().roomChat}.roomInfo;
    return new Promise((resolve, reject) => {
      socket.emit('un-typing', {room: room._id,party: room.paticipant, user: JSON.parse(localStorage.user)._id});
      resolve();
    })
  })
}

export function typing(){
  return ((dispatch, getState) => {
    let room = {...getState().roomChat}.roomInfo;
    return new Promise((resolve, reject) => {
      socket.emit('typing', {room: room._id,party: room.paticipant, user: JSON.parse(localStorage.user)._id});
      resolve();
    })
  })
}


export function clearNoti(){
  return (dispatch, getState) => {
    let pathname = window.location.pathname;
    let id = (new RegExp("/c/")).test(pathname) ? pathname.split('/c/')[1] : '';
    let roomlist = {...getState().main}.roomlist;
    let array = [];
    return new Promise((resolve, reject) => {
      roomlist.map((val, i) => {
        if(val._id == id){
          val.noti = false;
          array.push(val);
          dispatch(makeStateMain('roomlist', array));
        }else{
          array.push(val);
          dispatch(makeStateMain('roomlist', array));
        }
      })
      resolve();
    })
  }
}

export function loadMoreMessage() {
  return (dispatch, getState) => {    
    let state = {...getState().roomChat};
    let room = state.roomInfo._id;
    let loadMoreMessage = state.loadMoreMessage;
    let messagePage = state.messagePage;
    let currentMessage = state.message;
    return new Promise((resolve, reject) => {
      if(loadMoreMessage == true){
        let elmnt = document.getElementById("id-chat-content");
        let y = elmnt.scrollTop;
        if(y == 0){
          dispatch(makeState('mess_loaders','block'));
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
      message.map((val, i) => {
        currentMessage.unshift(val);    
          dispatch(makeState('message',
            currentMessage.sort(function(a, b){
              var dateA = new Date(a.createAt),
                  dateB = new Date(b.createAt);
              return dateA - dateB;
            })          
          ));
      })          
        dispatch(makeState('loadMoreMessage',true));
        dispatch(makeState('mess_loaders','none')); 
    })
  }
}

export function sendMessage(){
  return (dispatch, getState) => {
    let id = JSON.parse(localStorage.user)._id;
    let state = {...getState().roomChat};
    let room_id = state.roomInfo._id;
    let userInfo = state.userInfo;
    let message_text = p_wrap.textContent;
    let attachArray = state.attachArray;
    let currentMessage = state.message;
    let array = [];
    let roomlist = {...getState().main}.roomlist;    
    let dataFile = new FormData();  
    return new Promise((resolve, reject) => {
      userInfo.map((val, i) => {
          if(val._id != id){
            array.push(val._id);
          }
      })   
      if(attachArray.length != 0){
        let crray = [];
        attachArray.map((val, i) => {
          dataFile.append('attach', val);
        }); 
        api({
          method: 'post',
          url: '/message.attach',
          headers: {'x-access-token': localStorage.getItem('authToken')},
          data: dataFile
        })
        .then(res => {
          socket.emit('client-send-message', {room: room_id, message: message_text, recieve: array, file: res.data.file});
        })
      }else{
        socket.emit('client-send-message', {room: room_id, message: message_text, recieve: array, file: []});
      }
      resolve();
    })
    .then(() => {
      dispatch(makeState('attachArray', []));
      dispatch(makeState('attachHeight','15px'));
      let brray = [];
      roomlist.map((val, i) => {
        if(val._id == room_id && message_text != ''){
          val.last = message_text;
          brray.push(val);
          dispatch(makeStateMain('roomlist', brray));
        }else{
          brray.push(val);
          dispatch(makeStateMain('roomlist', brray));
        }
      })
      $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
      p_wrap.textContent = '';
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
        roomInfo.paticipant.push(id);
        dispatch(makeState('roomInfo', roomInfo));
        socket.emit('add-participant',{ room : roomInfo._id, user: id });
        socket.emit('update-room',{room: roomInfo._id, user: [id]});
        api({
          method: 'get',
          url: '/info.user/'+id,
          headers: {'x-access-token': localStorage.getItem('authToken')},
        })
        .then(resp => {
          userInfo.push(resp.data.user);
          dispatch(makeState('userInfo', userInfo));
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
      if(name != ''){
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
          let main = {...getState().main};
          let roomlist = main.roomlist;
          let array = [];
          roomlist.map((val, i) => {
            if(val._id == roomInfo._id){
              val.name = name;
              array.push(val);
               dispatch(makeStateMain('roomlist',array));
            }else{
              array.push(val);
              dispatch(makeStateMain('roomlist',array));
            }
          })
          roomInfo.paticipant.map((val, i) => {
            if(val != JSON.parse(localStorage.user)._id){
              socket.emit('change-room-name', {user: val, name: name, room: roomInfo._id});
            }
          })
        })
        .catch(err => {})
      }
      resolve();
    })
  }
}

export function kickUser(id){
  return (dispatch, getState) => {
    let state = {...getState().roomChat};
    let roomInfo = state.roomInfo;
    return new Promise((resolve, reject) => {
      roomInfo.paticipant.splice(roomInfo.paticipant.indexOf(id),1);
      dispatch(makeState('roomInfo', roomInfo));
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
            socket.emit('kick-user',{ user: id, room: roomInfo._id });
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
                array.push(val);
                dispatch(makeState('invite_list',array));
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
    dispatch(makeState('messagePage',1));
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
                  resolve();
                  array.push(resp.data.user);
                    dispatch(makeState('userInfo', array));
                    if((res.data.room.direct == true) && (resp.data.user._id != JSON.parse(localStorage.user)._id)){
                      dispatch(makeState('status',resp.data.user.status == true ? "Active":"Inactive"));
                      res.data.room.avatar = resp.data.user.avatar;
                      res.data.room.name = resp.data.user.name;
                      dispatch(makeState('roomInfo',res.data.room));
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
    .then(_ => {
      api({
        method: 'get',
        url: '/message.get/'+id,
        headers: {'x-access-token': localStorage.getItem('authToken'),
                  'message-page'  : 1
                  }
      })
      .then(res => {
        dispatch(makeState('message',
        res.data.message.docs.sort(function(a, b){
            var dateA = new Date(a.createAt),
                dateB = new Date(b.createAt);
            return dateA - dateB;
          })          
        ));
        dispatch(makeState('mess_loaders','none'));
        $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
      })
      .catch(err => {})
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
  // sendDisable: true,
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
  mess_loaders: 'none',
  typing: [],
  attachFile: {},
  attachArray: [],
  attachHeight: "15px"
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}