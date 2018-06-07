import { connect } from 'react-redux'
import { makeState, unLock } from '../modules/preferences'

import Preferences from '../components/Preferences'

const mapDispatchToProps = {
    makeState,
    unLock
}

const mapStateToProps = (state) => ({
    preferences : state.preferences
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
