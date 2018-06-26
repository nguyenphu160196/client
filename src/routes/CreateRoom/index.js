import { injectReducer } from '../../store/reducers'
import  {makeState,getAvatar} from './modules/createRoom'



export default (store) => ({
  path: '/create-room',
  childRoutes: [

  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CreateRoom = require('./containers/CreateRoomContainer').default;
      const reducer = require('./modules/createRoom').default;
      injectReducer(store, { key: 'createRoom', reducer });
      // store.dispatch(getAvatar());
      cb(null, CreateRoom);
    }, 'createRoom')
  }
})