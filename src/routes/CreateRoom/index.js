import { injectReducer } from '../../store/reducers'



export default (store) => ({
  path: '/create-room',
  childRoutes: [

  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CreateRoom = require('./containers/CreateRoomContainer').default;
      const reducer = require('./modules/createRoom').default;
      injectReducer(store, { key: 'createRoom', reducer });
      cb(null, CreateRoom);
    }, 'createRoom')
  }
})