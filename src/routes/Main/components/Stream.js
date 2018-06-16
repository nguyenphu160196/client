import React from "react";

import IconButton from 'material-ui/IconButton';

import MicOn from 'material-ui/svg-icons/av/mic';
import VideoOn from 'material-ui/svg-icons/av/videocam';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';


class Stream extends React.Component{
	constructor(props) {
        super(props);
        this.state = {camera: true, audio: true, time:"00:00:00"}
      }
	componentDidMount(){
        var seconds = -6, minutes = 0, hours = 0,
        t;                
        setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }                    
            this.setState({time: (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ?  minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) });        
        }, 1000);
    }
	
	render(){
		return(
        //    <div style={{display: 'block'}}> 
           <div style={{display: this.props.main.stream}}> 
            <div className="col-md-12 stream d-flex flex-column justify-content-around align-items-center">                
                <video id="localStream" width="400" ></video>
                <div className="remoteClass d-flex" style={{overflowX: 'scroll', overflowY: 'hidden', maxWidth: 1000, maxHeight: 160}}>
                </div>
                <div className="d-flex align-items-center" style={{backgroundColor: 'grey', borderRadius: 10}}>
                    <IconButton
                        onClick={() => {
                            if(this.state.camera == true){
                                this.setState({camera: false});
                            }else{
                                this.setState({camera: true});
                            }
                        }}
                    >
                        {this.state.camera == true ? <VideoOn /> : <VideoOff />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if(this.state.audio == true){
                                this.setState({audio: false});
                            }else{
                                this.setState({audio: true});
                            }
                        }}
                    >
                        {this.state.audio == true ? <MicOn /> : <MicOff/>}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            this.props.makeState('stream','none');
                        }}
                    >
                        <CallEnd />
                    </IconButton>
                    <div style={{margin: '0px 20px 0px 10px'}}>--{this.state.time}--</div>
                </div>
            </div>
        </div>
		);
	}
}

export default Stream