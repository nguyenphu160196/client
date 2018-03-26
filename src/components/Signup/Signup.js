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
						this.props.handleSignup()}
					}>
						<input type='text' onChange={(e) => {this.props.makeState('name',e.target.value)}} name='username' placeholder='Username' required/>
						<input type='email' onChange={(e) => {this.props.makeState('email',e.target.value)}} name='email' placeholder='Email' required/>
						<input type='password' onChange={(e) => {this.props.makeState('password',e.target.value)}} name='password' placeholder='Password' required/>
						<input type='password' onChange={(e) => {this.props.makeState('password2',e.target.value)}} name='re-password' placeholder='Re-Password' required/>
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
