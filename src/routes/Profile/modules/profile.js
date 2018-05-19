import {browserHistory} from 'react-router'
import api from '../../../../src/api'
import {progress_off, progress_on} from '../../Main/modules/main'

export const MAKE_STATE = 'MAKE_STATE'
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const SAVE_COND = 'SAVE_COND'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const GET_AVATAR = 'GET_AVATAR'

export function updateProfile() {
  return (dispatch, getState) => {
    dispatch(progress_on());
    let getstate = {...getState().profile} 
    // let name = getstate.prof_name;
    // let email = getstate.prof_email;
    // let pass = getstate.prof_pass;
    let img = getstate.imageURL;

    //update avatar
    let id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
    let data = new FormData();
    data.append('file', img);
      return new Promise((resolve, reject) => {        
        api.post('/avatar/' + id,data)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          api({
            method: 'get',
            url: '/avatar',
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
          dispatch(progress_off());
        })
        .catch(err => {
          
        })
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
    let profile = {...getState().profile};
    let default_avat = localStorage.user ? JSON.parse(localStorage.user).avatar.charAt(0) : '';
    if(profile.prof_avat == '' && default_avat != '#'){
      return new Promise((resolve, reject) => {
        api({
          method: 'get',
          url: '/avatar',
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

export function saveCond(){
  return (dispatch, getState) => {
    let getstate = {...getState().profile} 
    let name = getstate.prof_name;
    let email = getstate.prof_email;
    let pass = getstate.prof_pass;
    let img = getstate.imageURL;

    let old_name = localStorage.user ? JSON.parse(localStorage.user).name : '';
    let old_email = localStorage.user ? JSON.parse(localStorage.user).email : '';

    if((name != '' && name != old_name) || (email != '' && email != old_email) || img != '' || pass != ''){
      dispatch({
        type: SAVE_COND,
        payload: ''
      })
    }else{
      dispatch({
        type: SAVE_COND,
        payload: 'disabled'
      })
    }

  }
}

export function makeState(key, text){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type : MAKE_STATE,
        payload : text,
        key
      })
      resolve();
    })
  }
  
}

const ACTION_HANDLERS = {
  [MAKE_STATE]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.payload
    })
  },
  [SAVE_COND]: (state, action) => {
    return Object.assign({}, state, {
      save_btn: action.payload
    })
  },
  [GET_AVATAR]: (state, action) => {
    return Object.assign({}, state, {
      prof_avat: action.payload
    })
  },
}

const initialState = {
  prof_avat: '',
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}