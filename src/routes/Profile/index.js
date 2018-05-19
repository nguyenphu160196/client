import { injectReducer } from '../../store/reducers'
import {makeState, getAvatar} from './modules/profile'
import {sett_prof} from '../Main/modules/main'


export default (store) => ({
  path: '/profile',
//   indexRoute: ,
  childRoutes: [
  	
  ],
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Profile = require('./containers/ProfileContainer').default;
      const reducer = require('./modules/profile').default;
      injectReducer(store, { key: 'profile', reducer });
      store.dispatch(makeState('imageURL', ''));
      store.dispatch(makeState('save_btn', 'disabled'));
      store.dispatch(makeState('prof_pass', ''));
      store.dispatch(makeState('prof_name', localStorage.user ? JSON.parse(localStorage.user).name : ''));
      store.dispatch(makeState('prof_email', localStorage.user ? JSON.parse(localStorage.user).email : ''));
      store.dispatch(getAvatar());
      store.dispatch(sett_prof());
      cb(null, Profile);
    }, 'profile')
  }
})