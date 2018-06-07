import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '*',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NotFound = require('./containers/Page404Container').default;
      const reducer = require('./modules/page404').default;
      injectReducer(store, { key: 'notfound', reducer });
      cb(null, NotFound);
    }, 'notfound')
  }
})