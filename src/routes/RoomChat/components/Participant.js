import React from 'react'

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import {List,ListItem} from 'material-ui/List';

import Clear from 'material-ui/svg-icons/content/clear'
import ClearOff from 'material-ui/svg-icons/action/highlight-off'
import Users from 'material-ui/svg-icons/action/perm-identity'
import Kick from 'material-ui/svg-icons/action/speaker-notes-off'


export const Participants = ({makeState, roomChat, search, kickUser}) => {
    return (
        <div style={{height: '100%', margin: '0 auto', borderLeft: '1px solid lightgrey'}}>
            <div className="col-md-12 d-flex flex-row" style={{padding: '10px 0px'}}>
                <div className="col-md-10" style={{alignSelf: 'center'}}>
                    Participants
                </div>
                <IconButton
                    onClick={() => {
                        makeState('widthLeft','col-md-12');
                        makeState('iconButton','col-md-9');
                        makeState('participantOn','none');
                    }}
                ><Clear /></IconButton>
            </div>

            <div className="col-md-12" style={{marginTop: 20}}>
                <div>Invite Users</div>
                <div className="input-group" >
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon1" 
                        style={{
                            backgroundColor: 'unset',
                            borderRight: 'none'
                        }} >{<Users />}</span>
                    </div>
                    <input type='text' className="form-control" 
                        value={roomChat.invite_input}
                        onChange={(e) => {
                            if(!(new RegExp("/")).test(e.target.value)){
                                makeState('invite_input',e.target.value)
                                search(e.target.value)
                            }
                        }}
                        onFocus={(e) => {
                            makeState('toogle_list_invite','block');
                            if(roomChat.invite_input != ''){
                                search(roomChat.invite_input);
                            }                            
                        }}
                        onBlur={() => {
                            if(roomChat.invite_input == ''){
                                makeState('toogle_list_invite','none')
                            }
                        }}
                        placeholder='Please enter users...' 
                        style={{
                            outline: 'none',
                            boxShadow: 'none',
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            paddingLeft: '0px',
                            borderRight: 'none'
                        }} 
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon1" 
                            style={{
                                backgroundColor: 'unset',
                                borderLeft: 'none',
                                cursor: 'pointer'
                            }} 
                            onClick={() => {
                                roomChat.toogle_list_invite != 'none' ? makeState('toogle_list_invite','none') : '';
                                roomChat.invite_input != '' ? makeState('invite_input','') : '';
                            }}
                            >{<ClearOff />}</span>
                        </div>
                </div>
            </div>

            <div style={{
                    overflowY:'scroll', 
                    height:'auto',
                    maxHeight: '410px',
                    position: 'fixed',
                    zIndex: '4',
                    backgroundColor: '#fff',
                    width: '22%',
                    margin: '10px 20px',
                    boxShadow: '0px 5px 20px #888888',
                    display: roomChat.toogle_list_invite
                    }}>
                <List>
                    {roomChat.invite_list && (roomChat.invite_list.length != 0) ? 
                        roomChat.invite_list.map((value, i) => {
                        return (
                            <ListItem 
                                key={i}
                                onClick={() => {
                                    
                                    makeState('toogle_list_invite','none');									
                                }}
                                primaryText={value.name}
                                leftAvatar={value.avatar.charAt(0) == '#' 
                                ? 
                                <Avatar style={{backgroundColor: value.avatar}}>{value.name.charAt(0).toUpperCase()}</Avatar>
                                :
                                <Avatar src={value.avatar}></Avatar>}
                            ></ListItem>
                        )
                        })
                        : <div style={{color: '#888888', marginLeft: 10}}>Nothing found!</div>}
                </List>
            </div>

            <List style={{width: '100%', padding: '0px 15px', height: '62%', marginTop: 50}}>
                {roomChat && roomChat.userInfo && (roomChat.userInfo.length != 0) ? 
                  roomChat.userInfo.map((value, i) => {
                    if(value._id != JSON.parse(localStorage.user)._id){
                        return (
                            <ListItem
                            key={i}
                            className="main-room-list"
                            primaryText={value.name}
                            leftAvatar={value.avatar.charAt(0) != "#" 
                                        ? 
                                          <Avatar src={value.avatar} style={{backgroundColor: "none"}} />
                                        :
                                          <Avatar style={{backgroundColor: value.avatar}}
                                            >{value.name.charAt(0).toUpperCase()}                        
                                          </Avatar>
                                        }
                            rightIconButton={
                                <IconButton 
                                    tooltip="kick user"
                                    tooltipPosition="top-left"
                                    disabled={roomChat && roomChat.roomInfo && (JSON.parse(localStorage.user)._id ==                        roomChat.roomInfo.owner) ? false : true}
                                    onClick={() => {
                                        kickUser(value._id)
                                    }}
                                >
                                    <Kick />
                                </IconButton>
                            }
                          >
                          </ListItem>
                        )
                    }
                  })
                  : ''}
            </List>


        </div>
    )
}

export default Participants;