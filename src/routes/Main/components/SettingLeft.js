import React from 'react'
import {browserHistory} from 'react-router'

import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Clear from 'material-ui/svg-icons/content/clear'
import Profile from 'material-ui/svg-icons/action/account-box'
import Preference from 'material-ui/svg-icons/action/list'

export const SettingLeft = ({main, makeState}) => {
	return (
	 <div>
		 <Drawer
			 open={main.setting}
			 width="25%"
		 >
			 <div className="row">
				 <div className="col-sm-9" style={{display:"flex", alignItems: 'center', textIndent: '20px'}}>
					 My Account
				 </div>
				 <div className="col-sm-2">
					 <IconButton
						 onClick={() => {
                              browserHistory.push('/');
							  makeState('setting', false);
						 }}
					 >
						 <Clear />
					 </IconButton>
				 </div>
			 </div>
			 <MenuItem 
					 primaryText="Preferences"
					 leftIcon={<Preference />}
					 onClick={(e) => {
                     browserHistory.push('/preferences');
					 }}
			 />
			 <MenuItem 
					 primaryText="Profile"
					 leftIcon={<Profile />}
					 onClick={(e) => {
                     browserHistory.push('/profile');
					 }}
			 />
		 </Drawer>
	 </div>
	 );
 }

 export default SettingLeft;