import { connect } from 'react-redux'
import {  } from '../modules/setting'

import Setting from '../components/Setting'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    setting : state.setting
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
