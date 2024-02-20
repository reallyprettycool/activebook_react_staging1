import React, { Component } from 'react';
import './canvas.css'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.lineWidth = 10;

  }

  componentDidMount () {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');
    this.props.setCanvasSize(this.canvas.height, this.canvas.width); // relays the canvas size to the Animation container
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawWaterLevel ();
    this.drawContainer ();
    this.drawMembrane();
    this.drawMolecules (this.props.waterMolecules);
    this.drawMolecules (this.props.otherMolecules);
    this.drawChannelProteins();
    this.drawLabels();
    this.drawATP();
  }

  drawContainer (){
    this.ctx.lineWidth = this.lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0 );
    this.ctx.lineTo(0, this.canvas.height );
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.strokeStyle= 'black';
    this.ctx.stroke();
  }

  drawWaterLevel () {
    this.ctx.lineWidth = this.lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(0, Math.round(this.canvas.height*0.07));
    this.ctx.lineTo(0, this.canvas.height );
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(this.canvas.width, Math.round(this.canvas.height*0.07));
    this.ctx.fillStyle = "#4ed1c8";
    this.ctx.fill();
  }

  drawLabels () {
    this.ctx.font = '12px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('left', this.canvas.width*0.20, 10);
    this.ctx.fillText('right', this.canvas.width*0.70, 10);
  }

  drawMolecules (molecules) {
    // console.log(molecules)
    for (let oneMolecule of molecules) {
      this.ctx.beginPath();
      this.ctx.arc(oneMolecule.x, oneMolecule.y, oneMolecule.radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fillStyle = oneMolecule.color;
      this.ctx.fill();
    } 
  }

  drawMembrane () { //must draw pores after water
    this.ctx.lineWidth = this.props.pores[0].lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.strokeStyle=this.props.pores[0].color 
    for (let onePore of this.props.pores) {
      this.ctx.beginPath(); 
      this.ctx.moveTo(onePore.startX, onePore.startY);
      this.ctx.lineTo(onePore.startX, onePore.endY);
      this.ctx.stroke(); 
      this.ctx.closePath()  
    }
  }

  drawChannelProteins () {
    if (!this.props.barrier && this.props.channelProteins && this.props.channelProteins.length > 0) {
      this.ctx.lineWidth = this.props.channelProteins[0].lineWidth;
      this.ctx.lineJoin = 'round';
      this.ctx.beginPath();
      this.ctx.strokeStyle=this.props.channelProteins[0].color; 
      for (let oneChannel of this.props.channelProteins) {
        this.ctx.beginPath(); 
        this.ctx.moveTo(oneChannel.startX, oneChannel.y);
        this.ctx.lineTo(oneChannel.endX, oneChannel.y);
        this.ctx.stroke(); 
        this.ctx.closePath() 
      }
    }
  }

  drawATP () {
    if (!this.props.barrier && this.props.channelProteins && this.props.channelProteins.length > 0) {
      // const ATP = new Image();
      // ATP.src = '/images/ATP.png'
      for (let oneATP of this.props.ATP) {
        this.drawStar(oneATP.x,oneATP.y,7,5,8) //takes the x,y coordinates, the number of spikes, the inner and the outer radius of the spikes
        // this.ctx.beginPath();
        // this.ctx.arc(oneATP.x, oneATP.y, 5, 0, Math.PI * 2, true);
        // this.ctx.closePath();
        // this.ctx.fillStyle ='yellow';
        // this.ctx.fill();

        // this.ctx.drawImage(ATP, oneATP.x, oneATP.y, 20, 15);
        // console.log('one ATP drawn')
      
      }
    }
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
    <div className='canvas-container'>
      <canvas id='water-container' height="225px" width="400px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas
