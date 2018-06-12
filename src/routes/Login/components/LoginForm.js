import React from 'react'
import './Login.scss'
import DialogMessage from '../../../components/Common/DialogMessage'


class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.props.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.handleScroll);
	}
	
	render() {
		return (
			<div className='login-field col-5'>
				<div className='icon2x'></div>
				<h1>"Cut Air"</h1>
				<p>Login in With Cut-air</p>
				<form onSubmit={(event)=>{
					event.preventDefault();
					this.props.handleLogin();
				}}>
					<input type='email' onChange={(e) => {this.props.makeState('username_log',e.target.value)}}  name='username' placeholder='Email' required/>
					<input type='password' onChange={(e) => {this.props.makeState('password_log',e.target.value)}}  name='password' placeholder='Password' required/>
					<button type='submit'>Login in</button>
					<div className="form-group remember-me">
						<div className="fb-login-button" data-width="320px" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true" onClick={() =>
							<script>
							checkLoginState()
							</script>}>
						</div>
					</div>
				</form>
				
				<DialogMessage dialog={this.props.dialog} message={this.props.message} closeDialog={this.props.closeDialog}></DialogMessage>
			</div>
		);
	}
}

export default Login;