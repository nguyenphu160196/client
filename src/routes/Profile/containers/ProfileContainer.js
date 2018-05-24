import { connect } from 'react-redux'
import { makeState, saveCond, checkPassRequire } from '../modules/profile'

import Profile from '../components/Profile'

const mapDispatchToProps = {
    makeState,
    saveCond,
    checkPassRequire
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
