import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { socket, peer } from '../../../config'


class CallComing extends React.Component{
    constructor(props) {
        super(props);
        this.openStream = this.openStream.bind(this);
        this.playStream = this.playStream.bind(this);
      }
      openStream(){
        return new Promise((resolve, reject) => {
          const config = {audio: false, video: true};
          resolve(navigator.mediaDevices.getUserMedia(config));
        })
      };
      playStream(idVideoTag, stream){
        let video = document.getElementById(idVideoTag); 
        video.srcObject = stream;
        let videoplay = video.play();
        if (videoplay !== undefined) {
          videoplay.then(_ => {
      
          }).catch(error => {
      
          });
        }
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
                }}
			/>,
            <FlatButton
                label="Decline"
                primary={true}
                onClick={() => {
                    this.props.closeDialog();
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
					{this.props.main.caller + " want to make video call to you..."}
				</Dialog>
            </div>
        )
    }
}

export default CallComing;

