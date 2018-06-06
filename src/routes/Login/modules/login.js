import api from '../../../../src/api'
import {browserHistory} from 'react-router'

export const PROGRESS = 'PROGRESS'
export const LOGIN_FALSE = 'LOGIN_FALSE'
export const SIGNUP_FAILED = 'SIGNUP_FAILED'
export const MAKE_STATE_LOGIN = 'MAKE_STATE_LOGIN'
export const ICON_CHANGE = 'ICON_CHANGE'
export const SIGNUP_CLICK = 'SIGNUP_CLICK'
export const SIGNUP_CANCEL = 'SIGNUP_CANCEL'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'

export function loginGoogle(data){
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var body = {
                serviceName: "google",
                accessToken: data.accessToken,
                idToken: data.tokenId,
                expiresIn: 200
            }
            api.post('/login', body)
            .then(res => {
                localStorage.setItem('authToken', res.data.data.authToken);
                localStorage.setItem('user', res.data.data.userId);
                dispatch({
                    type: LOAD_SUCCESS,
                    payload: 'none'
                })
                browserHistory.push('/');
            }, err => {
                dispatch({
                    type: LOGIN_FALSE,
                    payload: true,
                    message: "An error occurred"
                })
            })
        resolve();
        })
    }
}

export function changeIndex() {
    return (dispatch, getState) => {
        if(getState().login.password == getState().login.password2){
            dispatch({
                type: CHANGE_INDEX,
                payload: 1
            })
        }else{
            dispatch({
                type: SIGNUP_FAILED,
                payload: true,
                message: "The password does not match!"
            })
        }
    }
}

export function handleScroll() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    var scroll = {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    }
    return (dispatch, getState) => {
        var login = {...getState().login};
        if(scroll.y > 0){
            dispatch({
                type: ICON_CHANGE,
                payload: 'block'
            })
        }else if(scroll.y == 0){
            dispatch({
                type: ICON_CHANGE,
                payload: 'none'                
            })
        }   
    }
}


export function handleSignup() {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
        dispatch({
            type: PROGRESS,
            payload: "flex"
        })
        var body = {
            name: getState().login.name,
            email: getState().login.email,
            password: getState().login.password,
            password2: getState().login.password2
        }
            api.post('/register', body)
                .then(res => {
                    localStorage.setItem('authToken', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    dispatch({
                        type: LOAD_SUCCESS,
                        payload: 'none'
                    })
                    window.location.href = '/'
                })
                .catch(err => {
                    dispatch({
                        type: SIGNUP_FAILED,
                        payload: true,
                        message: err.response.data.message
                    })
                })
            resolve();
        });
    }
}

export function handleLogin() {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
        dispatch({
            type: PROGRESS,
            payload: "flex"
        })
        var body = {
            email: getState().login.username_log,
            password: getState().login.password_log
        }
            api.post('/login', body)
                .then(res => {
                    localStorage.setItem('authToken', res.data.token);
                    res.data.user.status = true;
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    dispatch({
                        type: LOAD_SUCCESS,
                        payload: 'none'
                    })
                    window.location.href = '/'
                })
                .catch(err => {
                    dispatch({
                        type: LOGIN_FALSE,
                        payload: true,
                        message: err.response.data.message
                    })
                })
			resolve();
    });
    }
}

export function makeState(key, text){
    return {
      type : MAKE_STATE_LOGIN,
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

  export const signupClick = () => {
    return {
       type: SIGNUP_CLICK,
       payload: 'block'
    };
 }
 
 export const signupCancel = () => {
     return {
        type: SIGNUP_CANCEL,
        payload: 'none'
     };
  }

  const initialState = {
    display: 'none',
    message: '',
    dialog: false,
    icon: 'none',
    block: 'none',
    name: '',
    email: '',
    password: '',
    password2: '',
}


const ACTION_HANDLERS = {
    [ICON_CHANGE] : (state, action) => {
        return Object.assign({}, state, {
          icon: action.payload
        })
    },
    [CLOSE_DIALOG] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload,
          block: 'none'
        })
    },
    [SIGNUP_CLICK] : (state, action) => {
        return Object.assign({}, state, {
          display: action.payload
        })
    },
    [SIGNUP_CANCEL] : (state, action) => {
        return Object.assign({}, state, {
          display: action.payload
        })
    },
    [LOAD_SUCCESS] : (state, action) => {
        return Object.assign({}, state, {
          block: action.payload,
          display: 'none',
        })
    },
    [LOGIN_FALSE] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload,
          message: action.message,
          block: 'none'
        })
    },
    [SIGNUP_FAILED] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload,
          message: action.message,
          block: 'none'
        })
    },
    [MAKE_STATE_LOGIN]: (state, action) => {
        return Object.assign({}, state, {
          [action.key]: action.payload
        })
    },
    [PROGRESS] : (state, action) => {
        return Object.assign({}, state, {
          block: action.payload
        })
    },
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
