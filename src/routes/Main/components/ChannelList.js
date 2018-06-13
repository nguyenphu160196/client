import React from 'react'
import {browserHistory} from 'react-router'

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LeaveRoom from 'material-ui/svg-icons/action/input'
import Visibility from 'material-ui/svg-icons/action/visibility-off'
import BlockUser from 'material-ui/svg-icons/action/speaker-notes-off'


import './Main.scss'


const ChannelList = ({array, hideRoom}) => {
  const notification = (
      <Badge
        badgeContent={"!"}
        secondary={true}
        badgeStyle={{top: 0, right: 40}}
        style={{display: array.noti && array.noti == true ? 'block' : 'none'}}
      >
      </Badge>
  );
  const rightIconMenu = (
    <IconMenu 
      iconButtonElement={<IconButton tooltip="Options"><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    >
      <MenuItem 
          primaryText={array && (array.direct == true) ? 'Hide Chat' : 'Hide Room'}
          leftIcon={<Visibility/>}
          onClick={(e) => {
            if(array && (array.direct == true)){
              hideRoom(array._id);
            }else{
              hideRoom(array._id);
            }
          }}
      />
      {/* <MenuItem 
          primaryText={array && (array.direct == true) ? 'Block User' : 'Leave Room'}
          leftIcon={array && (array.direct == true) ? <BlockUser /> : <LeaveRoom />}
          onClick={(e) => {
            if(array && (array.direct == true)){
              console.log('block user');
            }else{
              console.log('leave room');
            } 
          }}
      /> */}
    </IconMenu>
  );
    return (
      <ListItem
        className="main-room-list"
        onClick={() => {
          browserHistory.push('/c/' +  array._id);
          array.noti = false;
        }}
        primaryText={array.name}
        leftAvatar={array.avatar.charAt(0) != "#" 
                    ? 
                      <Avatar src={array.avatar} style={{backgroundColor: "none"}} />
                    :
                      <Avatar style={{backgroundColor: array.avatar}}
                        >{array.name.charAt(0).toUpperCase()}                        
                      </Avatar>
                    }
        rightIcon={notification}
        rightIconButton={rightIconMenu}
      >
      </ListItem>
    )
  }

export default ChannelList;

