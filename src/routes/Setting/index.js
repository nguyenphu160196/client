import { injectReducer } from '../../store/reducers'
import Profile from '../Profile'
import Preferences from '../Preferences'



export default (store) => ({
  path: '/setting',
  indexRoute: Profile(store),
  childRoutes: [
    Profile(store),
    Preferences(store)
  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Setting = require('./containers/SettingContainer').default;
      const reducer = require('./modules/setting').default;
      injectReducer(store, { key: 'setting', reducer });
      cb(null, Setting);
    }, 'setting')
  }
})