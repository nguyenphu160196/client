import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';


const RequireEmail = ({login, makeState, passwordForgotten}) => {
  
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={() => passwordForgotten()}
        disabled={login.login_require_email != '' ? false : true}
      />,
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={() => {makeState('openRE', false); makeState('messageRE', ''); }}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Please enter your Email Account"
          actions={actions}
          modal={false}
          open={login.openRE}
          onRequestClose={() => {makeState('openRE', false); makeState('messageRE', ''); }}
          contentStyle={{width: 546}}
        >
          <input type='email' className="form-control" 
								onChange={(e) => {
									makeState('login_require_email', e.target.value)
								}}
								placeholder='Please enter your email account' 
								value={login.login_require_email}/>
            {login.progressRE
              ?
              <div style={{marginTop: 5}}><LinearProgress mode="indeterminate" /></div>
              :
              <div style={{color: 'red'}}>{login.messageRE}</div>
            }
        </Dialog>
      </div>
    );
  }

  export default RequireEmail;