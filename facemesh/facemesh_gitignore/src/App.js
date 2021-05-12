import logo from './logo.svg';
import './App.css';
import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  // Setup referencias
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Cargamos Facemesh

  const runFacemesh = async ()=>{
    const net = await facemesh.load({
      inputResolution:{width:640, height: 480}, scale:0.8
    });
    setInterval(()=>{
      detect(net)
    }, 100) 
  };
// Funcion detectar Facemesh
const detect = async (net) =>{
  if(typeof webcamRef.current !== "undefined" && 
  webcamRef.current !== null && 
  webcamRef.current.video.readyState===4){

    // Obtener propiedades video

    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Setear ancho video

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Setar ancho canvas

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Detectar

    const face = await net.estimateFaces(video);
    console.log(face);

    // Obtener ctx canvas para dibujo
    const ctx = canvasRef.current.getContext("2d");
    drawMesh(face, ctx)




  }
};
runFacemesh()

  return (
    <div className="App">
      <Webcam ref={webcamRef} style={
        {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480
        }
      }/>
      <canvas ref={canvasRef}
      style={
        {
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480
        }
      }/>
    </div>
  );
}

export default App;
