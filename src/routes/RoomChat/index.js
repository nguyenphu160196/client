import { injectReducer } from '../../store/reducers'
import  {makeState, creRoomInfo} from './modules/roomChat'



export default (store) => ({
  path: '/c/:id',
  childRoutes: [

  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const RoomChat = require('./containers/RoomChatContainer').default;
      const reducer = require('./modules/roomChat').default;
      injectReducer(store, { key: 'roomChat', reducer });
      store.dispatch(makeState('message',[]));
      store.dispatch(makeState('message_text',''));
      store.dispatch(makeState('messagePage',1));
      store.dispatch(creRoomInfo());
      store.dispatch(makeState('widthLeft','col-md-12'));
      store.dispatch(makeState('iconButton','col-md-9'));
      store.dispatch(makeState('settingOn','none'));
      store.dispatch(makeState('participantOn','none'));
      store.dispatch(makeState('name_hidden','hidden'));
      store.dispatch(makeState('name_show',''));
      store.dispatch(makeState('new_room_name',''));
      cb(null, RoomChat);
    }, 'roomChat')
  }
})