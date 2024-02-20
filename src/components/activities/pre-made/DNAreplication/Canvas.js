import React, { Component } from 'react';


class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
  }

  componentDidMount () {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');
    // this.props.setCanvasSize(this.canvas.height, this.canvas.width); // relays the canvas size to the Animation container
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
    // initial draw
    this.draw();
    // listen for mouse events:
    this.canvas.onmousedown = this.myDown;
    this.canvas.onmouseup = this.myUp;
    this.canvas.onmousemove = this.myMove;
    // listen for touch events in mobile devices:
    this.canvas.addEventListener("touchstart", this.myDownTouch, false);
    this.canvas.addEventListener("touchend", this.myUpTouch, false);
    this.canvas.addEventListener("touchmove", this.myMoveTouch, false);
    // this.canvas.addEventListener("touchcancel", handleCancel, false);
    // listen for window size changes 
    window.addEventListener("resize", this.handleReSize);
  }

  componentDidUpdate(prevProps) {
    // update offset
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;

    // if (this.props.options !== prevProps.options) {
    // }

    // re draw
    this.draw();
  }

  draw() {
    this.drawNucleotides(200,120,1)
    this.drawNucleotides(200,320,2)
  }

  drawShape(x, y, points, radius1, radius2, alpha0) {
    //points: number of points (or number of sides for polygons)
    //radius1: "outer" radius of the star
    //radius2: "inner" radius of the star (if equal to radius1, a polygon is drawn)
    //angle0: initial angle (clockwise), by default, stars and polygons are 'pointing' up
    var i, angle, radius;
    if (radius2 !== radius1) {
        points = 2 * points;
    }
    for (i = 0; i <= points; i++) {
        angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
        radius = i % 2 === 0 ? radius1 : radius2;
        this.ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }
  }

  drawNucleotides(x, y, f) { // f is the sizing factor, larger f smaller shape
    this.ctx.moveTo(x, y)
    this.drawShape(x, y+80/f, 5, 80/f, 80/f, 0);

    // this.ctx.moveTo(x+500, 580); // upside down pentagon
    // this.drawShape(x+500, 500, 5, 80, 80, Math.PI);

    this.ctx.strokeStyle = "#bada55";
    // this.ctx.fillStyle = "#bada55";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.moveTo(x-76/f, y+56/f) // connect sugar to phosphate
    this.ctx.lineTo(x-100/f, y-20/f)
    this.ctx.stroke();

    this.ctx.beginPath(); //draw phosphate
    let x1 = x-110/f; // x coordinate
    let y1 = y-50/f; // y coordinate
    let radius = 30/f; // Arc radius
    let startAngle = 0; // Starting point on circle
    let endAngle = Math.PI*2; // End point on circle
    this.ctx.arc(x1, y1, radius, startAngle, endAngle, true);
    this.ctx.fillStyle = "yellow";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.moveTo(x+77/f, y+56/f) // sugar to base
    this.ctx.lineTo(x+150/f, y+56/f)
    this.ctx.stroke();
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(x+150/f, y+8/f, 200/f, 100/f);

    this.ctx.font = `${48/f}px sans-serif`;
    this.ctx.fillStyle = 'blue';
    this.ctx.fillText('A', x+230/f, y+70/f);
  }



   // **********  handle screen events *******************

   handleReSize = (event) => {
    // reset the offset calculation when window resizes
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
  }

  // handle mousedown events
  myDown= (e) => {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // get the current mouse position
    const mx = parseInt((e.clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
    const my = parseInt((e.clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);
    // send current position to parent container
    this.props.myDown(mx,my);

  }
  
  // handle mouseup events
  myUp = (e) => {  
    // console.log('my up ' , e)
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // tell parent component that move is finished
    this.props.myUp();
  }
   
  // handle mouse moves
  myMove = (e) => {
    // if we're dragging anything...
    if (this.props.dragok) {

      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      const mx = parseInt((e.clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
      const my = parseInt((e.clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

      // send positions to parent component
      this.props.myMove(mx, my);
    }
  }
  
  // handle TOUCH events
  myDownTouch= (e) => {
    // console.log('my down ' , e)
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = parseInt((e.targetTouches[0].clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
    const my = parseInt((e.targetTouches[0].clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

    // send current position to parent container
    this.props.myDown(mx,my);
  }
  
  // handle Touch events
  myUpTouch = (e) => {  
    // console.log('my up ' , e)
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // tell parent component that move is finished
    this.props.myUp();
  }
   
  // handle mouse moves
  myMoveTouch = (e) => {
    // if we're dragging anything...
    if (this.props.dragok) {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();
      // get the current mouse position
      const mx = parseInt((e.targetTouches[0].clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
      const my = parseInt((e.targetTouches[0].clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);
      // send positions to parent component
      this.props.myMove(mx, my);
    }
  }
  
  render() {
    const canvasStyle = {border:'1px solid blue'} //style={canvasStyle}
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="450px" width="1030px" style={canvasStyle} ref={this.canvasRef} />
    </div>
    )
  }
}
  
  
export default Canvas
  