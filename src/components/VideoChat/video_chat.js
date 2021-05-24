import React, { useRef, useEffect, useState} from 'react';
import socket from "../socket";
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
    })

    const peticion = (id_sale_point) =>{
        socket.emit("peticion_asistentes", id_sale_point)
    }

    const soy_asistente = (id_sale_point) => {
        socket.emit("join_sala_asistente", id_sale_point)
    }

    const aceptar_videocall = (id_client_socket, id_sale_point) => {
        socket.emit("accept_videocall", id_client_socket)
    }


    return (
        <div>
            <button value = {"1"} onClick={e => peticion(e.target.value)}>PETICION ASISTENTE</button>
            <button value = {"1"} onClick={e => soy_asistente(e.target.value)}>SOY ASISTENTE</button>
            <br />
            {Peticiones.map((id)=>{
                return(<button key={id} value = {id} onClick={e => aceptar_videocall(e.target.value)}>aceptar</button>)
            })}
        </div>
    )
  }