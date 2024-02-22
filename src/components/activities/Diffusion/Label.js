import React, { Component } from 'react';
import './canvas.css'

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
  }

  componentDidMount () {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');
    this.draw()
  }

  componentDidUpdate(prevProps) {
    if (this.props.moleculeType !== prevProps.moleculeType || this.props.moleculeColor !== prevProps.moleculeColor || this.props.radius !== prevProps.radius) {
      this.draw()
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // draw water molecule
    this.ctx.beginPath();
    this.ctx.arc(15, 30, 3*2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    // water text
    this.ctx.font = '32px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Water molecule', 35, 40);

    // draw other molecule
    this.ctx.beginPath();
    this.ctx.arc(15, 60, this.props.radius*2, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.props.moleculeColor;
    this.ctx.fill();
    // Other molecule text
    this.ctx.font = '32px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${this.props.moleculeType} molecule`, 35, 70);

    // draw star
    this.drawStar(15,95,7,5*2,8*2)
    this.ctx.font = '32px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('ATP used', 35, 105);
  }

  drawStar(cx,cy,spikes,r0,r1){
    let rot=Math.PI/2*3,x=cx,y=cy,step=Math.PI/spikes
  
    this.ctx.strokeSyle="#000";
    this.ctx.beginPath();
    this.ctx.moveTo(cx,cy-r0)
    for(let i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*r0;
      y=cy+Math.sin(rot)*r0;
      this.ctx.lineTo(x,y)
      rot+=step
      
      x=cx+Math.cos(rot)*r1;
      y=cy+Math.sin(rot)*r1;
      this.ctx.lineTo(x,y)
      rot+=step
    }
    this.ctx.lineTo(cx,cy-r0)
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillStyle ='yellow';
    this.ctx.fill();
  }

  render() {
    return (
    <div className='label-container'>
      <canvas id='label-container' height="120px" width="400px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Label