import React, { useRef, useEffect } from 'react';

import * as faceapi from 'face-api.js';
import socket from '../socket';

let count = 0;

/* Seconds of detecting a face to send notification */

const time = 5;

export default function VideoFeed(props) {
  const videoEl = useRef(null);
  faceapi.nets.tinyFaceDetector.loadFromUri('/models');

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    socket.on('user_alert', (msge) => {});
  });

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        const video = videoEl.current;
        video.srcObject = stream;
        video.play();
        video.addEventListener('play', () => {
          setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video,
              new faceapi.TinyFaceDetectorOptions());
            if (detections.length > 0) {
              // eslint-disable-next-line no-plusplus
              count++;
            } else {
              count = 0;
            }
            if (count === time) {
              // ADD SOCKETS
              socket.emit('face-detected', props.location);
            }
          }, 1000);
        });
      });
  }, [videoEl]);

  return (
    <div hidden >
        <video ref={videoEl} />
    </div>);
}
