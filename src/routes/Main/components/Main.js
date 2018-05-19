import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

import './Main.scss'
import ChannelList from './ChannelList'
import Account from './Account'
import Progress from '../../../components/Common/PageLoading'
import Snackbar from '../../../components/Common/Snackbar'

import { GoogleLogout } from 'react-google-login';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import Clear from 'material-ui/svg-icons/content/clear'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Profile from 'material-ui/svg-icons/action/account-box'
import Preference from 'material-ui/svg-icons/action/list'


const logout = (response) => {
  console.log(response);
}

export const Search = ({main, makeState}) => {
  return (
   <div>
     <Drawer 
      open={main.search}
      width='25%'
     >
     <div className="row" style={{display:"flex", alignItems: 'center', justifyContent: 'center', padding:'15px 0px'}}>
				 <div className="col-sm-11">
            <div className="input-group" style={{height: '40px'}}>
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon1" 
                style={{
                  backgroundColor: 'unset',
                  borderRight: 'none'
                }} >{<SearchIcon />}</span>
              </div>
              <input type="text" className="form-control" placeholder="Search friend" 
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid #ccc',
                  borderLeft: 'none',
                  borderRight: 'none',
                  paddingLeft: '0px',
                }} 
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" 
                  onClick={() => {
                    makeState('search',false);
                  }} 
                  type="button" 
                  style={{
                    borderLeft: 'none'
                }}>{<Clear />}</button>
              </div>
            </div>
				 </div>
			 </div>
     </Drawer>
   </div>
   );
 }

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

export const Main = ({ main, signOut, makeState, children, changeStatus, closeSnacke }) => {

return (
  <div style={{ margin: '0 auto',height: '100%' }} >
  <Progress display={main.block}></Progress>
    <div className='row' style={{margin: '0 auto',height: '100%'}}>

        <div className='col-md-3' style={{borderRight: '1px solid lightgray', padding: '0px'}}>  
          <Snackbar 
            open={main.snackeOpen}
            message={main.snackeMess}
            onRequestClose={closeSnacke}
            contentStyle={{color: main.snakeColor}}
          />
          <Search 
            main={main}
            makeState={makeState}
          /> 
          <SettingLeft 
            main={main}
            makeState={makeState}
          />         
          <Account
            main={main}
            signOut={signOut}
            makeState={makeState}
            changeStatus={changeStatus}
          ></Account>
          <div className='row' style={{margin: '0 auto', overflowY:'scroll',height:'calc(100% - 84px)'}}>
            <Subheader>Room</Subheader>
            <List style={{width: '100%', padding: '0px', height: 'calc(100% - 40px)'}}>
                {main.friendlist ? 
                  main.friendlist.map((value, key) => {
                    return (
                      <ChannelList
                        key={key}
                        array={value}
                      />
                    )
                  })
                  : 'Empty'}
            </List>
          </div>
        </div>
        <div className='col-md-9' style={{padding: '0px'}}>
            {children}
        </div>
    </div>
  </div>
)}

// <GoogleLogout
//   className="btn btn-danger"
//   buttonText="Logout"
//   onLogoutSuccess={logout}
// >
// </GoogleLogout>

Main.propTypes = {
  children: PropTypes.node,
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  makeState: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  closeSnacke: PropTypes.func.isRequired
}

export default Main
