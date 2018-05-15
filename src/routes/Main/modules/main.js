import {browserHistory} from 'react-router'
import api from '../../../../src/api'

export const MAKE_STATE = 'MAKE_STATE'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const CLOSE_SNACKE = 'CLOSE_SNACKE'

export function changeStatus(status){
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if(JSON.parse(localStorage.user).status != status){
        api({
            method: 'post',
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
        browserHistory.push('/login');
    })
  }
}

export function makeState(key, text){
    return {
      type : MAKE_STATE,
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
  // friendlist: [{name:'NameA',message:'messageA',avatar:'A'},{name:'NameB',message:'messageB',avatar:'B'}],
  dialog: false,
  avatar: '',
  active: true,
  search: false,
  setting: false,
  snackeOpen: false,
  snackeMess: "",
  snakeColor: "#fff"
}

const ACTION_HANDLERS = {
  [MAKE_STATE]: (state, action) => {
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
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
