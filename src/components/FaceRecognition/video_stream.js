import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

let count = 0;

/* Seconds of detecting a face to send notification */

const time = 5;

export default function VideoFeed() {
  const videoEl = useRef(null);

  faceapi.nets.tinyFaceDetector.loadFromUri('/models');

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
            console.log(detections);
            if (detections.length > 0) {
              count++;
            } else {
              count = 0;
            }
            if (count === time) {
              console.log('Send notification');
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
