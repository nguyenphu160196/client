import React from 'react'
import PropTypes from 'prop-types'
import { imagesURL } from '../../../config'

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';


export const Preferences = ({ preferences, makeState, unLock }) => (
	<div className="row" style={{margin: '0 auto', height: '100%', padding: 0}}>
		<div className="col-12">
			<div className="col-12">
				<Subheader>Hidden Room</Subheader>
				<Divider/>
				<div className="col-12 d-flex flex-row" style={{marginTop: 10}}>{preferences.hide_room && (preferences.hide_room.length != 0)
					?
					preferences.hide_room.map((val, i) => {
						return(
							<Chip style={{margin: 4}}
								key={i}
								onRequestDelete={() => {
									unLock(val._id,"room");
								}}
							>
								<Avatar style={{backgroundColor: val.avatar}}
								>
										{val.name.charAt(0).toUpperCase()}
								</Avatar>  
								{val.name}
							</Chip>
						)
					})
					:
					''
				}</div>
			</div>
			<div className="col-12" style={{marginTop: 20}}>
				<Subheader>Hidden User</Subheader>
				<Divider/>
							<div className="col-12 d-flex flex-row" style={{marginTop: 10}}>{preferences.hide_user && (preferences.hide_user.length != 0)
								?
								preferences.hide_user.map((value, i) => {
									return(
										<Chip
											key={i}
											onRequestDelete={() => {
												unLock(value._id,"user");
											}}
											style={{margin: 4}}
										>
											{value && (value.avatar.charAt(0) == '#')	
												?
												<Avatar style={{backgroundColor: value ? value.avatar : ''}}>
													{value.name.charAt(0).toUpperCase()}
												</Avatar>
												:
												<Avatar src={imagesURL + value.avatar.split('/avatars/')[1]} />
											}
												{value.name}
										</Chip>
									)
								})
								:
								''							
							}</div>
			</div>
		</div>
	</div>
)

Preferences.propTypes = {
	preferences: PropTypes.object.isRequired,
	unLock: PropTypes.func.isRequired
}

export default Preferences