import { injectReducer } from '../../store/reducers'
import Indirect from '../Indirect'
import {getAvatar, makeState, getRoom, socketio} from './modules/main'

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
      store.dispatch(getAvatar());
      store.dispatch(getRoom());
      store.dispatch(socketio());
      store.dispatch(makeState('block', 'none'));
      cb(null, Main)

    }, 'main')
  }
})
