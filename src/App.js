// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
import helpIcon from './helpIcon.svg'
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await tf.loadGraphModel('https://tfodfooddetection.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640, 480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)

      // console.log(await obj[5].array())

      const boxes = await obj[1].array()
      const classes = await obj[0].array()
      const scores = await obj[5].array()

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx) });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  useEffect(() => { runCoco() }, []);

  return (
    <div className='container'>
      <div className='title'> <span>Hungry</span> <span>Food</span> <span>Cafe</span> </div>
      <div className="App">
        <div className='videoArea'>
          <div className='textArea'>
            Scan your products here
          </div>
          <Webcam
            ref={webcamRef}
            muted={true}
            className='video'
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,

              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,

              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          {/* <video
          autoPlay
          className='video'
        >
        </video> */}
        </div>
        <div className='resultArea'>
          <div className='row'>
            <button className='addNew'>
              <div className='text'>Add New Dish</div>
            </button>
            <button className='help'>
              <img src={helpIcon} width='20px' alt='help' />
            </button>
          </div>
          <div className='dishes'>
            <div className='dishesTitleBox'>
              Dishes:
            </div>
            <div className='dishesItemsArea'>
              <div className='dishItem'>
                <div className='itemName'>Orange</div>
                <div className='itemPrice'>Rs. 10</div>
              </div>
              <div className='dishItem'>
                <div className='itemName'>Apple</div>
                <div className='itemPrice'>Rs. 15</div>
              </div>
            </div>
          </div>
          <div className='totalPrice'>Total Price : Rs. 25</div>
          <button className='button'>
            <div className='text'>Checkout</div> </button>
        </div>
      </div>
    </div>

  );
}

export default App;
