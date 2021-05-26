import React, { useRef, useEffect, useState} from 'react';
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import useStyles from './styles-video-chat';
import socket from "../socket";
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import "../../assets/video.css"

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

export default function VideoChat(props) {
  const classes = useStyles();
  const [ me, setMe ] = useState('')
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()

    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})

        socket.on("me", (id) => {
                setMe(id)
            })
        
		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

    const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}


    const [Peticiones, SetPeticiones] = useState([])
    const [Sala, SetSala] = useState("1")
    useEffect(() => {
        socket.on("llegada_peticion", (id_client_socket)=> {
            
            SetPeticiones([...Peticiones, id_client_socket])
        })
        socket.on("accept_call", (msge) => {
            console.log(msge)
        })
        socket.on("delete_peticion", (id_client_socket) => {
            console.log(Peticiones)
            Peticiones.remove(id_client_socket)

        })
        socket.on("video_stream_download", (video_stream) => {
            console.log("descargando datos de video: ...")
            console.log(video_stream)
        })
    }, [Peticiones])

    return (
        <div>
                <div >
                  <button className={classes.btn} onClick={props.stopCall}>
                          Volver al panel
                  </button>
              </div>

        <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
    <div className="container">
        <div className="video-container">
            <div className="video">
                {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
            </div>
            <div className="video">
                {callAccepted && !callEnded ?
                <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                null}
            </div>
        </div>
        <div className="myId">
            <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                    Copy ID
                </Button>
            </CopyToClipboard>

            <TextField
                id="filled-basic"
                label="ID to call"
                variant="filled"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
            />
            <div className="call-button">
                {callAccepted && !callEnded ? (
                    <Button variant="contained" color="secondary" onClick={leaveCall}>
                        End Call
                    </Button>
                ) : (
                    <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                        <PhoneIcon fontSize="large" />
                    </IconButton>
                )}
                {idToCall}
            </div>
        </div>
        <div>
            {receivingCall && !callAccepted ? (
                    <div className="caller">
                    <h1 >{name} is calling...</h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            ) : null}
        </div>
    </div>
    </div>
    )
  }