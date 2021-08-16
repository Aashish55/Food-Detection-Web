// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
import helpIcon from './icons/helpIcon.svg'
import deleteIcon from './icons/delete.svg'
// 2. TODO - Import drawing utility here
import { drawRect, dishes } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [dishesArray, setDishesArray] = useState([])


  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await tf.loadGraphModel('https://tfodfooddetection.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')

    // Loop and detect food
    setInterval(() => {
      detect(net);
      setDishesArray(dishes());
    }, 1000);
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

      // console.log(await obj[7].array())

      const boxes = await obj[7].array()
      const classes = await obj[2].array()
      const scores = await obj[6].array()

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(() => {
        drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)
      });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  const getTotalPrice = allItem => {
    var sum = 0
    allItem.map(item => {
      sum += parseInt(item.price)
    })
    return sum
  }

  const deleteClickHandler = id => {
    console.log('delete with an id: ' + id)
  }

  useEffect(() => { runCoco() }, []);
  // useEffect(() => {
  //   setDishesArray(dishes());
  //   // setTimeout(() => {

  //   // }, 1000)
  // }, [dishesArray])
  // setTimeout(() => {
  //   setDishesArray(dishes());
  // }, 1000)

  console.log(dishesArray)

  const getQuantity = quantity => {
    if (quantity === 1) {
      return ''
    } else {
      return `* ${quantity}`
    }
  }

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
              {
                dishesArray.length > 0 ? dishesArray.map((dish) => (
                  <div className='dishRow' key={dish.name}>
                    <div className='dishItem' >
                      <div className='itemName'>{dish.name} {getQuantity(dish.quantity)}</div>
                      <div className='itemPrice'>Rs. {dish.price} {getQuantity(dish.quantity)}</div>
                    </div>
                    <div className='deleteIcon'>
                      <img src={deleteIcon} alt="" />
                    </div>
                  </div>

                )) :
                  <div className='dishItem'>
                    <div className='itemName'>No Items</div>
                    <div className='itemPrice'></div>
                  </div>
              }
            </div>
          </div>
          <div className='totalPrice'>
            Total Price : Rs. 45
            {/* //{dishesArray.length > 0 ? getTotalPrice(dishesArray) : '0'} */}
          </div>
          <button className='button'>
            <div className='text'>Checkout</div> </button>
        </div>
      </div>
    </div>

  );
}

export default App;