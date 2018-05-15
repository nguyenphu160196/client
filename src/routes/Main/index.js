import { injectReducer } from '../../store/reducers'
import {reLogin} from './modules/main'
import Indirect from '../Indirect'

export default (store) => ({
  path : '',
  childRoutes: [
    Indirect(store),
  ],
  getComponent (nextState, cb) {
    
    require.ensure([], (require) => {
      
      const Main = require('./containers/MainContainer').default
      const reducer = require('./modules/main').default
      injectReducer(store, { key: 'main', reducer })
      // store.dispatch(reLogin());
      cb(null, Main)

    }, 'main')
  }
})
