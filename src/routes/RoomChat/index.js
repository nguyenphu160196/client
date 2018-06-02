import { injectReducer } from '../../store/reducers'
import  {creRoomInfo} from './modules/roomChat'



export default (store) => ({
  path: '/c/:id',
  childRoutes: [

  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RoomChat = require('./containers/RoomChatContainer').default;
      const reducer = require('./modules/roomChat').default;
      injectReducer(store, { key: 'roomChat', reducer });
      store.dispatch(creRoomInfo());
      cb(null, RoomChat);
    }, 'roomChat')
  }
})