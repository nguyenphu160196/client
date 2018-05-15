import { connect } from 'react-redux'
import {  } from '../modules/preferences'

import Preferences from '../components/Preferences'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    preferences : state.preferences
})

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
