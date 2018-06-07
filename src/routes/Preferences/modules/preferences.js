import api from '../../../../src/api'
import socket from '../../../socketio'
import {makeState as makeStateMain, getRoom} from '../../Main/modules/main'

export const MAKE_STATE_PREF = 'MAKE_STATE_PREF'

export function unLock(id,type){
  return (dispatch, getState) => {
    let st = JSON.parse(localStorage.user);
    let state = {...getState().preferences};
    let array = state.hide_room;
    let brray = state.hide_user;
    return new Promise((resolve, reject) => {
      st.blacklist.map((val, i) => {
        if(val == id){
          st.blacklist.splice(i,1);
          st.room.push(val);
          localStorage.setItem('user', JSON.stringify(st));
          api({
            method: 'put',
            url: '/room.unlock',
            headers: {'x-access-token': localStorage.getItem('authToken')},
            data: {
                room: id
              }
          })
          .then(res => {
            // dispatch(makeStateMain('roomlist', res.data.room));

            if(type == 'room'){
              for(let i=0; i<array.length; i++){
                for(let j=0; j<res.data.room.length; j++){
                  if(array[i]._id == res.data.room[j]){
                    array.splice(i,1);
                    dispatch(makeState('hide_room',array));
                    dispatch(getRoom());
                  }
                }
              }
            }else{
              for(let i=0; i<brray.length; i++){
                for(let j=0; j<res.data.room.length; j++){
                  if(brray[i]._id == res.data.room[j]){
                    brray.splice(i,1);
                    dispatch(makeState('hide_user',brray));
                    dispatch(getRoom());
                  }
                }
              }
            }
          })
          .catch(err => {})
        }
      })
      resolve();
    })
  }
}

export function getHidden(){
  return (dispatch, getState) => {
    let st = JSON.parse(localStorage.user);
    let state = {...getState().preferences};
    let array = [];
    let brray = [];
    return new Promise((resolve, reject) => {
      if(st.blacklist.length != 0){
        st.blacklist.map((id, i) => {
          api({
            method: 'get',
            url: '/info.room/'+id,
            headers: {'x-access-token': localStorage.getItem('authToken')},
          })
          .then(res => {
            if(res.data.room.direct == true){
              res.data.room.paticipant.map((val, j) => {
                if(val != st._id){
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
                        url: '/user.avatar/'+resp.data.user._id,
                        headers: {'x-access-token': localStorage.getItem('authToken')},
                        responseType: 'arraybuffer',
                      })
                      .then(ava => {
                        let bytes = new Uint8Array(ava.data);
                        let image = 'data:image/png;base64,'+ encode(bytes);
                        res.data.room.avatar = image;
                        brray.push(res.data.room);
                        dispatch(makeState('hide_user',brray)); 
                      })
                      .catch(err => {})
                    }else{
                      res.data.room.avatar = resp.data.user.avatar;
                      brray.push(res.data.room);
                      dispatch(makeState('hide_user',brray));        
                    }
                  })
                  .catch(err => {})      
                }
              });
            }else{
              array.push(res.data.room);
              dispatch(makeState('hide_room',array));
            }            
          })
          .catch(err => {})
        })
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

export function makeState(key, text){
  return {
    type : MAKE_STATE_PREF,
    payload : text,
    key
  }
}

const ACTION_HANDLERS = {
  [MAKE_STATE_PREF]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.payload
    })
  }
}

const initialState = {
  hide_room: [],
  hide_user: []
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}