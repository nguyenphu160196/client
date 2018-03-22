// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Main from './Main'
import LoginRoute from './Login'
import {browserHistory} from 'react-router'

const loginReq = () => {
  if(!localStorage.access_token) {
    browserHistory.push('/login');
  } 
}
const homeRedirect = (store) => {
  if(localStorage.access_token) {
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
      indexRoute: Main(store),
      childRoutes: [

      ]
    },   
    {
      onEnter: homeRedirect,
      childRoutes: [
        LoginRoute(store)
      ]
    }
  ]
})


export default createRoutes
