import React from 'react'
import {browserHistory} from 'react-router'

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
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
    <IconButton tooltip={array && (array.direct == true) ? 'Hide Chat' : 'Hide Room'}
      onClick={() => {
        if(array && (array.direct == true)){
          hideRoom(array._id);
        }else{
          hideRoom(array._id);
        }
      }}
    ><Visibility/></IconButton>
  );
    return (
      <ListItem
        className="main-room-list"
        onClick={() => {
          browserHistory.push('/c/' +  array._id);
          array.noti = false;
        }}
        primaryText={array.direct && array.direct == true ? 
        <div className="d-flex">
          <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130}}>{array.name}</div>
          <div style={{color: '#fff', backgroundColor: '#0084ff', fontSize: 10, textAlign: 'center', width: 30, marginLeft: 10, fontWeight: 'bold'}}>User</div>
        </div> 
        :
        <div className="d-flex">{array.name}<div style={{color: '#fff', backgroundColor: 'red', fontSize: 10, textAlign: 'center', width: 35, marginLeft: 10, fontWeight: 'bold'}}>Group</div></div>}
        secondaryText={array.last && array.last != '' ? <div style={{fontStyle: 'italic'}}>{array.last}</div> : ''}
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

