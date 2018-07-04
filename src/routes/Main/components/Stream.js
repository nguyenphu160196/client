import React from "react";
import { socket, peer } from '../../../config'

import IconButton from 'material-ui/IconButton';

import MicOn from 'material-ui/svg-icons/av/mic';
import VideoOn from 'material-ui/svg-icons/av/videocam';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';

var myVar, mediaConnection = [];

class Stream extends React.Component{
	constructor(props) {
        super(props);
        this.state = {camera: true, audio: true, time:"00:00:00", members: [], callstack: []}
        this.openStream = this.openStream.bind(this);
        this.playStream = this.playStream.bind(this);
        this.connectPeer = this.connectPeer.bind(this);
        this.stopStreamedVideo = this.stopStreamedVideo.bind(this);
      }
	componentDidMount(){
        peer.on('call', call => {
              $('.remoteClass').append('<video class="remoteStreamX" id="remoteStream'+call.peer+'" width="200" style={{marginRight: 20}} ></video>');          
              this.openStream(false, true).then(stream => {
                this.playStream('localStream', stream);
                mediaConnection.push(call);
                call.answer(stream);
                call.on('stream', remoteStream => {
                    this.playStream('remoteStream'+call.peer, remoteStream);
                })        
              })          
              //video call timer
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
                }, 1000);
            }  
        }) 
        //caller
        socket.on('recieve-accept-call', data => {
            this.props.makeStateRoom('VDWdialog', false);
            let z = document.getElementById('waitCall'); 
            let videoplay = z.pause();
            if (videoplay !== undefined) {
                videoplay.then(_ => {
            
                }).catch(error => {
            
                });
            }

            this.connectPeer(data);
            let members = this.state.members;
            members.push(data);
            this.setState({members: members});
            socket.emit('connect-to-anothers', {caller: JSON.parse(localStorage.user)._id, members: members, callstack: this.state.callstack });
        })
        socket.on('recieve-update-callstack', data => {
            this.setState({callstack: data.callstack});
        })
    }
    connectPeer(id){
        this.props.makeState('stream', 'block');
        this.openStream(false, true).then(stream => {
          this.playStream('localStream', stream);         
              $('.remoteClass').append('<video class="remoteStreamX" id="remoteStream'+id+'" width="200" style={{marginRight: 20}} ></video>');
              let call = peer.call(id, stream);
              call.on('stream', remoteStream => {
                  this.playStream('remoteStream'+id, remoteStream);
              })
          })
          //video call timer
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
            }, 1000);
        }
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
    stopStreamedVideo(id) {
        let videoElem = document.getElementById(id);
        let stream = videoElem.srcObject;
        let tracks = stream.getTracks();
      
        tracks.forEach(function(track) {
          track.stop();
        });
      
        videoElem.srcObject = null;
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
                            socket.emit('clear-call-stack', '');
                            socket.emit('end-call', '');
                            this.stopStreamedVideo('localStream');
                            $(".remoteStreamX").remove();
                            this.setState({camera: true, audio: true, time:"00:00:00", members: [], callstack: []});
                            this.props.makeState('stream','none');
                            this.props.makeState('busy', false);
                            clearInterval(myVar);
                            if(mediaConnection.length != 0){
                                mediaConnection.map((val, i) => {
                                    val.close();
                                })
                            }
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