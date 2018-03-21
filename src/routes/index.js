// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Main from './Main'
import LoginRoute from './Login'
import {browserHistory} from 'react-router'

const requireAuth = (store) => {
  if(!localStorage.access_token){
    browserHistory.push('/login');
  }else{
    browserHistory.push('/');
  }
};

export const createRoutes = (store) => ({
  path        : '/',
  childRoutes : [
    //require auth route
    {
      component : CoreLayout,
      onEnter: requireAuth(store),
      indexRoute: Main(store),
      childRoutes: [

      ]
    },   
    //unrequire auth route
    LoginRoute(store)
  ]
})


export default createRoutes
