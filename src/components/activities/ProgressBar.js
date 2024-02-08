import React, { Component } from 'react';


const ProgressBar = (props) => {
  const progressBarStyles = {
    position: 'relative',
    height: '3vh',
    width: '85%',
    marginLeft:'6%',
    borderRadius: '50px',
    border: '1px solid #333',
  };

  return (
      <div style={progressBarStyles}>
        <Filler percentage={props.percentage} />
      </div>
    )
}

const Filler = (props) => {
  const fillerStyle = {
    background: '#00C851',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
    width: `${props.percentage}%`,
  }
  return (
        <div style={fillerStyle}>
          <p>{'\u00A0'}{props.percentage}%</p>
        </div>
      ) 
}

export default ProgressBar