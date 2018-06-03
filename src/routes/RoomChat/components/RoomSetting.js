import React from 'react'
import PropTypes from 'prop-types'
import './RoomChat.scss'

import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import Clear from 'material-ui/svg-icons/content/clear'
import Save from 'material-ui/svg-icons/content/save'
import Edit from 'material-ui/svg-icons/editor/border-color'
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace'



export const RoomSetting = ({ makeState, roomChat }) => (
    <div style={{height: '100%', borderLeft: '1px solid lightgrey'}}>
        <div className="col-md-12 d-flex flex-row" style={{padding: '10px 0px'}}>
            <div className="col-md-10" style={{alignSelf: 'center'}}>
                {roomChat.roomInfo && roomChat.roomInfo.direct == true ? "Conversation Info" : "Room Info"}
            </div>
            <IconButton
                onClick={() => {
                    makeState('widthLeft','col-md-12');
                    makeState('iconButton','col-md-9');
                    makeState('settingOn','none');
                }}
            ><Clear /></IconButton>
        </div>

        <div className="col-md-12 d-flex justify-content-center" style={{margin: '20px 0px'}}>
            <div style={{
                            height: 150, width: 150, 
                            backgroundColor: roomChat.roomInfo ? roomChat.roomInfo.avatar :"unset",
                            color: '#fff',
                            fontSize: 90,
                            textAlign: 'center'
                        }}>
                {roomChat.roomInfo ? roomChat.roomInfo.name.charAt(0).toUpperCase() : ""}
            </div>
        </div>

        <div className="col-md-12 d-flex justify-content-center" style={{margin: '20px 0px 0px'}}>
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
                        }} >{<Back />}</span>
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
                <IconButton tooltip="Change name" tooltipPosition="top-right"
                    onClick={() => {
                            
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

        <div className="col-md-12">
            <div className='d-flex flex-wrap' style={{height: "200px", overflowX: 'hidden', overflowY: 'scroll'}}>
                {/* <Chip style={{margin: 4}}>
                    {localStorage.user && JSON.parse(localStorage.user).avatar.charAt(0) == '#'
                        ? 
                        <Avatar style={{backgroundColor: localStorage.user ? JSON.parse(localStorage.user).avatar : "unset"}}
                        >
                                {localStorage.user ? JSON.parse(localStorage.user).name.charAt(0).toUpperCase() : ""}
                        </Avatar>  
                        : 
                        <Avatar src={createRoom ? createRoom.avatar : ''}></Avatar>  }
                        {JSON.parse(localStorage.getItem('user')).name}
                </Chip> */}
                {/* {createRoom && (createRoom.list_participants.length > 0) ? createRoom.list_participants.map((value, i) => {
                    return (
                        <Chip
                            key={i}
                            onRequestDelete={() => {
                                deleteChip(value._id)
                                .then(() => {
                                    act_btn();
                                });
                            }}
                            style={{margin: 4}}
                        >
                            {value && (value.avatar.charAt(0) == '#')	
                                ?
                                <Avatar style={{backgroundColor: value ? value.avatar : ''}}>
                                    {value.name.charAt(0).toUpperCase()}
                                </Avatar>
                                :
                                <Avatar src={value.avatar} />
                            }
                                {value.name}
                        </Chip>
                    )
                })
                    :'' 
                }	 */}
            </div>
        </div>

        <div className="col-md-12">
            <div className={roomChat.roomInfo && roomChat.roomInfo.direct == true ? "hidden" : '' + "col-md-12 d-flex justify-content-between"} style={{margin: '20px 0px'}}>
                <button className="btn btn-primary form-control"style={{width: '45%'}}>Add User</button>
                <button className="btn btn-outline-warning form-control" style={{width: '45%'}}>Leave</button>
            </div>
            <div className="col-md-12">
                <button className="btn btn-danger form-control" disabled={roomChat.settingEdit}>Delete</button>
            </div>
        </div>

    </div>
)

export default RoomSetting