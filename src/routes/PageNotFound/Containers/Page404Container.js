import { connect } from 'react-redux'
import {  } from '../modules/page404'

import NotFound from '../components/Page404'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    notfound : state.notfound
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
