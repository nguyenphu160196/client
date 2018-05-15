import React from 'react'

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LeaveRoom from 'material-ui/svg-icons/action/input'
import Favorite from 'material-ui/svg-icons/action/stars'

export const rightIconMenu = (
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


const ChannelList = ({array}) => {
    const notification = (
      <Badge
        badgeContent={0}
        secondary={true}
        badgeStyle={{top: 0, right: 40}}
      >
      </Badge>
  );
    return (
      <ListItem 
        primaryText={array.name}
        leftAvatar={<Avatar src="https://vignette.wikia.nocookie.net/epicrapbattlesofhistory/images/8/8c/Batman.gif/revision/latest?cb=20130824220307" />
        // {array.avatar}</Avatar>
      }
        rightIcon={notification}
        rightIconButton={rightIconMenu}
      >
      </ListItem>
    )
  }

export default ChannelList;

