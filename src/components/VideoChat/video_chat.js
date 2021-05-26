
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import { useHistory } from 'react-router-dom';

import React, { useRef, useEffect, useState} from 'react';
import socket from "../socket";
import {useCallbackRef} from 'use-callback-ref'

import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"

import "../../assets/video.css"
import { render } from "@testing-library/react"

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

export default function VideoChat() {

    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef();
	var userVideo = useRef();
	const connectionRef= useRef()

    
    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})
        
        socket.emit("me_ida", {});

        socket.on("me", (id) => {
                setMe(id)
            })
        
		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
            setCallAccepted(false)
            console.log("me estan llamando ctm ")
		})
        socket.on("finished", () => {
            setCallEnded(true)
        })
        
        socket.on("te_llame", (msge) => {
            console.log(msge)
        })
	},[callEnded, callAccepted])


    const callUser = (id) => {
        
        socket.off("callAccepted")
		var peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name,
                sale_point_id: "1"
			})
            setCallAccepted(false)
		})

        
		

		socket.on("callAccepted", (data) => {
			setCallAccepted(true)
			peer.signal(data.signal)
            setCaller(data.from)
            setCallEnded(false)
		})

        peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
        setCallEnded(false)
		setCallAccepted(true)
		var peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller, from: me})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
        socket.emit("ended", {to: caller})
		setCallEnded(true);
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


    

    const peticion = (id_sale_point) =>{
        socket.emit("peticion_asistentes", id_sale_point)
    }

    const soy_asistente = (id_sale_point) => {
        socket.emit("join_sala_asistente", id_sale_point)
    }

    const aceptar_videocall = (args) => {
        const arg_array = args.split(",")
        socket.emit("accept_videocall", arg_array[0], arg_array[1])
        socket.emit("join_to_videocall_room", arg_array[1])
        
    }
    const soy_home = (id_sale_point) => {
        socket.emit("join_to_videocall_room", id_sale_point)
    }
    
    const enviar_video = (id_sale_point) => {
        socket.emit("video_stream_upload", id_sale_point, "enviando datos ...")
    }

    return (
        <div>
            <button value = {"1"} onClick={e => peticion(e.target.value)}>PETICION ASISTENTE</button>
            <button value = {"1"} onClick={e => soy_asistente(e.target.value)}>SOY ASISTENTE</button>
            <button value = {"1"} onClick={e => soy_home(e.target.value)}>SOY HOME</button>
            <button value = {"1"} onClick={e => enviar_video(e.target.value)}>ENVIAR_VIDEO</button>
            <br />
            {Peticiones.map((id)=>{
                return(<button key={id} value = {[id,"1"]} onClick={e => aceptar_videocall(e.target.value)}>aceptar</button>)
            })}
    



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