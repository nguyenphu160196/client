import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { socket } from '../../../config'


class CallComing extends React.Component{
    constructor(props) {
        super(props);
      }
    componentDidMount() {
          
    }
    render(){
        const actions = [
			<FlatButton
                label="Accept"
                primary={true}
                onClick={() => {
                    this.props.closeDialog();
                    socket.emit('accept-call', this.props.main.caller);
                    this.props.makeState('VDdialog', false);
                    this.props.makeState('stream','block');
                    let vdz = document.getElementById('funcCall'); 
                    let videoplay = vdz.pause();
                    if (videoplay !== undefined) {
                        videoplay.then(_ => {
                    
                        }).catch(error => {
                    
                        });
                    }
                }}
			/>,
            <FlatButton
                label="Decline"
                primary={true}
                onClick={() => {
                    let vdz = document.getElementById('funcCall'); 
                    let videopause = vdz.pause();
                    if (videopause !== undefined) {
                        videopause.then(_ => {
                    
                        }).catch(error => {
                    
                        });
                    }
                    this.props.closeDialog();
                    socket.emit('decline-call', this.props.main.caller);
                    this.props.makeState('busy', false);
                    this.props.makeState('VDdialog', false);
                }}
            />
		];
        return (
            <div>
                <Dialog
					actions={actions}
					modal={false}
					open={this.props.main.VDdialog}
					onRequestClose={this.props.closeDialog}
					contentStyle={{width: '40%'}}
				>
					{this.props.main.caller.roomName ? <div className="d-flex"><b>{this.props.main.caller.callerName}</b><pre> calling you from room </pre><b>{this.props.main.caller.roomName}</b></div> : <div className="d-flex"><b>{this.props.main.caller.callerName}</b><pre> calling you... </pre></div>}
				</Dialog>
            </div>
        )
    }
}

export default CallComing;

