import React from 'react';


const WonGame = (props) => {
  return (
    <div>
      <div className='row justify-content-center my-2'>
        <h2>{props.message}</h2>
      </div>
      <iframe src="https://giphy.com/embed/mrVP75mtRNnmE" 
      width="480" height="269" frameBorder="0" 
      className="giphy-embed" allowFullScreen>
      </iframe>
    </div>
  )
}
   
export default WonGame
