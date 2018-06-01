import { injectReducer } from '../../store/reducers'
import { creRoomInfo } from './modules/room'

export default (store) => ({
  path: '/c/:id',
  childRoutes: [   
  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Room = require('./containers/RoomContainer').default;
      const reducer = require('./modules/room').default;
      injectReducer(store, { key: 'room', reducer });
      store.dispatch(creRoomInfo());
      cb(null, Room);
    }, 'room')
  }
})