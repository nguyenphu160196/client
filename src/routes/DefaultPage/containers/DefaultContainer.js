import { connect } from 'react-redux'
import {  } from '../modules/default'

import Default from '../components/Default'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    defaultpage : state.defaultpage
})

export default connect(mapStateToProps, mapDispatchToProps)(Default)
