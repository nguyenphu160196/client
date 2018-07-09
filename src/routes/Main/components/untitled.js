import React from "react";
import { socket, peer, api } from '../../../config'
import { imagesURL } from '../../../config'

import IconButton from 'material-ui/IconButton';

import MicOn from 'material-ui/svg-icons/av/mic';
import VideoOn from 'material-ui/svg-icons/av/videocam';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';
import FullscreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit';


var myVar, mediaConnection = [];

class Stream extends React.Component{
	constructor(props) {
        super(props);
        this.state = {camera: true, audio: true, time:"00:00:00", members: [], callstack: []};
        this.connectPeer = this.connectPeer.bind(this);
        this.openStream = this.openStream.bind(this);
        this.playStream = this.playStream.bind(this);
        this.stopStreamedVideo = this.stopStreamedVideo.bind(this);
      }
	componentDidMount(){
        peer.on('call', call => {
            $('.remoteClass').append('<div style="margin-right: 20px" class="" id="'+call.peer+'"><video class="remoteStreamX" id="remoteStream'+call.peer+'" width="200" autoplay="autoplay"></video></div>');
            // let constraints = { audio: true, video: false }; 
            // let constraints = { audio: true, video: true }; 
            // navigator.mediaDevices.getUserMedia(constraints)
            // .then(function(stream) {
                // let localVideo = document.querySelector('#localStream'); 
                // try {
                //   localVideo.srcObject = stream;
                //   localVideo.muted = true;
                // } catch (error) {
                //   localVideo.src = URL.createObjectURL(stream);
                // }
                // localVideo.onloadedmetadata = function(e) {
                //   localVideo.play();
                // }; 
                this.playStream('#localStream');
                mediaConnection.push(call);
                call.answer(stream);
                call.on('stream', remoteStream => {
                    // let remoteVideo = document.querySelector('#remoteStream'+call.peer); 
                    // try {
                    //   remoteVideo.srcObject = remoteStream;
                    // } catch (error) {
                    //   remoteVideo.src = URL.createObjectURL(remoteStream);
                    // }
                    // remoteVideo.onloadedmetadata = function(e) {
                    //     remoteVideo.play();
                    //   };
                })  
            // })
            // .catch(function(err) {
            //     console.log(err);
            // });  

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
                    this.props.makeState("VDTimer",(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ?  minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));       
                }, 1000);
            }  
        }) 
        //caller
        socket.on('recieve-accept-call', data => {
            this.props.makeStateRoom('VDWdialog', false);
            this.props.myStopFunction();
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
        let caller = this.props.main.caller && this.props.main.caller.audioCall ? this.props.main.caller.audioCall : '';
        if(caller == true){
          let constraints = { audio: true, video: false }; 
          navigator.mediaDevices.getUserMedia(constraints)
          .then(function(stream) {
            $('#localStream').addClass('hidden');
            if(JSON.parse(localStorage.user).avatar.charAt(0) == "#"){
              $('#localStreamMother').append('<div class="remoteStreamX" style="height: 300px; width: 300px; text-align: center; color: white; font-size: 90px; background-color:'+ JSON.parse(localStorage.user).avatar +'">'+JSON.parse(localStorage.user).name.charAt(0).toUpperCase()+'</div>');
            }else{
              $('#localStreamMother').append('<img class="remoteStreamX" width="300" height="300" src="'+imagesURL+JSON.parse(localStorage.user).avatar.split('/avatars/')[1]+'" />');
            }
            let localVideo = document.querySelector('#localStream'); 
            localVideo.srcObject = stream;
            localVideo.onloadedmetadata = function(e) {
              localVideo.play();
            };
            api({
              method: 'get',
              url: '/info.user/'+id,
              headers: {'x-access-token': localStorage.getItem('authToken')}
            }) 
            .then(res => {
                if(res.data.user.avatar.charAt(0) != "#"){
                  $('.remoteClass').append('<div style="margin-right: 20px" class="" id="'+id+'"><video class="remoteStreamX hidden" id="remoteStream'+id+'" width="200"></video><img class="remoteStreamX" width="200" height="200" src="'+imagesURL+res.data.user.avatar.split('/avatars/')[1]+'" /></div>');
                }else{
                  $('.remoteClass').append('<div style="margin-right: 20px" class="" id="'+id+'"><video class="remoteStreamX hidden" id="remoteStream'+id+'" width="200"></video><div class="remoteStreamX" style="height: 300px; width: 300px; text-align: center; color: white; font-size: 90px; background-color:'+ res.data.user.avatar +'">'+res.data.user.name.charAt(0).toUpperCase()+'</div></div>');
                }
            })  
            .catch(err => {

            })      
            let call = peer.call(id, stream);
            call.on('stream', remoteStream => {
                // playStream('#remoteStream'+id, remoteStream);
                let remoteVideo = document.querySelector('#remoteStream'+id); 
                remoteVideo.srcObject = remoteStream;
                remoteVideo.onloadedmetadata = function(e) {
                  remoteVideo.play();
                };
            })
          })
          .catch(function(err) {
            console.log(err);
          });
        }else{
          // let constraints = { audio: true, video: true }; 
          // navigator.mediaDevices.getUserMedia(constraints)
          // .then(function(stream) {
            // let localVideo = document.querySelector('#localStream'); 
            // try {
            //     localVideo.srcObject = stream;
            //     localVideo.muted = true;
            // } catch (error) {
            //     localVideo.src = URL.createObjectURL(stream);
            // }
            // localVideo.onloadedmetadata = function(e) {
            //   localVideo.play();
            // }; 
            this.playStream('#localStream');       
            $('.remoteClass').append('<div style="margin-right: 20px" class="" id="'+id+'"><video class="remoteStreamX" id="remoteStream'+id+'" width="200" autoplay="autoplay"></video></div>');
            let call = peer.call(id, stream);
            call.on('stream', remoteStream => {
                let remoteVideo = document.querySelector('#remoteStream'+id); 
                try {
                  remoteVideo.srcObject = remoteStream;
                } catch (error) {
                  remoteVideo.src = URL.createObjectURL(remoteStream);
                }
                remoteVideo.onloadedmetadata = function(e) {
                    remoteVideo.play();
                  };
            })
          // })
          // .catch(function(err) {
          //   console.log(err);
          // });
        }

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
                this.props.makeState("VDTimer",(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ?  minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));      
            }, 1000);
        }
    }
    openStream(){
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {

            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            return new Promise(function(resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          }
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
          
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
    playStream(id, stream){
        var video = document.querySelector(id);
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
            video.play();
        }; 
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
            <div className="col-12 stream d-flex flex-column justify-content-around align-items-center">                
                <div id="localStreamMother"><video className="" id="localStream" width="300"></video></div>
                <div className="remoteClass d-flex" style={{overflowX: 'scroll', overflowY: 'hidden', maxWidth: 1000, maxHeight: 200}}>
                </div>
                <div className="d-flex align-items-center" style={{backgroundColor: 'grey', borderRadius: 10}}>
                    <IconButton
                        disabled={this.props.main.caller && this.props.main.caller.audioCall && this.props.main.caller.audioCall == true ? true : false}
                        onClick={() => {
                            if(this.state.camera == true){
                                this.setState({camera: false});
                                socket.emit("offwebcam", {room: this.props.main.caller.room ? this.props.main.caller.room : location.pathname.split('c/')[1], name: JSON.parse(localStorage.user).name, path: JSON.parse(localStorage.user).avatar});
                            }else{
                                this.setState({camera: true});
                                socket.emit("onwebcam", {room: this.props.main.caller.room ? this.props.main.caller.room : location.pathname.split('c/')[1], name: JSON.parse(localStorage.user).name});
                            }
                        }}
                    >
                        {this.state.camera == true ? <VideoOn /> : <VideoOff />}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            if(this.state.audio == true){
                                this.setState({audio: false});
                                $("video").prop('muted', true); 
                            }else{
                                this.setState({audio: true});
                                $("video").prop('muted', false);
                            }
                        }}
                    >
                        {this.state.audio == true ? <MicOn /> : <MicOff/>}
                    </IconButton>
                    <IconButton id="stopVideoCall"
                        onClick={() => {
                            socket.emit('clear-call-stack', '');
                            socket.emit('end-call', '');
                            this.stopStreamedVideo('localStream');
                            $(".remoteStreamX").remove();
                            this.setState({camera: true, audio: true, time:"00:00:00", members: [], callstack: []});
                            this.props.makeState('stream','none');
                            this.props.makeState('busy', false);
                            this.props.makeState('caller', '');
                            clearInterval(myVar);
                            if(mediaConnection.length != 0){
                                mediaConnection.map((val, i) => {
                                    val.close();
                                })
                            }
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