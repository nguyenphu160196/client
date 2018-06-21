import { injectReducer } from '../../store/reducers'
import {  } from './modules/resetPassword'

export default (store) => ({
  path: '/resetpassword/:token',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ResetPass = require('./containers/ResetPasswordContainer').default;
      const reducer = require('./modules/resetPassword').default;
      injectReducer(store, { key: 'resetpass', reducer });
      cb(null, ResetPass);
    }, 'resetpass')
  }
})