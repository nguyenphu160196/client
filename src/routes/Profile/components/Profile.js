import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'

import RequirePass from './RequirePass'

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
			$('#imgURL').attr('src', e.target.result);
    }
		reader.readAsDataURL(input.files[0]);
  }
}

export const Profile = ({ profile, makeState, saveCond, checkPassRequire }) => (
  	<div className="row" style={{margin: 0, padding: 0}}>
	   <RequirePass 
		   profile={profile}
		   updateProfile={checkPassRequire}
		   makeState={makeState}
	   />
  		<div className="col-md-12" style={{borderBottom: '1px solid lightgrey'}}>
				<div className="col-md-12 d-flex flex-row" style={{padding: '14px 16px'}}>
					<div className="col-md-10" style={{
						alignSelf: 'center'
					}}>Profile</div>
					<div className="col-md-2">
						<button className="btn btn-primary" disabled={profile.save_btn}
								onClick={() => {
									makeState('open', true);
								}}
						>Save changes</button>
					</div>
				</div>
			</div>
			<div className="col-md-12">
				<div className="col-md-12" style={{padding: '20px 200px'}}>
					<div className="col-md-12" style={{marginBottom: 10}}>
							<p style={{fontSize: 18}}>Profile Details</p>
					</div>
					<div className="col-md-12">
							<p>Profile Picture</p>
					</div>
					<div className="col-md-12 d-flex flex-row">
							<div className="col-md-4">
								{localStorage.user && (JSON.parse(localStorage.user).avatar.charAt(0) == '#')
													&& profile.imageURL == ''
									? 
									<div 
											style={{
														height: 150, width: 150, 
														backgroundColor: localStorage.user ? JSON.parse(localStorage.user).avatar : "unset",
														color: '#fff',
														fontSize: 90,
														textAlign: 'center'
													}}>
										{localStorage.user ? JSON.parse(localStorage.user).name.charAt(0).toUpperCase() : ""}
									</div>  
									: 
									<img src={profile.prof_avat} id="imgURL" width="150" height="150" />
								}
							</div>
							<div className="">
							<label className="btn btn-primary btn-file">
									Upload <input type="file" hidden accept="image/x-png,image/gif,image/jpeg" 
												onChange={(e) => {			
														console.log(e.target.files[0].size);							
														makeState("imageURL", e.target.files[0])
														.then(() => {
															saveCond();
														});
														readURL(e.target);
													}
												} />
							</label>
							</div>
					</div>
					<div className="col-md-6" style={{marginTop: 20}}>
						<div className="" style={{marginTop: 20}}>
							<div>Name</div>
							<input type='text' className="form-control" 
								onChange={(e) => {
									makeState('prof_name', e.target.value)
									.then(() => {
										saveCond();
									});
								}}
								name='name' placeholder='Please enter your name' 
								value={profile.prof_name}/>
						</div>
						<div className="" style={{marginTop: 20}}>
							<div>Email</div>
							<input type='email' className="form-control" 
								onChange={(e) => {
									makeState('prof_email', e.target.value)
									.then(() => {
										saveCond();
									});
								}} 
								name='email' placeholder='Please enter your email' 
								value={profile.prof_email}/>
						</div>
						<div className="" style={{marginTop: 20}}>
							<div>New Password</div>
							<input type='text' className="form-control" 
								onChange={(e) => {
									makeState('prof_pass', e.target.value)
									.then(() => {
										saveCond();
									});						
								}}
								name='password' placeholder='New password' 
								value={profile.prof_pass}
								/>
						</div>
					</div>
					
				</div>
			</div>
  	</div>
)

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	makeState: PropTypes.func.isRequired,
	saveCond: PropTypes.func.isRequired,
	checkPassRequire: PropTypes.func.isRequired,
}

export default Profile