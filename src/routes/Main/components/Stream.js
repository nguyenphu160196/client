import React from "react";
import { socket, api, webrtc } from '../../../config'
import { imagesURL } from '../../../config'

import IconButton from 'material-ui/IconButton';

import MicOn from 'material-ui/svg-icons/av/mic';
import VideoOn from 'material-ui/svg-icons/av/videocam';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';
import FullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';


var myVar;


class Stream extends React.Component{
	constructor(props) {
        super(props);
        this.state = {camera: true, audio: true, time:"00:00:00", room: '', answered: []};
      }
	componentDidMount(){
        webrtc.on('videoRemoved', function (video, peer) {
            console.log('video removed ', peer);
            var remotes = document.getElementById('remoteStream');
            var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
            if (remotes && el) {
                remotes.removeChild(el);
            }
        });
        webrtc.on('videoAdded', function (video, peer) {
                var remotes = document.getElementById('remoteStream');
                if (remotes) {
                    var container = document.createElement('div');
                    container.className = 'videoContainer';
                    container.id = 'container_' + webrtc.getDomId(peer);
                    container.appendChild(video);

                    // suppress contextmenu
                    video.oncontextmenu = function () { return false; };

                    remotes.appendChild(container);
                }
            });
        //caller
        socket.on('recieve-accept-call', data => {
            this.props.makeState('stream', 'block');
            this.props.makeStateRoom('VDWdialog', false);
            this.props.myStopFunction();
            let z = document.getElementById('waitCall'); 
            let videoplay = z.pause();
            if (videoplay !== undefined) {
                videoplay.then(_ => {
            
                }).catch(error => {
            
                });
            }
            if(this.state.room == ''){
                webrtc.startLocalVideo();
                webrtc.createRoom(data.room);
                this.setState({room: data.room});
            }
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(data.room);                    
            });
            if(this.state.time == "00:00:00"){
                let seconds = 0, minutes = 0, hours = 0,
                t;                
                myVar = setInterval(() => {
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
                    this.props.makeState("VDTimer",(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ?  minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));       
                }, 1000);
            } 
            let answered = this.state.answered;
            if(answered.length == 0){
                socket.emit('answer-call', data);
                answered.push(data.from);
                this.setState({answered: answered}) 
            }else{
                if(answered.indexOf(data.from) > -1){
                    //do nothing
                }else{
                    socket.emit('answer-call', data);
                    answered.push(data.from);
                    this.setState({answered: answered})  
                }
            }
        })
        // reciever
        socket.on('recieve-answer-call', data => {
            webrtc.startLocalVideo();
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(data.room);
            });
            if(this.state.time == "00:00:00"){
                let seconds = 0, minutes = 0, hours = 0,
                t;                
                myVar = setInterval(() => {
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
                    this.props.makeState("VDTimer",(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ?  minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));       
                }, 1000);
            }  
        })
    }
    
	
	render(){
		return(
        //    <div style={{display: 'block'}}> 
           <div style={{display: this.props.main.stream}}> 
            <div className="col-12 stream d-flex flex-column justify-content-around align-items-center">                
                <div id="localStreamMother"><video className="" id="localStream" width="300"></video></div>
                <div className="d-flex" id="remoteStream" style={{overflowX: 'scroll', overflowY: 'hidden', maxWidth: 1000, maxHeight: 200}}>
                </div>
                <div className="d-flex align-items-center" style={{backgroundColor: 'grey', borderRadius: 10}}>
                    <IconButton
                        disabled={this.props.main.caller && this.props.main.caller.audioCall && this.props.main.caller.audioCall == true ? true : false}
                        onClick={() => {
                            if(this.state.camera == true){
                                this.setState({camera: false});
                                webrtc.pauseVideo();
                            }else{
                                this.setState({camera: true});
                                webrtc.resumeVideo();           
                            }
                        }}
                    >
                        {this.state.camera == true ? <VideoOn /> : <VideoOff />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if(this.state.audio == true){
                                this.setState({audio: false});
                                webrtc.mute();
                            }else{
                                this.setState({audio: true});
                                webrtc.unmute();
                            }
                        }}
                    >
                        {this.state.audio == true ? <MicOn /> : <MicOff/>}
                    </IconButton>
                    <IconButton id="stopVideoCall"
                        onClick={() => {
                            socket.emit('clear-call-stack', '');

                            this.setState({camera: true, audio: true, time:"00:00:00"});
                            this.props.makeState('stream','none');
                            this.props.makeState('busy', false);
                            this.props.makeState('caller', '');
                            clearInterval(myVar);
                            webrtc.leaveRoom();
                            webrtc.stopLocalVideo();
                        }}
                    >
                        <CallEnd color="red" />
                    </IconButton>
                    <div id="VDTimerId" style={{margin: '0px 10px'}}>--{this.state.time}--</div>
                    <IconButton
                        onClick={() => {
                            this.props.makeState('stream','none');
                            this.props.makeState('fullscreen', true);
                        }}
                    >
                        <FullscreenExit />
                    </IconButton>
                </div>
            </div>
        </div>
		);
	}
}

export default Stream