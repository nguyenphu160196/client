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
      store.dispatch(makeState('typing',[]));
      store.dispatch(makeState('message_text',''));
      // p_wrap.textContent = '';
      store.dispatch(creRoomInfo());
      store.dispatch(makeState('widthLeft','col-12'));
      store.dispatch(makeState('iconButton','col-9'));
      store.dispatch(makeState('settingOn','none'));
      store.dispatch(makeState('participantOn','none'));
      store.dispatch(makeState('name_hidden','hidden'));
      store.dispatch(makeState('name_show',''));
      store.dispatch(makeState('new_room_name',''));
      cb(null, RoomChat);
    }, 'roomChat')
  }
})