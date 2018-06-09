import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {List,ListItem} from 'material-ui/List';

import Name from 'material-ui/svg-icons/action/face'
import Users from 'material-ui/svg-icons/action/perm-identity'
import Clear from 'material-ui/svg-icons/content/clear'


export const CreateRoom = ({ createRoom, makeState, search, act_btn, addInviteList, deleteChip, createNR }) => (
  	<div className='row d-flex justify-content-center' style={{margin: 0, padding: 0}}>

				<div className="col-md-12" style={{borderBottom: '1px solid lightgrey'}}>
					<div className="col-md-12 d-flex flex-row" style={{padding: '14px 16px'}}>
						<div className="col-md-10" style={{
							alignSelf: 'center'
						}}>Create a New Room</div>
						<div className="col-md-2">
							<button className="btn btn-primary" disabled={createRoom.cre_btn}
									onClick={() => {
										createNR();
									}}
							>Create room</button>
						</div>
					</div>
				</div>

				<div className='col-md-5'>
						<div style={{marginTop: 20}}>
							<div>Room Name</div>
							<div className="input-group" >
								<div className="input-group-append">
									<span className="input-group-text" id="basic-addon1" 
									style={{
										backgroundColor: 'unset',
										borderRight: 'none'
									}} >{<Name />}</span>
								</div>
								<input type='text' className="form-control"
									onChange={(e) => {
										makeState('room_name', e.target.value)
										.then(() => {
											act_btn();
										});						
									}}
									placeholder='Please enter room name...' 
									style={{
										outline: 'none',
										boxShadow: 'none',
										border: '1px solid #ccc',
										borderLeft: 'none',
										paddingLeft: '0px',
									}} 
									/>
							</div>
						</div>
						<div style={{marginTop: 20}}>
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
									value={createRoom.invite_input}
									onChange={(e) => {
										if(!(new RegExp("/")).test(e.target.value)){
											makeState('invite_input',e.target.value)
											search(e.target.value)
										}
									}}
									onFocus={(e) => {
										makeState('toogle_list_invite','block');
										search(createRoom.invite_input);
									}}
									onBlur={() => {
										if(createRoom.invite_input == ''){
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
											createRoom.toogle_list_invite != 'none' ? makeState('toogle_list_invite','none') : '';
											createRoom.invite_input != '' ? makeState('invite_input','') : '';
										}}
										>{<Clear />}</span>
									</div>
							</div>
						</div>
						
						<div style={{
								margin: '10 auto', 
								overflowY:'scroll', 
								height:'auto',
								maxHeight: '410px',
								position: 'fixed',
								zIndex: '4',
								backgroundColor: '#fff',
								width: '26.6%',
								margin: '10px 0px 0px 45px',
								boxShadow: '0px 5px 20px #888888',
								display: createRoom.toogle_list_invite
								}}>
							<List>
								{createRoom && (createRoom.invite_list.length>0) ? 
									createRoom.invite_list.map((value, i) => {
									return (
										<ListItem 
											key={i}
											onClick={() => {
												addInviteList(value)
												.then(() => {
													act_btn();
												});
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

						<div className='d-flex flex-wrap' style={{marginTop: 20}}>
							<Chip style={{margin: 4}}>
								{localStorage.user && JSON.parse(localStorage.user).avatar.charAt(0) == '#'
									? 
									<Avatar style={{backgroundColor: localStorage.user ? JSON.parse(localStorage.user).avatar : "unset"}}
									>
											{localStorage.user ? JSON.parse(localStorage.user).name.charAt(0).toUpperCase() : ""}
									</Avatar>  
									: 
									<Avatar src={createRoom ? createRoom.avatar : ''}></Avatar>  }
									{JSON.parse(localStorage.getItem('user')).name}
							</Chip>
							{createRoom && (createRoom.list_participants.length > 0) ? createRoom.list_participants.map((value, i) => {
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
							}	
						</div>
				</div>
  	</div>
)

CreateRoom.propTypes = {
	createRoom: PropTypes.object.isRequired,
	search: PropTypes.func.isRequired,
	makeState: PropTypes.func.isRequired,
	act_btn: PropTypes.func.isRequired,
	addInviteList: PropTypes.func.isRequired,
	deleteChip: PropTypes.func.isRequired,
	createNR: PropTypes.func.isRequired
}

export default CreateRoom