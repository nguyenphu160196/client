import React from 'react'
import Avatar from 'material-ui/Avatar';

import ReactTooltip from 'react-tooltip'


export default class Message extends React.Component{
	constructor(props) {
		super(props);
		// this.converDate = this.converDate.bind(this);
	  } 
	componentDidMount(){

	}
	converDate(date){
		let newDate = new Date(date);
		let result = String(newDate).split("GMT")[0];
		return result;
	}
	render(){
		const MessageContent = this.props.message && this.props.message.length != 0 ? this.props.message.map((data, i) => {
			if(data.user == JSON.parse(localStorage.user)._id){
				return(
					<div className="MessageContent" key={i} style={{display: 'flex', justifyContent: 'flex-end', fontFamily: 'Helvetica'}} 
					>
						<div className="OwnMessage" data-tip data-for={"OwnMessage" + i}>
							<pre style={{color: '#fff', fontFamily: 'inherit', margin: 0, wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>{data.text}</pre>
						</div>
						<ReactTooltip id={"OwnMessage" + i} place="top" type="dark" effect="float">
							<span>{this.converDate(data.createAt)}</span>
						</ReactTooltip>
					</div>
				)
			}else{
				return(
					<div className="MessageContent" key={i} style={{display: 'flex', fontFamily: 'Helvetica'}}>
						<div className="" style={{marginRight: '10px'}}
						>
							{data.avatar && data.avatar.charAt(0) != "#"
								?
								<Avatar data-tip data-for={'avatarmess'+i} src={data.avatar} style={{backgroundColor: "none"}} />
								:
								<Avatar data-tip data-for={'avatarmess'+i} style={{backgroundColor: data.avatar}}
									>{data.name ? data.name.charAt(0).toUpperCase() : ''}                        
								</Avatar>
							}
							<ReactTooltip id={'avatarmess'+i} place="top" type="dark" effect="float">
								<span>{data.name}</span>
							</ReactTooltip>
						</div>
						<div className="friendMessage" data-tip data-for={'friendMessage'+i}>
							<pre style={{fontFamily: 'inherit', margin: 0, wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>{data.text}</pre>
							<ReactTooltip id={'friendMessage'+i} place="top" type="dark" effect="float">
								<span>{this.converDate(data.createAt)}</span>
							</ReactTooltip>
						</div>
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