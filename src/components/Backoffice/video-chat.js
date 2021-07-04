import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import { useLocation } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import { useCallbackRef } from 'use-callback-ref';
import socket from '../socket';
import useStyles from './styles-video-chat';

export default function VideoChat() {
  const history = useLocation();
  const classes = useStyles();
  const [me, setMe] = useState('');
  const [role, setRole] = useState();
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState();
  const [start, setStart] = useState(true);
  const myVideo = useRef();
  const connectionRef = useRef();
  // eslint-disable-next-line no-var
  var userVideo = useCallbackRef(null, (ref) => ref && ref.focus());

  const soyAsistente = (idSalePoint) => {
    socket.emit('join_sala_asistente', idSalePoint);
    setRole('assistent');
  };

  const soyHome = (idSalePoint) => {
    socket.emit('join_to_videocall_room', idSalePoint);
    setRole('home');
  };

  useEffect(() => {
    if (start) {
      if (!history.state) {
        soyHome(window.location.href.split('/')[4]);
      }
      if (history.state) {
        soyAsistente(window.location.href.split('/')[4]);
      }
      setStart(false);
    }
  }, [start]);

  useEffect(() => {
    if (!history.state) {
      soyHome(window.location.href.split('/')[4]);
    }
    if (history.state) {
      soyAsistente(window.location.href.split('/')[4]);
    }

    // eslint-disable-next-line no-shadow
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });
    socket.emit('me_ida', {});
    socket.emit('me_ida', {});
    socket.on('me', (id) => { setMe(id); });
    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
      setCallAccepted(false);
    });
    socket.on('finished', () => {
      setCallEnded(true);
    });
    socket.on('te_llame', {});
  }, [callEnded, callAccepted]);
  const callUser = () => {
    // eslint-disable-next-line no-var
    var peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    socket.off('callAccepted');
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: window.location.href.split('/')[4],
        signalData: data,
        from: me,
        name,
        sale_point_id: window.location.href.split('/')[4],
      });
      setCallAccepted(false);
    });

    socket.on('callAccepted', (data) => {
      setCallAccepted(true);
      peer.signal(data.signal);
      setCaller(data.from);
      setCallEnded(false);
    });

    // eslint-disable-next-line no-shadow
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    // eslint-disable-next-line no-var
    var peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    setCallEnded(false);
    setCallAccepted(true);
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller, from: me });
    });
    // eslint-disable-next-line no-shadow
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit('ended', { to: caller });
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const callButton = () => {
    if (role === 'assistent') {
      return (
        <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
          <PhoneIcon fontSize="large" />
        </IconButton>
      );
    }
    return (<></>);
  };

  return (
        <div>
          <div >
              <div className={classes.videoContainer}>
                  <div className={classes.videoRight}>
                      {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: 'auto', height: '33vh', borderRadius: '2vh', boxShadow: '0px 0px 5px 1px black' }} />}
                  </div>
                  <div className={classes.videoLeft}>
                      {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay style={{ width: 'auto', height: '33vh', borderRadius: '2vh', boxShadow: '0px 0px 5px 1px black' }} />
                        : null}
                  </div>
              </div>
              <div >
                  <div className={classes.btn}>
                      {callAccepted && !callEnded ? (
                          <Button variant="contained" color="secondary" onClick={leaveCall} >
                              End Call
                          </Button>
                      ) : callButton()}
                      {idToCall}
                  </div>
              </div>
              <div>
                  {receivingCall && !callAccepted ? (
                          <div className={classes.btn}>
                          <Button variant="contained" color="primary" onClick={answerCall}>
                              Answer
                          </Button>
                      </div>
                  ) : null}
              </div>
          </div>
    </div>
  );
}
