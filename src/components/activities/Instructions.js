import React from 'react';

const SaturatedUnsaturatedInstructions = (props) => {
  const divStyle = {
    border:'5px solid #007bff', 
    backgroundColor: '#007bff', 
    borderRadius:'5px 50px',
    color: 'white',
    textAlign: "left",
  }
  return (
    <div className='mr-4' style={divStyle}>
      <div className='row ml-4 p-2 justify-content-between'>
        <h3>How to play?</h3>
        <button className="btn btn-secondary mr-4" onClick={()=>props.toggleForm('game')}>OK <span className='fa fa-check'></span> Let's play!</button>
      </div>
      <ol className='mt-2'>
      {props.instructions.map((oneItem, index )=> {     
        return <li key={index}>{oneItem}</li>;
        })}
      </ol>
      {/* <div className='d-flex justify-content-center'>
      </div> */}
    </div>
  )
}

export default SaturatedUnsaturatedInstructions;