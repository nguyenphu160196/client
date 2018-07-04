import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { socket, peer } from '../../../config'


class CallWaiting extends React.Component{
    constructor(props) {
        super(props);
      }
    componentDidMount() {
               
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => {
                    this.props.closeDialog();
                    let z = document.getElementById('waitCall'); 
                    let videoplay = z.pause();
                    if (videoplay !== undefined) {
                        videoplay.then(_ => {
                    
                        }).catch(error => {
                    
                        });
                    }
                    socket.emit('end-call', '');
                    this.props.makeStateMain('busy', false);
                    this.props.makeState('VDWdialog', false);
                }}
            />
		];
        return (
            <div>
                <Dialog
					actions={actions}
					modal={false}
					open={this.props.roomChat.VDWdialog}
					onRequestClose={this.props.closeDialog}
					contentStyle={{width: '40%'}}
				>
					{this.props.roomChat.roomInfo && this.props.roomChat.roomInfo.direct == false ? <div className="d-flex"><pre> Calling to room </pre><b>{this.props.roomChat.roomInfo && this.props.roomChat.roomInfo.name}</b></div> : <div className="d-flex"><pre> Calling to </pre><b>{this.props.roomChat.roomInfo && this.props.roomChat.roomInfo.name}</b></div>}
				</Dialog>
            </div>
        )
    }
}

export default CallWaiting;

