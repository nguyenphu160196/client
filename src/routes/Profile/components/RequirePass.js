import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';


const RequirePass = ({profile, updateProfile, handleClose, makeState}) => {
  
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={() => updateProfile()}
        disabled={profile.prof_require_pass != '' ? false : true}
      />,
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={() => {makeState('open', false); makeState('message', ''); }}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Please enter your password"
          actions={actions}
          modal={false}
          open={profile.open}
          onRequestClose={() => {makeState('open', false); makeState('message', ''); }}
          contentStyle={{width: 546}}
        >
          For your security, you must enter your current password to continue
          <input type='password' className="form-control" 
								onChange={(e) => {
									makeState('prof_require_pass', e.target.value)
								}}
								placeholder='Please enter your password' 
								value={profile.requirepass}/>
            {profile.progress 
              ?
              <div style={{marginTop: 5}}><LinearProgress mode="indeterminate" /></div>
              :
              <div style={{color: 'red'}}>{profile.message}</div>
            }
        </Dialog>
      </div>
    );
  }

  export default RequirePass;