import {browserHistory} from 'react-router'
import { api } from '../../../../src/config'

export const MAKE_STATE_PROF = 'MAKE_STATE_PROF'
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const SAVE_COND = 'SAVE_COND'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const GET_AVATAR = 'GET_AVATAR'
export const ERROR_DIALOG = 'ERROR_DIALOG'

import { makeState as makeStateMain } from '../../Main/modules/main'

export function checkPassRequire(){
  return (dispatch, getState) => {
    let requirePass = {...getState().profile}.prof_require_pass;
      return new Promise((resolve, reject) => {
        api({
          method: 'post',
          url: 'check.pass',
          headers: {'x-access-token': localStorage.getItem('authToken')},
          data: {password: requirePass}
        })
        .then(res => {
          dispatch(updateProfile());
          dispatch(makeState('save_btn','disabled'));
          dispatch(makeState('message',''));
        })
        .catch(err => {
          dispatch(makeState('progress', false));
          dispatch(makeState('message', 'The password is incorrect'));
        })
      })
  }
}

export function progressCallback(name, email, pass, avatar){
  return (dispatch, getstate) => {
    if(name && email && pass && avatar){
      dispatch(makeState('open', false));
      dispatch(makeState('progress', false));
    }else{
      dispatch(makeState('progress', false));
    }
  }
}

export function updateProfile() {
  return (dispatch, getState) => {
    dispatch(makeState('progress', true));
    let getstate = {...getState().profile} 
    let name = getstate.prof_name;
    let email = getstate.prof_email;
    let pass = getstate.prof_pass;
    let img = getstate.imageURL;

    const old_name = localStorage.user ? JSON.parse(localStorage.user).name : '';
    const old_email = localStorage.user ? JSON.parse(localStorage.user).email : '';
    const id = localStorage.user ? JSON.parse(localStorage.user)._id : '';

    var bool_name = (name != '' && name != old_name) ? true : false;
    var bool_email = (email != '' && email != old_email) ? true : false;
    var bool_avatar = (img != '') ? true : false;
    var bool_pass = (pass != '') ? true : false;

    var name_done = (name != '' && name != old_name) ? false : true;
    var email_done = (email != '' && email != old_email) ? false : true;
    var avatar_done = (img != '') ? false : true;
    var pass_done = (pass != '') ? false : true;
    return new Promise((resolve, reject) => {
        for(let i=0; i<4; i++){
          //change name
          if(bool_name){  
            api({
              method: 'put',
              url: '/user.change.name',
              headers: {'x-access-token': localStorage.getItem('authToken')},
              data: {name: name}
            })
            .then(res => {
              let st = JSON.parse(localStorage.getItem('user'));
              st.name = res.data.name;
              localStorage.setItem('user', JSON.stringify(st));
              name_done = true;
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            .catch(err => {
              dispatch(makeState('message', err.response.data.message));
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            bool_name = false;
          }
          //change email
          else if(bool_email){
  
            api({
              method: 'put',
              url: '/user.change.email',
              headers: {'x-access-token': localStorage.getItem('authToken')},
              data: {email: email}
            })
            .then(res => {
              let st = JSON.parse(localStorage.getItem('user'));
              st.email = res.data.email;
              localStorage.setItem('user', JSON.stringify(st));
              email_done = true;
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            .catch(err => {
              dispatch(makeState('message', err.response.data.message));
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            bool_email = false;
          }
          //change avatar
          else if(bool_avatar){
            let data = new FormData();
            data.append('file', img);
            if(img.size <= 25000000){
              api({
                method: 'post',
                url: '/avatar/' + id,
                headers: {'x-access-token': localStorage.getItem('authToken')},
                data: data
              })
              .then(res => {
                let st = JSON.parse(localStorage.getItem('user'));
                st.avatar = res.data.avatar;
                localStorage.setItem('user', JSON.stringify(st));
                api({
                  method: 'get',
                  url: '/user.avatar/'+id,
                  headers: {'x-access-token': localStorage.getItem('authToken')},
                  responseType: 'arraybuffer'
                })
                .then(res => {
                  let bytes = new Uint8Array(res.data);
                  let image = 'data:image/png;base64,'+ encode(bytes);
                  avatar_done = true;
                  dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
                  dispatch({
                    type: GET_AVATAR,
                    payload: image
                  })
                })
              })
              .catch(err => {
                dispatch(makeState('message', err.response.data.message));
                dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
              })
              bool_avatar = false;
            }else{
              dispatch(makeState('open', false));
              dispatch(makeStateMain('snackeOpen', true));
              dispatch(makeStateMain('snackeMess', 'The size of image too large. Your avatar had not changed!'));
            }            
          }
          //change password
          else if(bool_pass){
            api({
              method: 'put',
              url: '/user.change.pass',
              headers: {'x-access-token': localStorage.getItem('authToken')},
              data: {newpass: pass}
            })
            .then(res => {
              pass_done = true;
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            .catch(err => {
              dispatch(makeState('message', err.response.data.message));
              dispatch(progressCallback(name_done,email_done,pass_done,avatar_done));
            })
            bool_pass = false;
          }
        }
      resolve();
    })
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
    let id = localStorage.user ? JSON.parse(localStorage.user)._id : '';
    if(profile.prof_avat == '' && default_avat != '#'){
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
        type : MAKE_STATE_PROF,
        payload : text,
        key
      })
      resolve();
    })
  }  
}

const ACTION_HANDLERS = {
  [MAKE_STATE_PROF]: (state, action) => {
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
  [ERROR_DIALOG]: (state, action) => {
    return Object.assign({}, state, {
      dialog: action.payload,
      message: action.message
    })
  }
}

const initialState = {
  prof_avat: '',
  prof_require_pass: '',
  open: false,
  message: '',
  progress: false
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}