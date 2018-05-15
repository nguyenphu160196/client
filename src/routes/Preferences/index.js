import { injectReducer } from '../../store/reducers'


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
      cb(null, Preferences);
    }, 'preferences')
  }
})