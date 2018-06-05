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
import Favorite from 'material-ui/svg-icons/action/stars'

import './Main.scss'


const ChannelList = ({array}) => {
  const notification = (
      <Badge
        badgeContent={0}
        secondary={true}
        badgeStyle={{top: 0, right: 40}}
      >
      </Badge>
  );
  const rightIconMenu = (
    <IconMenu 
      iconButtonElement={<IconButton tooltip="more"><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    >
      <MenuItem 
          primaryText="Favorite"
          leftIcon={<Favorite />}
          // onClick={(e) => {
          // browserHistory.push('/setting'); 
          // }}
      />
      <MenuItem 
          primaryText="Leave room"
          leftIcon={<LeaveRoom />}
          // onClick={(e) => {
          //     signOut()
          // }}
      />
    </IconMenu>
  );
    return (
      <ListItem
        className="main-room-list"
        onClick={() => {
          browserHistory.push('/c/' +  array._id);
        }}
        primaryText={array.name}
        leftAvatar={array.avatar.charAt(0) != "#" 
                    ? 
                      <Avatar src={array.avatar} style={{backgroundColor: "none"}} />
                    :
                      <Avatar style={{backgroundColor: array.avatar}}
                      >{array.name.charAt(0).toUpperCase()}</Avatar>
                    }
        rightIcon={notification}
        rightIconButton={rightIconMenu}
      >
      </ListItem>
    )
  }

export default ChannelList;

