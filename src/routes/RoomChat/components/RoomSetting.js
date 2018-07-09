import React from 'react'
import PropTypes from 'prop-types'
import { imagesURL } from '../../../config'
import './RoomChat.scss'

import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import Clear from 'material-ui/svg-icons/content/clear'
import Save from 'material-ui/svg-icons/content/save'
import Edit from 'material-ui/svg-icons/editor/border-color'
import ClearOff from 'material-ui/svg-icons/action/highlight-off'



export const RoomSetting = ({ makeState, roomChat, hideRoom, changeRoomName }) => (
    <div style={{height: '100%', borderLeft: '1px solid lightgrey'}}>
        <div className="col-12 d-flex flex-row" style={{padding: '10px 0px'}}>
            <div className="col-10" style={{alignSelf: 'center'}}>
                {roomChat.roomInfo && roomChat.roomInfo.direct == true ? "User Info" : "Room Info"}
            </div>
            <IconButton
                onClick={() => {
                    makeState('widthLeft','col-12');
                    makeState('iconButton','col-9');
                    makeState('settingOn','none');
                }}
            ><Clear /></IconButton>
        </div>

        <div className="col-12 d-flex justify-content-center" style={{margin: '20px 0px'}}>
            {roomChat.roomInfo && (roomChat.roomInfo.avatar.charAt(0) == '#')
            ?
            <div style={{
                            height: 150, width: 150, 
                            backgroundColor: roomChat.roomInfo ? roomChat.roomInfo.avatar :"unset",
                            color: '#fff',
                            fontSize: 90,
                            textAlign: 'center'
                        }}>
                {roomChat.roomInfo ? roomChat.roomInfo.name.charAt(0).toUpperCase() : ""}
            </div>
            :
                <img width='150' height='150' src={roomChat.roomInfo ?  imagesURL + roomChat.roomInfo.avatar.split('/avatars/')[1] : ''} />
            }
        </div>

        <div className="col-12 d-flex justify-content-center" style={{margin: '20px 0px 0px'}}>
            <div className={roomChat.name_hidden + " input-group"} style={{alignSelf: 'center', width: '75%', height: '40px'}}>
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon1" 
                        onClick={() => {
                            makeState('name_show','');
                            makeState('name_hidden','hidden');
                            makeState('new_room_name','');
                        }}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: 'unset',
                            borderRight: 'none'
                        }} >{<ClearOff />}</span>
                </div>
                <input autoFocus type="text" className=' form-control'
                    onChange={(e) => {
                        makeState('new_room_name',e.target.value);
                    }}
                    style={{
                        paddingLeft: 0,
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #ccc',
                        borderLeft: 'none',
                        }}
                />
              </div>

            <div className={roomChat.name_show}
                        style={{
                            fontSize: 20,
                            margin: 'auto 0px',
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
            {roomChat.roomInfo ? "# " + roomChat.roomInfo.name : "Room Name"}
            </div>
            <div className={roomChat.name_hidden}>
                <IconButton tooltip="Change name" tooltipPosition="top-left"
                    onClick={() => {
                        changeRoomName();
                    }}
                >
                    <Save />
                </IconButton></div>
            <div className={roomChat.roomInfo && roomChat.roomInfo.direct == true ? "hidden" : roomChat.name_show}>
                <IconButton tooltip="Change name" tooltipPosition="top-right"
                    onClick={() => {
                        makeState('name_show','hidden');
                        makeState('name_hidden','');
                    }}
                >
                    <Edit />
                </IconButton>
            </div>
        </div>

        <div className="col-12" style={{marginTop: 50}}>
            {roomChat.roomInfo && (roomChat.roomInfo.direct == true)
            ?
            <div>
                <RaisedButton
                    label="Hide Chat"
                    secondary={true}
                    style={{margin: 12, width: '90%'}}
                    onClick={() => {
                        hideRoom(roomChat.roomInfo._id);
                    }}
                />
            </div>
            :
            <div>
                <RaisedButton
                    label="Participants"
                    primary={true}
                    style={{margin: 12, width: '90%'}}
                    onClick={() => {
                        makeState('participantOn','block');
                        makeState('settingOn','none');
                    }}
                />
                <RaisedButton
                    label="Hide Room"
                    secondary={true}
                    style={{margin: 12, width: '90%'}}
                    onClick={() => {
                        hideRoom(roomChat.roomInfo._id);
                    }}
                />
            </div>
            }
        </div>

    </div>
)

export default RoomSetting