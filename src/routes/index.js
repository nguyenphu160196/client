// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Main from './Main'
import LoginRoute from './Login'
import Page404 from './PageNotFound'
import ResetPassword from './ResetPassword'

import {browserHistory} from 'react-router'
import socket from '../socketio'

const loginReq = () => {
  let exp = localStorage.authToken ? JSON.parse(atob(localStorage['authToken'].split('.')[1])).exp : '';
  if(!(exp >= Date.now()/1000)) {
      localStorage.clear();
      browserHistory.push('/login');
  } else{
    socket.emit('request-new-jwt','');
  }
}
const homeRedirect = (store) => { 
  let exp = localStorage.authToken ? JSON.parse(atob(localStorage['authToken'].split('.')[1])).exp : '';
  if(exp >= Date.now()/1000) {
    socket.emit('request-new-jwt','');
    browserHistory.push('/');
  }
}

export const createRoutes = (store) => ({
  path        : '/',
  component : CoreLayout,
  childRoutes : [
    //require auth route
    {      
      onEnter: loginReq,
      childRoutes: [
        Main(store)
      ]
    },   
    {
      onEnter: homeRedirect,
      childRoutes: [
        LoginRoute(store),
        ResetPassword(store)
      ]
    },
    Page404(store)
  ]
})


export default createRoutes
