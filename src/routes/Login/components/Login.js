import React from 'react'
import PropTypes from 'prop-types'
import './Login.scss'
import Progress from '../../../components/Common/PageLoading'
import Signup from '../../../components/Signup/Signup'
import LoginPop from '../../../components/Login/Login'


export const Login = ({ login, handleLogin, makeState, handleSignup,handleScroll, closeDialog, signupClick, signupCancel, loginGoogle}) => (
  <div style={{margin: '0px!important', padding: '0px!important'}} >
    
        <Progress display={login.block}></Progress>
				<Signup 
					display={login.display}
					onCancel={signupCancel}
					handleSignup={handleSignup}
					makeState={makeState}
					login={login}
				></Signup>
				<div className="nav-bar col-12">
					<ul>
						<li><a className="active" onClick={signupClick}>Sign Up</a></li>
						{/* <li><a href='/feature' target='_blank'>Feature</a></li> */}
						<li><a className='mess' style={{display: login.icon}} href="#">"Cut Air"</a></li>
						<li><a className='mess-icon' style={{display: login.icon}} href="#"></a></li>
					</ul>
				</div>
				<div className='page-1 col-12'>
					<LoginPop 
						closeDialog={closeDialog} 
						handleLogin={handleLogin}
						message={login.message}
						dialog={login.dialog}
						handleScroll={handleScroll}
						makeState={makeState}
						loginGoogle={loginGoogle}
					></LoginPop>
					<div className='devices-img col-7'></div>
				</div>
				<div className='page-2 col-12'>
					<div className='page-2-img col-3'></div>
					<div className='page-2-txt col-3'>
						<h1>Introducing video calling in "Cut Air".</h1>
						<p>Now you can have face-to-face conversations with friends and family. It’s fast and easy to make video calls anywhere in the world.</p>
						<a className='btn_learnMore' href='#'>LERN MORE</a>
					</div>
				</div>
				<div className='page-3 col-12'>
					<h1>Texting and so much more.</h1>
					<p>Check out all you can do in Messenger.</p>
					<div className='page-3-content col-8'>
						<div className='content-child col-2'>
							<a href=''>
								<div id='Aa'></div>
								<h3>Know when people have seen your texts.</h3>
							</a>
						</div>
						<div className='content-child col-2'>
							<a href=''>
								<div id='phone_icon'></div>
								<h3>Make HD calls anywhere in the world.</h3>
							</a>
						</div>
						<div className='content-child col-2'>
							<a href=''>
								<div id='camera_icon'></div>
								<h3>Snap photos and shoot videos.</h3>
							</a>
						</div>
					</div>
					<div className='page-3-content col-8'>
						<div className='content-child col-2'>
							<a href=''>
								<div id='smile'></div>
								<h3>Choose from thousands of stickers.</h3>
							</a>
						</div>
						<div className='content-child col-2'>
							<a href=''>
								<div id='record'></div>
								<h3>Record voice messages.</h3>
							</a>
						</div>
						<div className='content-child col-2'>
							<a href=''>
								<div id='three_somes'></div>
								<h3>Chat with your favorite groups.</h3>
							</a>
						</div>
					</div>
					<a id='explore' href='#'>EXPLORE</a>
				</div>
				<div className='footer col-12'>
					<p>The Facebook, Apple, Google Play, and Windows logos are trademarks of their respective owners.</p>
				</div>
  
  </div>
)
Login.propTypes = {
  login: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired, 
  signupClick: PropTypes.func.isRequired, 
  signupCancel: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired
}

export default Login
