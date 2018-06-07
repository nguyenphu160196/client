import { injectReducer } from '../../store/reducers'
import {sett_prof} from '../Main/modules/main'
import { getHidden } from './modules/preferences'

export default (store) => ({
  path: '/preferences',
//   indexRoute: ,
  childRoutes: [
  	
  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Preferences = require('./containers/PreferencesContainer').default;
      const reducer = require('./modules/preferences').default;
      injectReducer(store, { key: 'preferences', reducer });
      store.dispatch(sett_prof());
      store.dispatch(getHidden());
      cb(null, Preferences);
    }, 'preferences')
  }
})