import { connect } from 'react-redux'
import {  } from '../modules/profile'

import Profile from '../components/Profile'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
