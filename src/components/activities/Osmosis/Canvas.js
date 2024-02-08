import React, { Component } from 'react';
import '../Diffusion/canvas.css'
// CANVAS for OSMOSIS activity

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.lineWidth = 8;

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
    this.drawCell(this.canvas.width*0.5,this.canvas.height*0.52,30,this.props.innerRadius,this.props.outerRadius) // x, y, #spikes, inner radius, outer radius, 73,75
    this.drawMolecules (this.props.waterMolecules);
    this.drawMolecules (this.props.otherMolecules);
    this.drawLabels();
    if (this.props.cellWall=== true) {this.drawCellWall()}
  }

  drawContainer (){
    this.ctx.lineWidth = this.lineWidth*1.2 ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.setLineDash([]) // ensure continous line
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
    this.ctx.fillText('cell', this.canvas.width*0.47, this.canvas.height*0.3);
    this.ctx.fillText('outside', this.canvas.width*0.10, this.canvas.height*0.2);
  }

  drawMolecules (molecules) {
    for (let oneMolecule of molecules) {
      this.ctx.beginPath();
      this.ctx.arc(oneMolecule.x, oneMolecule.y, oneMolecule.radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fillStyle = oneMolecule.color;
      this.ctx.fill();
    } 
  }

  drawCellWall () {
    if (this.props.cellWall=== true) {
      this.ctx.beginPath();
      this.ctx.setLineDash([]) // ensure continous line
      this.ctx.arc(this.canvas.width*0.5,this.canvas.height*0.52, 75+this.lineWidth*2, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.strokeStyle= '#004040';
      this.ctx.stroke();
    }
  }

  drawCell(cx,cy,spikes,r0,r1){
    let rot=Math.PI/2*3,x=cx,y=cy,step=Math.PI/spikes
    this.ctx.beginPath();
    this.ctx.setLineDash([this.props.dashLine, this.props.dashGap]) // sets dash line intervals
    this.ctx.lineWidth = this.lineWidth*2;
    this.ctx.strokeStyle='#fdcbaf';
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
    this.ctx.fillStyle ="#b8ece9";
    this.ctx.fill();
  }

  render() {
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="225px" width="360px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas
