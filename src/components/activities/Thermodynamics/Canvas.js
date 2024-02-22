import React, { Component } from 'react';
import {optionChoices} from './thermodynamicsVariables';

// import '../Diffusion/canvas.css'
// CANVAS for THERMODYNAMICS activity

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dragok: false,
      startX: null,
      startY: null,
      rects: this.props.options,
    }
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.BB = null;
    this.offsetX = null;
    this.offsetY = null;
    this.WIDTH = null;
    this.HEIGHT = null;
    this.lineWidth = 6;
  }

  componentDidMount () {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
    // this.clientHeight = this.BB.height;
    // this.clientWidth = this.BB.width;
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    // send canvas size to parent component:
    this.props.setCanvasSize(this.canvas.height, this.canvas.width);
    
    // draw all elements 
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
    // what needs to be redrawn 
    this.draw();
    if (this.props.resetPositions !== prevProps.resetPositions && this.props.resetPositions === true) {
      // if (this.props.level < 3) {
        this.setState({rects: [
          {
            x: 160,
            y: 40,
            width: 87,
            height: 30,
            fill: "#6600ff",
            text: 'Reactant',
            name: 'Reactant',
            isDragging: false
          },
          {
            x: 260,
            y: 40,
            width: 77,
            height: 30,
            fill: "#ff0033",
            text: 'Product',
            name: 'Product',
            isDragging: false
          }
        ]}, () => this.draw())
      // } 
    }
  }

  rect(x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawText (x, y, text) {
    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(text, x+10, y+20);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  
  draw() {
    this.clear();
    this.ctx.fillStyle = "#FAF7F8";
    this.rect(0, 0, this.WIDTH, this.HEIGHT);
    // redraw each rect in the rects[] array
    let rectArray = {... this.state.rects}
    for (let i = 0; i<2; i++) {
      const r = rectArray[i]
      // const r = this.state.rects[i];
      this.ctx.fillStyle = r.fill;
      this.rect(r.x, r.y, r.width, r.height);
      this.drawText(r.x, r.y, r.text)
    }
    this.drawAxes();
    this.drawInstructions();
    this.drawEnergy();
    this.drawArrow();
  }
  
  drawAxes(){
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    // main axes
    this.ctx.moveTo(this.canvas.width*0.1, this.canvas.height*0.3);
    this.ctx.lineTo(this.canvas.width*0.1, this.canvas.height*0.9);
    this.ctx.lineTo(this.canvas.width*0.9, this.canvas.height*0.9);
    // ticks
    this.ctx.moveTo(this.canvas.width*0.235, this.canvas.height*0.9);
    this.ctx.lineTo(this.canvas.width*0.235, this.canvas.height*0.88);
    this.ctx.moveTo(this.canvas.width*0.735, this.canvas.height*0.9);
    this.ctx.lineTo(this.canvas.width*0.735, this.canvas.height*0.88);
    this.ctx.strokeStyle= 'black';
    this.ctx.stroke();

    // draw labels:
    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Start", this.canvas.width*0.2, this.canvas.height*0.95);
    this.ctx.fillText("End", this.canvas.width*0.7, this.canvas.height*0.95);
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(`Time ${String.fromCharCode(8594)}`, this.canvas.width*0.4, this.canvas.height*0.965);
    this.ctx.save(); // save orientation
    this.ctx.translate(0, this.canvas.height - 1);// hold top-right hand corner when rotating ( this.canvas.width - 1, 0 );
    this.ctx.rotate(3* Math.PI / 2); // rotate 270 degrees ( 3 * Math.PI / 2 );//  rotate 90 degrees ( Math.PI / 2); 
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = "right";
    this.ctx.fillText(`Energy ${String.fromCharCode(8594)}`, 180, 35);
    this.ctx.restore();
    this.ctx.font = '16px sans-serif';
  }

  drawInstructions () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth*0.6 ;
    this.ctx.rect(150, 30, 200, 50);
    this.ctx.strokeStyle= 'black';
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Drag these:", 210, 20);
  }

  drawEnergy () {
    const rectArray = {... this.state.rects}
    if ((rectArray[0].y >= this.canvas.height*0.3 && rectArray[0].y < this.canvas.height*0.9 && rectArray[0].x) &&
      (rectArray[1].y >= this.canvas.height*0.3 && rectArray[1].y < this.canvas.height*0.9 && rectArray[1].x)) {
        this.ctx.lineWidth = this.lineWidth*0.6 ;
        this.ctx.beginPath();
        this.ctx.moveTo(rectArray[0].x + rectArray[0].width, rectArray[0].y + 0.5*rectArray[0].height);
        this.ctx.lineTo(rectArray[1].x, rectArray[0].y + 0.5*rectArray[0].height);
        this.ctx.moveTo(rectArray[0].x + rectArray[0].width, rectArray[1].y + 0.5*rectArray[1].height);
        this.ctx.lineTo(rectArray[1].x, rectArray[1].y + 0.5*rectArray[1].height);
        
        this.ctx.setLineDash([5,4]);
        this.ctx.strokeStyle= 'black';
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.setLineDash([]); // return to solid line 
        
      } 
    }
    
    drawArrow () {
      const rectArray = {... this.state.rects}
      if ((rectArray[0].y >= this.canvas.height*0.3 && rectArray[0].y < this.canvas.height*0.9 && rectArray[0].x) &&
      (rectArray[1].y >= this.canvas.height*0.3 && rectArray[1].y < this.canvas.height*0.9 && rectArray[1].x)) {
        let text = '';
        let x; 
        this.ctx.lineJoin = 'miter';
        this.ctx.lineWidth = this.lineWidth*0.5 ;
        this.ctx.beginPath();
        let topLine = Math.min(rectArray[0].y + 0.5*rectArray[0].height, rectArray[1].y + 0.5*rectArray[1].height) + this.lineWidth;
        let bottomLine = Math.max(rectArray[0].y + 0.5*rectArray[0].height, rectArray[1].y + 0.5*rectArray[1].height) - this.lineWidth;
        if (rectArray[0].y > rectArray[1].y) { // up arrow
          text = 'energy required';
          topLine += 5;
          x= rectArray[0].x + 5;
          this.ctx.moveTo(this.canvas.width * 0.510, bottomLine);
          this.ctx.lineTo(this.canvas.width * 0.510, topLine);
          this.ctx.lineTo(this.canvas.width * 0.515, topLine); // base right of the arrow
          this.ctx.lineTo(this.canvas.width * 0.5, topLine - 5); // tip of the arrow
          this.ctx.lineTo(this.canvas.width * 0.485, topLine); // left tip of the arrow
          this.ctx.lineTo(this.canvas.width * 0.490, topLine); // base left of the arrow
          this.ctx.lineTo(this.canvas.width * 0.490, bottomLine); // base right of the arrow
          this.ctx.lineTo(this.canvas.width * 0.510, bottomLine);
        }
        if (rectArray[0].y < rectArray[1].y) { // down arrow
          text = 'energy released'
          bottomLine -= 5
          x= rectArray[1].x - 20;
          this.ctx.moveTo(this.canvas.width * 0.510, bottomLine);
          this.ctx.lineTo(this.canvas.width * 0.510, topLine);
          this.ctx.lineTo(this.canvas.width * 0.490, topLine); // base left of the arrow
          this.ctx.lineTo(this.canvas.width * 0.490, bottomLine); // base right of the arrow
          this.ctx.lineTo(this.canvas.width * 0.485, bottomLine); // left tip of the arrow
          this.ctx.lineTo(this.canvas.width * 0.5, bottomLine + 5); // tip of the arrow
          this.ctx.lineTo(this.canvas.width * 0.515, bottomLine); // base right of the arrow
          this.ctx.lineTo(this.canvas.width * 0.510, bottomLine);
        }
        this.ctx.strokeStyle= 'black';
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillStyle ="yellow";
        this.ctx.fill();

        // draw text
        if (this.props.showEnergyLabels) {
          let y= bottomLine - 0.5*(bottomLine-topLine);
          this.ctx.font = '16px sans-serif';
          this.ctx.fillStyle = 'black';
          this.ctx.fillText(text, x, y);
        }
    }
  }

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
    
    // test each rect to see if mouse is inside
    let dragok = false;
    let rectArray = {... this.state.rects}
    // console.log(' the rects ', rectArray)
    for (let i = 0; i<2; i++) {
      let r = rectArray[i]
      // console.log ('correct position? ', (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height))
      // console.log ('The X: ', r.x, mx, r.x + r.width, 'The Y: ', r.y, my, r.y + r.height)
      if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
      }
    }
    // save the current mouse position
    this.setState({
      rects: rectArray,
      dragok:dragok,
      startX: mx,
      startY: my,
    })
    // console.log('my down, drag OK? ', dragok)
  }

  // handle mouseup events
  myUp = (e) => {  
    // console.log('my up ' , e)
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    let rectArray = {... this.state.rects}
    for (let i = 0; i<2; i++) { 
      if (rectArray[i].isDragging === true)  {
        // allow moves only within the graph area
        if (rectArray[i].y >= this.canvas.height*0.3 && rectArray[i].y < this.canvas.height*0.9 && rectArray[i].x < this.canvas.width*0.9) {
          if (rectArray[i].name === 'Product') { rectArray[i].x = 320 }
          if (rectArray[i].name === 'Reactant') { rectArray[i].x = 76 }  
        } else {
          if (rectArray[i].name === 'Product') {
            rectArray[i].x = 260;
            rectArray[i].y = 40;  
          }
          if (rectArray[i].name === 'Reactant') {
            rectArray[i].x = 160;
            rectArray[i].y = 40;   
          } 
        } 
      rectArray[i].isDragging = false;
      }
      rectArray[i].isDragging = false;
    }
    this.setState({
      dragok: false,
      rects: rectArray, 
    })
    this.draw();
    this.props.sendPositions(rectArray)
  }
 
  // handle mouse moves
  myMove = (e) => {
    // if we're dragging anything...
    if (this.state.dragok) {

      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      const mx = parseInt((e.clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
      const my = parseInt((e.clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

      // calculate the distance the mouse has moved
      // since the last mousemove
      const dx = mx - this.state.startX;
      const dy = my - this.state.startY;

      // move each rect that isDragging 
      // by the distance the mouse has moved
      // since the last mousemove
    let rectArray = {... this.state.rects}
    for (let i = 0; i<2; i++) {
        const r = rectArray[i];
        // if dragging and dragged inside the graph area
        if (r.isDragging) {
          r.x += dx;
          r.y += dy;   
        }
      }
      // reset the starting mouse position for the next mousemove
      this.setState({
        startX: mx,
        startY: my,
        rects: rectArray, 
      })

      // redraw the scene with the new rect positions
      this.draw();
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
    
    // console.log('original x' , e.targetTouches[0].clientX , 'transformed x ', mx)
    // console.log('original y' , e.targetTouches[0].clientY , 'transformed y ', my)
    // test each rect to see if mouse is inside
    let dragok = false;
    let rectArray = {... this.state.rects}

    for (let i = 0; i<2; i++) {
      let r = rectArray[i]
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
      }
    }
    // save the current mouse position
    this.setState({
      rects: rectArray,
      dragok:dragok,
      startX: mx,
      startY: my,
    })
  }

  // handle Touch events
  myUpTouch = (e) => {  
    // console.log('my up ' , e)
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    let rectArray = {... this.state.rects}
    for (let i = 0; i<2; i++) {
      if (rectArray[i].isDragging === true)  {
        // allow moves only within the graph area
        if (rectArray[i].y >= this.canvas.height*0.3 && rectArray[i].y < this.canvas.height*0.9 && rectArray[i].x < this.canvas.width*0.9) {
          if (rectArray[i].name === 'Product') { rectArray[i].x = 320 }
          if (rectArray[i].name === 'Reactant') { rectArray[i].x = 76 }  
        } else {
          if (rectArray[i].name === 'Product') {
            rectArray[i].x = 260;
            rectArray[i].y = 40;  
          }
          if (rectArray[i].name === 'Reactant') {
            rectArray[i].x = 160;
            rectArray[i].y = 40;   
          } 
        } 
      rectArray[i].isDragging = false;
      }
      rectArray[i].isDragging = false;
    }
    this.setState({
      dragok: false,
      rects: rectArray, 
    })
    this.props.sendPositions(rectArray)
    this.draw();
  }
 
  // handle mouse moves
  myMoveTouch = (e) => {
    // if we're dragging anything...
    if (this.state.dragok) {

      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      const mx = parseInt((e.targetTouches[0].clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
      const my = parseInt((e.targetTouches[0].clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

      // calculate the distance the mouse has moved
      // since the last mousemove
      const dx = mx - this.state.startX;
      const dy = my - this.state.startY;

      // move each rect that isDragging 
      // by the distance the mouse has moved
      // since the last mousemove
    let rectArray = {... this.state.rects}
    for (let i = 0; i<2; i++) {
          const r = rectArray[i];
          if (r.isDragging) {
            r.x += dx; 
            r.y += dy; 
          }
      }
      // reset the starting mouse position for the next mousemove
      this.setState({
        startX: mx,
        startY: my,
        rects: rectArray, 
      })

      // redraw the scene with the new rect positions
      this.draw();
    }
  }

  render() {
    // const canvasStyle = {border:'1px solid red'} //style={canvasStyle}
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="350px" width="520px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas


