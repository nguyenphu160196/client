import React from "react";
import { socket, api } from '../../../config'
import { imagesURL } from '../../../config'

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import MicOn from 'material-ui/svg-icons/av/mic';
import VideoOn from 'material-ui/svg-icons/av/videocam';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';
import FullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';


import SimpleWebRTC from 'simplewebrtc';
var webrtc = new SimpleWebRTC({
                    // url: "http://localhost:8888",
                    url: "http://35.240.211.84:8888",
                    localVideoEl: 'localStream',
                    remoteVideosEl: ''
                });


var myVar, chip;


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
            // if(webrtc.getPeers().length == 0){
            //     $('#stopVideoCall').click();
            // }
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
            if(data.audioCall){
                webrtc.config.media.video = false;
                localStorage.setItem('audioCall', data.room);
            }
            if(this.state.room == ''){
                webrtc.startLocalVideo();
                webrtc.createRoom(data.webrtc);
                this.setState({room: data.webrtc});
            }
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(data.webrtc);                    
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
                this.setState({answered: answered});
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
            if(data.audioCall){
                localStorage.setItem('audioCall', data.room);
                webrtc.config.media.video = false;
                if(data.avatar.charAt(0) == '#'){
                  $('#localStreamAudio').append(
                      '<div id="'+data.caller+'" tabindex="0" style="border: 10px; box-sizing: border-box; display: flex; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: default; text-decoration: none; margin: 4px; padding: 0px; outline: none; font-size: inherit; font-weight: inherit; position: relative; background-color: rgb(224, 224, 224); border-radius: 100px; white-space: nowrap; width: 200px; height: 50px;"><div size="32" class="resize-img" style="color: rgb(255, 255, 255); background-color: '+data.avatar+'; user-select: none; display: inline-flex; align-items: center; justify-content: center; font-size: 25px; border-radius: 50%; height: 32px; width: 32px; margin-right: -4px;">'+data.callerName.charAt(0).toUpperCase()+'</div><span style="color: rgba(0, 0, 0, 0.87); font-size: 14px; font-weight: 400; line-height: 32px; padding-left: 12px; padding-right: 12px; user-select: none; white-space: nowrap;"><div style="font-size: 20px; margin: 10px;">'+data.callerName+'</div></span></div>'
                  );
              }else{
                  $('#localStreamAudio').append(
                      '<div id="'+data.caller+'" tabindex="0" style="border: 10px; box-sizing: border-box; display: flex; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: default; text-decoration: none; margin: 4px; padding: 0px; outline: none; font-size: inherit; font-weight: inherit; position: relative; background-color: rgb(224, 224, 224); border-radius: 100px; white-space: nowrap; width: 200px; height: 50px;"><img size="32" src="'+imagesURL+data.avatar.split('/avatars/')[1]+'" class="resize-img" style="color: rgb(255, 255, 255); background-color: rgb(188, 188, 188); user-select: none; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; border-radius: 50%; height: 32px; width: 32px; margin-right: -4px;"><span style="color: rgba(0, 0, 0, 0.87); font-size: 14px; font-weight: 400; line-height: 32px; padding-left: 12px; padding-right: 12px; user-select: none; white-space: nowrap;"><div style="font-size: 20px; margin: 10px;">'+data.callerName+'</div></span></div>'
                  );
              }
            }
            webrtc.startLocalVideo();
            webrtc.on('readyToCall', function () {
                webrtc.joinRoom(data.webrtc);
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
           <div style={{display: this.props.main.stream}}> 
            <div className="col-12 stream d-flex flex-column justify-content-around align-items-center">              
                <div id="localStreamMother">
                    <div id="localStreamAudio" className={this.props.main.caller && this.props.main.caller.audioCall == true ? "d-flex flex-wrap" : "hidden"}
                        style={{
                            maxWidth: '700px',
                            maxHeight: '200px',
                            overflowX: 'hidden',
                            overflowY: 'scroll'
                        }}>
                        <Chip 
                            style={{
                                margin: 4,
                                height: '50px',
                                width: '200px',
                                borderRadius: '100px'
                            }}>
                            {localStorage.user && JSON.parse(localStorage.user).avatar.charAt(0) == '#'
                                ? 
                                <Avatar
                                    className="resize-img"
                                    style={{
                                        backgroundColor: localStorage.user ? JSON.parse(localStorage.user).avatar : "unset",
                                        fontSize: '25px',
                                        alignItems: 'center'
                                }}>
                                        {localStorage.user ? JSON.parse(localStorage.user).name.charAt(0).toUpperCase() : ""}
                                </Avatar>  
                                : 
                                <Avatar
                                    className="resize-img"
                                    src={imagesURL + JSON.parse(localStorage.user).avatar.split('/avatars/')[1]}></Avatar>  }
                                <div style={{fontSize: '20px', margin: '10px'}}>{JSON.parse(localStorage.getItem('user')).name}</div>
                        </Chip>
                    </div>
                    <video className={this.props.main.caller && this.props.main.caller.audioCall == true ? 'hidden' : ''} id="localStream" width="300">
                    </video>
                </div>
                <div className={this.props.main.caller && this.props.main.caller.audioCall == true ? "hidden" : "d-flex"} id="remoteStream" 
                    style={{
                        overflowX: 'scroll', 
                        overflowY: 'hidden', 
                        maxWidth: 1000, 
                        maxHeight: 200
                    }}>
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
                            if(this.props.main.caller.audioCall){
                                socket.emit('end-audio-call', this.props.main.caller.room);
                            }
                            webrtc.leaveRoom();
                            webrtc.stopLocalVideo();
                            location.reload();
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