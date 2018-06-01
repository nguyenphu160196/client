import { injectReducer } from '../../store/reducers'
import Setting from '../Setting'
import Default from '../DefaultPage'
import CreateRoom from '../CreateRoom'
import Room from '../Room';

export default (store) => ({
  path: '',
  indexRoute: Default(store),
  childRoutes: [
    Default(store),
    Setting(store),
    CreateRoom(store),
    Room(store)
  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Indirect = require('./containers/IndirectContainer').default;
      const reducer = require('./modules/indirect').default;
      injectReducer(store, { key: 'indirect', reducer });
      cb(null, Indirect);
    }, 'indirect')
  }
})