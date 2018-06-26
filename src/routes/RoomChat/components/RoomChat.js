import React from 'react'
import PropTypes from 'prop-types'
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';
import './RoomChat.scss'
import RoomSetting from './RoomSetting'
import Participant from './Participant'
import Message from './Message'

import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import Info from 'material-ui/svg-icons/action/info-outline';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Mic from 'material-ui/svg-icons/av/mic';
import VideoCam from 'material-ui/svg-icons/av/videocam';
import EmojiIcon from 'material-ui/svg-icons/image/tag-faces';
import Send from 'material-ui/svg-icons/content/send';
import Attach from 'material-ui/svg-icons/editor/attach-file';
import AddImage from 'material-ui/svg-icons/image/photo';


import $ from 'jquery'


export class Initial extends React.Component{
	constructor(props) {
	  super(props);
	}
	componentDidMount() {
		this.props.initial();
	}
	render(){
	  return(<div></div>)
	}
  }

export const RoomChat = ({ roomChat, makeState, sendMessage, hideRoom, search, initial, kickUser, addParticipant, changeRoomName, loadMoreMessage, clearNoti, directVideoCall, unTyping, typing, repareAttachFile, removeAttachFile }) => (
  	<div className='row d-flex flex-row' style={{height: '100%', margin: 0, padding: 0}}>
	  	<Initial initial={initial} />
		<div className={roomChat.widthLeft} style={{padding: 0}}>
			<div className="col-md-12" style={{borderBottom: '1px solid lightgrey', padding: 0}}
				onClick={() => {
					if(roomChat.emoji == 'block'){
						makeState('emoji','none');
					}
				}}
			>
				<div className="col-md-12 d-flex flex-row" style={{padding: '9px 0px'}}>
					<div className={roomChat.iconButton} style={{
						alignSelf: 'center',
						textAlign: 'center',
					}}>
						<div style={{
							margin: 'auto',
							maxWidth: 300,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}>
							<div>{roomChat.roomInfo ? roomChat.roomInfo.name : "Room Name"}</div>
							<div style={{color: 'lightgrey', fontSize: 11, fontWeight: 'normal'}}>
								{roomChat.roomInfo && (roomChat.roomInfo.direct == true) ? roomChat.status : ""}
							</div>								
						</div>
					</div>
					<div style={{marginLeft: 30}}>
						<IconButton tooltip="Audio Call" tooltipPosition="bottom-right"
							onClick={() => {

							}}
						>
							<Mic />
						</IconButton>
						<IconButton tooltip="Video Call" tooltipPosition="bottom-right"
							onClick={() => {
								directVideoCall();
							}}
						>
							<VideoCam />
						</IconButton>
						<IconButton tooltip="Participants" tooltipPosition="bottom-right" disabled={roomChat.roomInfo && (roomChat.roomInfo.direct == true) ? true : false}
							onClick={() => {
									makeState('widthLeft','col-md-8');
									makeState('iconButton','col-md-8');
									makeState('participantOn','block');
									makeState('settingOn','none');
							}}
						>
							<PersonAdd />
						</IconButton>	
						<IconButton tooltip="Room Info" tooltipPosition="bottom-right"
							onClick={() => {
									makeState('widthLeft','col-md-8');
									makeState('iconButton','col-md-8');
									makeState('settingOn','block');
									makeState('participantOn','none');
							}}
						>
							<Info />
						</IconButton>	
					</div>
				</div>
			</div>
			{/* message content */}
			<div className="col-md-12 chat-content" id="id-chat-content" style={{padding: 15,height: roomChat.typing && roomChat.typing.length != 0 ? `calc(100% - 172px - ${roomChat.attachHeight ? roomChat.attachHeight :'15px'})` : `calc(100% - 132px - ${roomChat.attachHeight ? roomChat.attachHeight :'15px'})`,overflowY: 'scroll', overflowX: 'hidden'}}
				onClick={() => {
					if(roomChat.emoji == 'block'){
						makeState('emoji','none');
					}
				}}
				onScroll={() => {
					loadMoreMessage()
				}}
			>
				<div className="mess-loaders" style={{display: roomChat.mess_loaders}}></div>
				{roomChat && roomChat.message && roomChat.message.length != 0
					?
					<Message message={roomChat.message} userInfo={roomChat.userInfo} />
					:
					''
				}
			</div>
			{/* typing */}
			<div className="col-md-12 d-flex">
				{roomChat && roomChat.typing && roomChat.typing.length != 0 ?
				roomChat.typing.map((val, i) => {
					return(
						<Chip key={i} style={{margin: 4, fontStyle: 'italic'}}>{val.name + " is typing..."}</Chip>
					)
				})
				:
				''
				}
			</div>
			{/* attach file */}
			<div className="col-md-12 d-flex" style={{overflowX: 'scroll', overflowY: 'hidden'}}>
				{roomChat && roomChat.attachArray && roomChat.attachArray.length != 0 ?
				roomChat.attachArray.map((val, i) => {
					return(
						<Chip 
							onRequestDelete={() => {
								removeAttachFile(i);
							}}
							key={i} 
							style={{margin: 4}}	
							labelStyle={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px'}}	
						>
						{val.type && val.type.indexOf("image") == -1
							?
							<Avatar style={{color: 'black', fontSize: '12px'}}>{val.name.split('.')[1]}</Avatar>
							:
							<img src={val.imagebase64} style={{borderRadius: '50%', marginRight: '10px'}} width="32px" height="32px" />

						}
							{val.type && val.type.indexOf("image") == -1 ? val.name : ''}						
						</Chip>
					)
				})
				:
				''
				}
			</div>
			{/* input chat */}
			<div className="col-md-12">
				<div style={{display: roomChat.emoji}}><EmojiPicker onEmojiClick={(e) => {
					console.log(e);
				}}/></div>
				<div className="input-group" 
					onClick={() => {
						if(roomChat.emoji == 'block'){
							makeState('emoji','none');
						}
					}}
				>
					<div className="input-group-append hidden">
						<span className="input-group-text" 
						style={{
							maxHeight: 58,
							backgroundColor: 'unset',
							borderRight: 'none'
						}} >
							<IconButton tooltip="Emoji Picker" tooltipPosition="top-right"
								onClick={() => {
									if(roomChat.emoji == 'none'){
										makeState('emoji','block');
									}else{
										makeState('emoji','none');
									}
								}}
							>
								<EmojiIcon />
							</IconButton>
						</span>
					</div>
					<div className="hidden" id="p_wrap" style={{whiteSpace: 'pre-line'}}></div>
					<textarea id="textarea" className="form-control" cols="40" rows="5"
						style={{
							maxHeight: 58,
							outline: 'none',
							boxShadow: 'none',
							border: '1px solid #ccc',
							paddingLeft: '15px',
							borderRight: 'none'
						}} 
						value={roomChat.message_text}
						onChange={(e) => {
							makeState('message_text', e.target.value);
							p_wrap.textContent = e.target.value
						}}
						onFocus={() => {
							clearNoti();
							typing();
						}}
						onBlur={() => {
							unTyping();
						}}
						onKeyPress={(e) => {
							if (e.charCode == 13 && !e.nativeEvent.shiftKey) {
								if(roomChat.message_text != '' || roomChat.attachArray.length != 0){
									sendMessage();
									makeState('message_text','');
								}
								e.preventDefault();
							}
							else if(e.charCode == 13 && e.nativeEvent.shiftKey){
								if(roomChat.message_text != ''){
									// p_wrap.textContent += <br/>;
								}else{
									e.preventDefault();
								}
							}
						}}
						></textarea>
					<div className="input-group-append">
						<span className="input-group-text" 
						style={{
							maxHeight: 58,
							backgroundColor: 'unset',
							borderLeft: 'none',
							borderRight: 'none'
						}} >
							<IconButton tooltip="Image" tooltipPosition="top-left"
								onClick={() => {
									document.getElementById('imageChat').click();
								}}
							>
								<AddImage />
								<input type="file" id="imageChat" hidden accept="image/x-png,image/gif,image/jpeg" 
									onChange={(e) => {					
											makeState('attachFile', e.target.files[0]);
											repareAttachFile();		
										}
									} />
							</IconButton>
						</span>
					</div>
					<div className="input-group-append">
						<span className="input-group-text" 
						style={{
							maxHeight: 58,
							backgroundColor: 'unset',
							borderLeft: 'none'
						}} >
							<IconButton tooltip="Attach" tooltipPosition="top-left"
								onClick={() => {
									document.getElementById('attachChat').click();
								}}
							>
								<Attach />
								<input type="file" id="attachChat" hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.html,.js"
									onChange={(e) => {	
											makeState('attachFile', e.target.files[0]);
											repareAttachFile();						
										}
									} />
							</IconButton>
						</span>
					</div>
				</div>
			</div>

		</div>
		
		<div className="col-md-4" style={{padding: 0, margin: 0, display: roomChat.settingOn}}>
			<RoomSetting 
				makeState={makeState}
				roomChat={roomChat}
				hideRoom={hideRoom}
				changeRoomName={changeRoomName}
			/>
		</div>

		<div className="col-md-4" style={{padding: 0, margin: 0, display: roomChat.participantOn}}>
			<Participant 
				makeState={makeState}
				roomChat={roomChat}
				search={search}
				kickUser={kickUser}
				addParticipant={addParticipant}
			/>
		</div>

  	</div>
)

RoomChat.propTypes = {
	roomChat: PropTypes.object.isRequired,
	makeState: PropTypes.func.isRequired,
	sendMessage: PropTypes.func.isRequired,
	hideRoom: PropTypes.func.isRequired,
	search: PropTypes.func.isRequired,
	initial: PropTypes.func.isRequired,
	kickUser: PropTypes.func.isRequired,
	addParticipant: PropTypes.func.isRequired,
	changeRoomName: PropTypes.func.isRequired,
	loadMoreMessage: PropTypes.func.isRequired,
	clearNoti: PropTypes.func.isRequired,
	directVideoCall: PropTypes.func.isRequired,
	typing: PropTypes.func.isRequired,
	unTyping: PropTypes.func.isRequired,
	repareAttachFile: PropTypes.func.isRequired,
	removeAttachFile: PropTypes.func.isRequired
}

export default RoomChat