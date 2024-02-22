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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawCell();
    this.drawNucleus();
    this.drawDNAStrand();
    this.drawLabels();
    this.drawItems();
  }

  drawItems () {
    for (let item of this.props.drawings) {
      switch (item.type) {
        case 'activator':
          this.drawActivator(item.x, item.y);
          break; 
        case 'polymerase':
          this.drawPolymerase(item.x, item.y);
          break;   
        case 'transcription factor':
          this.drawTranscFactor(item.x, item.y);
          break;  
        case 'ribosome':
          this.drawRibosome (item.x, item.y);
          break;  
        case 'rna':
          this.drawRNA (item.toX, item.toY, item.fromX, item.fromY);
          break;  
        case 'aminoacid':
            this.drawAminoacid (item.x, item.y, item.color, item.name)
            break; 
        case 'draggableMonomers':
            this.draggableMonomers (item.x, item.y, item.color, item.name, item.xArray, item.yArray)
            break; 
        case 'RNA nucleotides':
            this.drawRNAnucleotides(item.x, item.y, item.color)
            break;
        case 'intron':
            this.drawIntrons(item.x, item.y, item.length, item.name);
            break;
        case 'draggableRNA':
            this.drawDraggableRNA (item.x, item.y)
            break;
        case 'text':
            this.drawText (item.x, item.y, item.text)
            break;
        default: 
          break; 
      }  
    }
  }

  drawLabels () {
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Enhancer', 204, 365);
    if (this.props.loopDNA) { this.ctx.fillText('Enhancer', 202, 425)};
    this.ctx.fillText('Coding region', 600, 365);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Promoter', 354, 365);
    this.ctx.fillText('Cytoplasm', 15, 70);
    this.ctx.fillText('Nucleus', 25, 220);
    this.ctx.font = '22px sans-serif';
    this.ctx.fillText('Eukaryotic cell', 10, 30);
  }

  drawActivator (x, y) { // 200, 360)
    this.ctx.fillStyle='#e73e2f';
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 80, y);
    this.ctx.arc(x + 65, y + 20, 26, Math.PI * 1.75, Math.PI * 0.25);
    this.ctx.lineTo(x + 80, y+ 40);
    this.ctx.lineTo(x, y+ 40);
    this.ctx.arc(x+15, y + 20, 26, Math.PI * 0.75, Math.PI * 1.25);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.strokeStyle='#8c61df';
    this.ctx.stroke();
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Activator', x + 5, y + 25);
  }

  drawTranscFactor (x, y) {
    this.ctx.fillStyle='#f4ac17';
    this.ctx.strokeStyle='#8c61df';
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x, y);
    // this.ctx.ellipse(x+50, y - 30, 60, 40, 0, Math.PI * 0.75,  Math.PI * 0.25, true); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(x+50, y - 30, 60, 40, 0, Math.PI * 0.75,  Math.PI * 0.5, true); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    // this.ctx.lineTo(x+ 50, y);
    this.ctx.lineTo(x + 50, y+ 35);
    this.ctx.lineTo(x, y + 35);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x + 100, y);
    this.ctx.ellipse(x+50, y - 30, 60, 40, 0, Math.PI * 0.25,  Math.PI * 0.5, false); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.lineTo(x+ 50, y+ 35);
    this.ctx.lineTo(x + 100, y+ 35);
    this.ctx.fillStyle='#cef417';
    // this.ctx.lineTo(x, y + 35);
    this.ctx.closePath();
    this.ctx.fill(); 
    
    this.ctx.stroke();
    this.ctx.font = '15px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Transcription', x+ 5, y + 20);
    this.ctx.fillText('factors', x+30, y + 35);
  }

  drawPolymerase (x, y) {
    this.ctx.fillStyle='#f4175f';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.ellipse(x+50, y + 38, 60, 40, 0, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.strokeStyle='#8c61df';
    this.ctx.stroke();
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('RNA', x+ 30, y + 30);
    this.ctx.fillText('Polymerase', x+ 5, y + 50);
  }

  drawText (x, y, text) {
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x, y);
  }
 
  drawAminoacid (x, y, color, name) {
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle='#8c61df';

    this.ctx.beginPath();
    this.ctx.arc(x, y, 7, 0, Math.PI * 2, true);
    this.ctx.closePath();

    this.ctx.fill();
    this.ctx.stroke();
  }

  draggableMonomers (x, y, color, name, xArray, yArray) {
    this.ctx.strokeStyle='#8c61df';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < color.length; i++) {
      this.ctx.fillStyle = color[i];
      this.ctx.beginPath();
      if (name.includes('aminoacids')) {
        this.ctx.arc(x + xArray[i], y + yArray[i], 7, 0, Math.PI * 2, true);
        this.ctx.stroke();
      } else {
        this.ctx.fillRect(x + xArray[i], y + yArray[i], 12, 12);
      }
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  drawRNAnucleotides(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.fillRect(x, y, 12, 12);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawRibosome (x, y) {
    this.ctx.fillStyle='#c38912';
    this.ctx.strokeStyle='#8c61df';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x-5, y + 70);
    this.ctx.lineTo(x + 105, y + 70);
    this.ctx.arc(x+50, y + 50, 60, Math.PI * 0.1, Math.PI * 0.90, true);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x + 100, y + 90);
    this.ctx.lineTo(x, y + 90);
    this.ctx.arc(x+50, y + 60, 60, Math.PI * 0.81,  Math.PI * 0.19, true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Ribosome', x+ 10, y + 40);
  }

  drawRNA (toX, toY, fromX, fromY, color = '#50ddc4') {
    this.ctx.lineWidth = 15;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.strokeStyle= color;
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.font = '14px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("5'", fromX, fromY + 8);
    this.ctx.fillText("RNA", fromX + 10, fromY + 15);
  }

  drawDraggableRNA (x, y) {
    this.drawText (x-22, y+5, "5'");
    this.drawText (x+310, y+5, "3'");
    this.drawIntrons (x, y, 60, 'G-cap');
    this.drawIntrons (x+60, y, 180, 'mRNA');
    this.drawIntrons (x + 240, y, 60, 'poly-A');
  }

  drawIntrons (x, y, length, name) {
    let color = '#50ddc4';
    this.ctx.lineWidth = 15;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + length, y);
    if(name && name === 'intron') { color = "#3caee5"}
    else if (name && name === 'poly-A') {color = '#f4175f'}
    else if (name && name === 'G-cap')  {color = '#c38912'};
    this.ctx.closePath();
    this.ctx.strokeStyle= color;
    this.ctx.stroke();
    this.ctx.font = '14px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(name, x + 10, y + 4);
  }

  drawDNAStrand () {
    this.ctx.lineWidth = 20;
    this.ctx.lineJoin = 'round';
    // gap after gene
    this.ctx.beginPath();
    this.ctx.moveTo(800, 360);
    this.ctx.lineTo(856, 360);
    this.ctx.strokeStyle="#8c61df";
    this.ctx.stroke();
    // coding region
    this.ctx.beginPath();
    this.ctx.moveTo(800, 360);
    this.ctx.lineTo(500, 360);
    this.ctx.strokeStyle="#3caee5"; // "#3caee5"; "#50ddc4";
    this.ctx.stroke();
    // gap between promoter and coding region
    this.ctx.beginPath();
    this.ctx.moveTo(500, 360);
    this.ctx.lineTo(442, 360);
    this.ctx.strokeStyle="#8c61df";
    this.ctx.stroke();
    // promoter
    this.ctx.beginPath();
    this.ctx.moveTo(442, 360);
    this.ctx.lineTo(342, 360);
    this.ctx.strokeStyle="#17f4ac";
    this.ctx.stroke();
    // gap between CAP and promoter
    this.ctx.beginPath();
    this.ctx.moveTo(342, 360);
    this.ctx.lineTo(284, 360);
    this.ctx.strokeStyle="#8c61df";
    this.ctx.stroke();
    // Enhancer region
    this.ctx.beginPath();
    this.ctx.moveTo(284, 360);
    this.ctx.lineTo(200, 360);
    this.ctx.strokeStyle="#3e2fe7";
    this.ctx.stroke();
    if (this.props.loopDNA) {
      // back loop
      this.ctx.beginPath();
      this.ctx.moveTo(201, 360);
      this.ctx.quadraticCurveTo(130, 355,105, 340); // (cp1x, cp1y, cp2x, cp2y, x, y)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(100, 390, 50, Math.PI* 0.43 , Math.PI * 1.57, false);
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(105, 440);
      this.ctx.quadraticCurveTo(130, 425 ,200,420); // (cp1x, cp1y, cp2x, cp2y, x, y)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      // second CAP site
      this.ctx.beginPath();
      this.ctx.moveTo(200, 420)
      this.ctx.lineTo(280, 420);
      this.ctx.strokeStyle="#3e2fe7";
      this.ctx.stroke();
      // end loop
      this.ctx.beginPath();
      this.ctx.moveTo(280, 420)
      this.ctx.lineTo(300, 420)
      this.ctx.lineTo(320, 470)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(200, 360);
      this.ctx.lineTo(20, 360);
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
    }
  }

  drawCell () {
    this.ctx.lineWidth = 12 ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(6, 50);
    this.ctx.lineTo(6,  500);
    this.ctx.lineTo(870, 500);
    this.ctx.lineTo(870, 50);
    this.ctx.lineTo(6, 50);
    this.ctx.closePath();
    this.ctx.strokeStyle='#ff8080';
    this.ctx.stroke();
    this.ctx.fillStyle ="#FFCCCC";
    this.ctx.fill();
  }

  drawNucleus () {
    this.ctx.lineWidth = 10 ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(20, 200);
    this.ctx.lineTo(20,  500);
    this.ctx.lineTo(856, 500);
    this.ctx.lineTo(856, 200);
    this.ctx.lineTo(20, 200);
    this.ctx.closePath();
    this.ctx.strokeStyle='#ff8080';
    this.ctx.stroke();
    this.ctx.fillStyle = '#cfedfd'; // "#afe1fd";
    this.ctx.fill();
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
    // const canvasStyle = {border:'1px solid blue'} //style={canvasStyle}
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="450px" width="1030px" ref={this.canvasRef} />
    </div>
    )
  }
}
  
  
export default Canvas
  