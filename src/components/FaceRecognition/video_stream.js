import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import socket from '../socket'
import {useLocation} from "react-router-dom";
let count = 0;

/* Seconds of detecting a face to send notification */

const time = 5;

export default function VideoFeed(props) {
    const [Location, setLocation] = useState(null);
    const videoEl = useRef(null)
    let data = useLocation()
    faceapi.nets.tinyFaceDetector.loadFromUri('/models')

    useEffect(() => {
      if(data.state){
        setLocation(data.state.location)
        console.log(Location)
      }
    })
    
    useEffect(() => {
      socket.on("user_alert", (msge) => {
        console.log(msge)
      })
    }) 

    useEffect(() => {
      if (!videoEl) {
        return
      }
      navigator.mediaDevices.getUserMedia({video:true})
        .then(stream => {
          let video = videoEl.current
          video.srcObject = stream
          video.play()
          video.addEventListener('play', () => {
            setInterval(async () => {
              const detections = await faceapi.detectAllFaces( video ,
                new faceapi.TinyFaceDetectorOptions())
                //console.log(detections)
                if (detections.length > 0){
                  count++;
                }
                else{
                  count = 0;
                }
                if (count === time){
                  //ADD SOCKETS
                  socket.emit("face-detected", Location)
                  console.log(`Send notification to ${Location}`);
                }
            }, 1000)
          })
        
        })
    }, [videoEl])

    
   
    return (
          <div hidden >
              <video ref={videoEl} />
          </div>)
  }
