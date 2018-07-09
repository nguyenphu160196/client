import React from 'react'
import PropTypes from 'prop-types'
import './ResetPassword.scss'
import DialogMessage from '../../../components/Common/DialogMessage'
import Progress from '../../../components/Common/PageLoading'

export const ResetPassword = ({ resetpass, makeState, closeDialog, resetPass }) => (
  	<div style={{height: '100%', margin: '0 auto'}}>
			<Progress display={resetpass.block}></Progress>
			<DialogMessage dialog={resetpass.dialog} message={resetpass.message} closeDialog={closeDialog} />
				<div className="col-12 d-flex justify-content-between" style={{padding: '15px 20px'}}>
					<div style={{fontFamily: 'Arial', fontSize: 20}} className="d-flex"><div className="icon"></div><div style={{fontStyle: 'italic', color: 'grey', marginLeft: 10, alignSelf: 'center'}}>kltn14110901</div></div>
					<a className="btn btn-primary" style={{color: '#fff'}} href="http://localhost:8080">Back to Login</a>
				</div>
				<div style={{width: '27%', margin: '80px auto', border: '1px solid lightgrey', padding: 10, borderRadius: 5}}>
					<div style={{fontSize:32, marginBottom: 20, textAlign: 'center', color: 'grey'}}>Reset Password</div>
					<form>
					<div className="form-group">
							<label htmlFor="exampleInputEmail1">New Password</label>
							<input type="password" className="form-control" id="exampleInputEmail1" 
								onChange={(e) => {
									makeState('newpass', e.target.value);
								}}
								value={resetpass.newpass}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Confirm Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1" 
								onChange={(e) => {
									makeState('confirmpass', e.target.value)
								}}
								value={resetpass.confirmpass}
							/>
						</div>
						<div className="btn btn-primary form-control"
							onClick={() => {
								resetPass();
							}}
						>Reset Password</div>
					</form>
				</div>
				<div className="footerRSP col-12"><p style={{textAlign: 'center', marginTop: 16}}>The Facebook Messenger logo is trademarks of their respective owners.</p></div>
  	</div>
)

ResetPassword.propTypes = {
	resetpass: PropTypes.object.isRequired,
	makeState: PropTypes.func.isRequired,
	closeDialog: PropTypes.func.isRequired,
	resetPass: PropTypes.func.isRequired
}

export default ResetPassword