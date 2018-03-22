import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '',
  childRoutes: [
    
  ],
  getComponent (nextState, cb) {
    
    require.ensure([], (require) => {
      
      const Main = require('./containers/MainContainer').default
      const reducer = require('./modules/main').default

      injectReducer(store, { key: 'main', reducer })

      cb(null, Main)

    }, 'main')
  }
})
