import {api} from '../../../config'

export const MAKE_STATE_RSP = 'MAKE_STATE_RSP'
export const CLOSE_DIALOG = "CLOSE_DIALOG"

export function resetPass(){
  return(dispatch, getState) => {
    let pathname = window.location.pathname;
    let token = (new RegExp("/resetpassword/")).test(pathname) ? pathname.split('/resetpassword/')[1] : '';
    let state = {...getState().resetpass};
    let newpass = state.newpass;
    let confirmpass = state.confirmpass;
    return new Promise((resolve, reject) => {
      if(newpass == confirmpass){
        dispatch(makeState('block', 'flex'));
        api({
          method: 'put',
          url: '/user.change.pass',
          headers: {'x-access-token': token},
          data: { newpass: newpass }
        })
        .then(res => {
          dispatch(makeState('dialog', true));
          dispatch(makeState('message', "Your password has been reset successfully!"));
          dispatch(makeState('block', 'none'));
        })
        .catch(err => {
          dispatch(makeState('dialog', true));
          dispatch(makeState('message', err.response.data.message + " (Your request is expire!)"));
          dispatch(makeState('block', 'none'));
        })
      }else{
        dispatch(makeState('dialog', true));
        dispatch(makeState('message', 'The password does not match!'));
      }
      resolve();
    })
  }
}

export function makeState(key, text){
  return {
    type : MAKE_STATE_RSP,
    payload : text,
    key
  }
}

export const closeDialog = () => {
  return {
      type: CLOSE_DIALOG,
      payload: false
  }
}

const ACTION_HANDLERS = {
  [MAKE_STATE_RSP]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.payload
    })
  },
  [CLOSE_DIALOG] : (state, action) => {
    return Object.assign({}, state, {
      dialog: action.payload,
      block: 'none'
    })
  }
}

const initialState = {
  block: 'none',
  message: '',
  dialog: false,
  newpass: '',
  confirmpass: ''
}
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}