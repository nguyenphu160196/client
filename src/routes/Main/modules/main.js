import {browserHistory} from 'react-router'
import api from '../../../../src/api'

export const HANDLE_SIGNOUT = 'HANDLE_SIGNOUT'


export function signOut() {
  return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
          dispatch({
              type: HANDLE_SIGNOUT
          })
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          browserHistory.push('/login');
      })

  }
}

const initialState = {

}

const ACTION_HANDLERS = {
  [HANDLE_SIGNOUT] : (state, action) => state
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
