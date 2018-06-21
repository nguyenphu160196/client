import { connect } from 'react-redux'
import { makeState, closeDialog, resetPass } from '../modules/resetPassword'

import ResetPassword from '../components/ResetPassword'

const mapDispatchToProps = {
    makeState,
    closeDialog,
    resetPass
}

const mapStateToProps = (state) => ({
    resetpass : state.resetpass
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
