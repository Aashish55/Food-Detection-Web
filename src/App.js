import React, { useEffect } from 'react'
import './App.css';
import helpIcon from './helpIcon.svg'

const App = () => {

  useEffect(() => {
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName('video')[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  }, [])

  return (
    <div className="App">
      <div className='videoArea'>
        <div className='textArea'>
          Scan your products here...
        </div>
        <video
          autoPlay
          className='video'
        >
        </video>
      </div>
      <div className='resultArea'>
        <div className='row'>
          <button className='button'>
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
            <div className='totalPrice'>Total Price : Rs. 25</div>

          </div>
        </div>
        <button className='button'>
          <div className='text'>Checkout</div> </button>
      </div>
    </div>
  );
}

export default App;
