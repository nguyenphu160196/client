import { connect } from 'react-redux'
import { makeState, saveCond, updateProfile } from '../modules/profile'

import Profile from '../components/Profile'

const mapDispatchToProps = {
    makeState,
    saveCond,
    updateProfile
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
