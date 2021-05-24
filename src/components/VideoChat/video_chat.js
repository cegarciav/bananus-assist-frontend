import React, { useRef, useEffect, useState} from 'react';
import socket from "../socket";

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
        </div>
    )
  }