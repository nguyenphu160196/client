import api from '../../../../src/api'
import {browserHistory} from 'react-router'

export const LOGIN_FALSE = 'LOGIN_FALSE'
export const HANDLE_LOGIN = 'HANDLE_LOGIN'
export const HANDLE_SIGNUP = 'HANDLE SIGNUP'
export const SIGNUP_FAILED = 'SIGNUP_FAILED'
export const MAKE_STATE = 'MAKE_STATE'
export const ICON_CHANGE = 'ICON_CHANGE'
export const SIGNUP_CLICK = 'SIGNUP_CLICK'
export const SIGNUP_CANCEL = 'SIGNUP_CANCEL'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'


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
            type: HANDLE_SIGNUP,
            payload: true,
            message: 'Handling signup!'
        })
        var body = {
            // email: getState().login.email,
            // password: getState().login.password
            name: "thien phu",
            email: "thienphu@gmail.com",
            password: "123123",
            password2: '123123'

        }
            api.post('/register', body)
                .then(res => {
                    if(res.data.success == true){
                        dispatch({
                            type: SIGNUP_FAILED,
                            payload: true,
                            message: res.data.message
                        })
                    }else{
                        dispatch({
                            type: HANDLE_LOGIN,
                            payload: true,
                            message: 'Handling login!'
                        })
                        var body = {
                            // email: getState().login.email,
                            // password: getState().login.password
                            email: "thienphu@gmail.com",
                            password: "123123"
                        }
                            api.post('/login', body)
                                .then(res => {
                                    if(res.data.success == false){
                                        dispatch({
                                            type: LOGIN_FAILED,
                                            payload: true,
                                            message: res.data.message
                                        })
                                    }else{
                                        localStorage.setItem('access_token', res.data.token);
                                        // var home = {...getState().login};
                                        // home.doctor = response.doctor;
                                        browserHistory.push('/');
                                    }
                                }, err => {
                                    console.log(err);
                                    dispatch({
                                        type: LOGIN_FALSE,
                                        payload: true,
                                        message: 'An error occurred!'
                                    })
                                })
                            resolve();
                    }
                }, err => {
                    console.log(err);
                    dispatch({
                        type: SIGNUP_FAILED,
                        payload: true,
                        message: 'An error occurred!'
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
            type: HANDLE_LOGIN,
            payload: true,
            message: 'Handling login!'
        })
        var body = {
            // email: getState().login.email,
            // password: getState().login.password
            email: "thienphu@gmail.com",
            password: "123123"
        }
            api.post('/login', body)
                .then(res => {
                    if(res.data.success == false){
                        dispatch({
                            type: SIGNUP_FAILED,
                            payload: true,
                            message: res.data.message
                        })
                    }else{
                        localStorage.setItem('access_token', res.data.token);
                        // var home = {...getState().login};
                        // home.doctor = response.doctor;
                        browserHistory.push('/');
                    }
                }, err => {
                    console.log(err);
                    dispatch({
                        type: LOGIN_FALSE,
                        payload: true,
                        message: 'An error occurred!'
                    })
                })
			resolve();
    });
    }
}

export function makeState(key, text){
    return {
      type : MAKE_STATE,
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
    block: 'none'
}


const ACTION_HANDLERS = {
    [ICON_CHANGE] : (state, action) => {
        return Object.assign({}, state, {
          icon: action.payload
        })
    },
    [CLOSE_DIALOG] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload
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
    [HANDLE_LOGIN] : (state, action) => {
        return Object.assign({}, state, {
          message: action.message
        })
    },
    [HANDLE_SIGNUP] : (state, action) => {
        return Object.assign({}, state, {
          message: action.message
        })
    },
    [LOGIN_FALSE] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload,
          message: action.message
        })
    },
    [SIGNUP_FAILED] : (state, action) => {
        return Object.assign({}, state, {
          dialog: action.payload,
          message: action.message
        })
    },
    [MAKE_STATE]: (state, action) => {
        return Object.assign({}, state, {
          [action.key]: action.payload
        })
    }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
