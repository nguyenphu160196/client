import React from 'react'
import './signup.scss'


class Signup extends React.Component{
	constructor(props) {
	    super(props);
	}
	render() {
		return (
			<div className='sign-up col-12' style={{display: this.props.display}}>
				<div className='signup-popup col-4'>
					<div className='signup-label'>
						<label>Sign Up</label>
					</div>
					<form onSubmit={e => {
						e.preventDefault()
						this.props.handleSignup({
							name: this.username.value,
							email: this.email.value,
							password: this.password.value,
							password2: this.repassword.value
						},
							{email: this.email.value,
							password: this.password.value}
						)}
					}>
						<input type='text' ref={(input) => {this.username = input;}} name='username' placeholder='Username' required/>
						<input type='email' ref={(input) => {this.email = input;}} name='email' placeholder='Email' required/>
						<input type='password' ref={(input) => {this.password = input;}} name='password' placeholder='Password' required/>
						<input type='password' ref={(input) => {this.repassword = input;}} name='re-password' placeholder='Re-Password' required/>
						<div className='btn_form'>
							<input type='submit' className='signup-submit' value='Sign Up'/>
							<input type='button' onClick={this.props.onCancel} className='signup-cancel' value='Cancel'/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Signup;
