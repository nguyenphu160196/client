import React from 'react'
import {browserHistory} from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import Logout from 'material-ui/svg-icons/action/power-settings-new'
import Profile from 'material-ui/svg-icons/action/settings'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Search from 'material-ui/svg-icons/action/search'
import CreatRoom from 'material-ui/svg-icons/content/create'

const Account = ({main, signOut, makeState, changeStatus}) => {
    return (
        <div className='row' style={{margin: '0 auto',boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px', padding: '8px 0px'}}>
            <div className="col-sm-6 d-flex flex-row" style={{}}>
                    <Avatar style={{margin: '5px', backgroundColor: localStorage.user ? JSON.parse(localStorage.user).avatar : "unset"}}
                        src={localStorage.user && (new RegExp("#")).test(localStorage.user.avatar) != true ? localStorage.user.avatar : ""}
                    >
                        {localStorage.user ? JSON.parse(localStorage.user).name.charAt(0).toUpperCase() : ""}
                    </Avatar>  
                    {localStorage.user && JSON.parse(localStorage.user).status == true ? <div style={{background: "lawngreen", left: 49, height: 12, width: 12, borderRadius: 100, bottom: 6, border: '1.5px solid #fff', position: 'absolute'}}></div> : <div style={{background: "red", left: 49, height: 12, width: 12, borderRadius: 100, bottom: 6, border: '1.5px solid #fff', position: 'absolute'}}></div>}
            </div>
            <div className="col-sm-2" style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
                <IconButton 
                    tooltip="Search"
                    onClick={() => {
                        makeState('search', true);
                    }}
                >
                        <Search />
                </IconButton>
            </div>
            <div className="col-sm-2" style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
                <IconButton 
                    tooltip="Create a new room"
                    onClick={() => {
                        browserHistory.push('/create-room');
                    }}
                >
                        <CreatRoom />
                </IconButton>
            </div>
            <div className="col-sm-2" style={{display: 'flex', justifyContent:'center',alignItems:'center'}}>
                <IconMenu
                    iconButtonElement={<IconButton tooltip="More"><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    // targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem 
                        primaryText="Online"
                        leftIcon={<div style={{background: "lawngreen", margin: 17, left: 13, height: 14, width: 14, borderRadius: 100}}></div>}
                        onClick={(e) => {
                            changeStatus(true);
                        }}
                    />
                    <MenuItem 
                        primaryText="Offline"
                        leftIcon={<div style={{background: "red", margin: 17, left: 13, height: 14, width: 14, borderRadius: 100}}></div>}
                        onClick={(e) => {
                            changeStatus(false);
                        }}
                    />
                    <Divider />                
                    <MenuItem 
                            primaryText="Setting"
                            leftIcon={<Profile />}
                            onClick={(e) => {
                            browserHistory.push('/setting'); 
                            makeState('setting', true);
                        }}
                    />
                    <MenuItem 
                        primaryText="Sign out"
                        leftIcon={<Logout />}
                        onClick={(e) => {
                            signOut()
                        }}
                    />
                </IconMenu>
            </div>
        </div>
    );
}

export default Account;