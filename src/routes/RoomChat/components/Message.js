import React from 'react'
import Avatar from 'material-ui/Avatar';


export default class Message extends React.Component{
	constructor(props) {
        super(props);
	  } 
	render(){
		const MessageContent = this.props.message && this.props.message.length != 0 ? this.props.message.map((data, i) => {
			if(data.user == JSON.parse(localStorage.user)._id){
				return(
					<div className="MessageContent" key={i} style={{display: 'flex', justifyContent: 'flex-end', fontFamily: 'Helvetica'}} >
						<div className="OwnMessage">{data.text}</div>
					</div>
				)
			}else{
				return(
					<div className="MessageContent" key={i} style={{display: 'flex', fontFamily: 'Helvetica'}}>
						<div style={{marginRight: '10px'}}>
							{data.avatar && data.avatar.charAt(0) != "#"
								?
								<Avatar src={data.avatar} style={{backgroundColor: "none"}} />
								:
								<Avatar style={{backgroundColor: data.avatar}}
									>{data.name ? data.name.charAt(0).toUpperCase() : ''}                        
								</Avatar>
							}
						</div>
						<div className="friendMessage">{data.text}</div>
					</div>
				)
			}
		}) : '';
		return(
            <div>                
                {MessageContent}
            </div>
        );
	}
}