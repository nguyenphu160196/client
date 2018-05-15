import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '',
//   indexRoute: ,
//   childRoutes: [
//   	Setting(store)
//   ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Default = require('./containers/DefaultContainer').default;
      const reducer = require('./modules/default').default;
      injectReducer(store, { key: 'defaultpage', reducer });
      cb(null, Default);
    }, 'defaultpage')
  }
})