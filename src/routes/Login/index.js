import { injectReducer } from '../../store/reducers'
// import {handleLogin} from './modules/login'
import api from '../../../src/api'

export default (store) => ({
  path : 'login',
  
  getComponent (nextState, cb) {
    
    require.ensure([], (require) => {
      
      const Login = require('./containers/LoginContainer').default
      const reducer = require('./modules/login').default

      injectReducer(store, { key: 'login', reducer });
      
      // store.dispatch(handleLogin());
      cb(null, Login)

    }, 'login')
  }
})
