// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Main from './Main'
import LoginRoute from './Login'
import Page404 from './PageNotFound'
import {browserHistory} from 'react-router'

const loginReq = () => {
  if(!localStorage.authToken) {
    browserHistory.push('/login');
  } 
}
const homeRedirect = (store) => {
  if(localStorage.authToken) {
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
        LoginRoute(store)
      ]
    },
    Page404(store)
  ]
})


export default createRoutes
