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
          this.drawPolymerase(item.x, item.y, item.isDragging);
          break;   
        case 'repressor':
          this.drawRepressor(item.x, item.y);
          break;  
        case 'ribosome':
          this.drawRibosome (item.x, item.y, item.rotation);
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
    this.ctx.fillText('Enhancer', 202, 355);
    if (this.props.loopDNA) { this.ctx.fillText('Enhancer', 202, 415)};
    this.ctx.fillText('Operator', 410, 355);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Promoter', 310, 355);
    this.ctx.fillText('Gene 1', 520, 355);
    this.ctx.fillText('Gene 2', 620, 355);
    this.ctx.fillText('Gene 3', 720, 355);
    this.ctx.fillText('Cytoplasm', 15, 70);
    this.ctx.font = '22px sans-serif';
    this.ctx.fillText('Prokaryotic cell', 10, 30);
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

  drawRepressor (x, y) {
    this.ctx.fillStyle='#f4ac17';
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 80, y);
    this.ctx.arc(x + 90, y + 30, 30, Math.PI * 1.25, Math.PI * 0.75, true);
    this.ctx.lineTo(x+ 80, y+ 60);
    this.ctx.lineTo(x, y+ 60);
    this.ctx.arc(x - 10, y + 30, 30, Math.PI * 0.25, Math.PI * 1.75, true);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.strokeStyle='#8c61df';
    this.ctx.stroke();
    this.ctx.font = '16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Repressor', x, y - 4);
  }

  drawPolymerase (x, y, isDragging) {
    this.ctx.fillStyle='#f4175f';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y + 70);
    this.ctx.lineTo(x + 100, y + 70);
    this.ctx.arc(x+50, y + 38, 60, Math.PI * 0.18, Math.PI * 0.82, true);
    this.ctx.closePath();
    this.ctx.fill(); 
    this.ctx.strokeStyle='#8c61df';
    this.ctx.stroke();
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('RNA', x+ 30, y + 20);
    this.ctx.fillText('Polymerase', x+ 5, y + 40);
    if (x < 301 || isDragging || x > 900) {
      this.ctx.beginPath();
      // this.ctx.moveTo(x, y + 70);
      // this.ctx.lineTo(x + 100, y + 70);
      this.ctx.rect(x, y+50, 100, 20);
      this.ctx.closePath();
      this.ctx.fillStyle='#17f4ac';
      this.ctx.fill(); 
      this.ctx.font = '16px sans-serif';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(`${String.fromCharCode(963)} subunit`, x+ 15, y + 65);
    }
  }

  drawText (x, y, text) {
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x, y);
  }
 
  drawAminoacid (x, y, color, name) {
    if (name && name.includes('monomer')) {
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle='#8c61df';
  
      this.ctx.beginPath();
      this.ctx.arc(x, y, 7, 0, Math.PI * 2, true);
      this.ctx.closePath();
  
      this.ctx.fill();
      this.ctx.stroke();
    } else {
      const newX = x - 855; // at the top: - 850; reducing this abs number moves it down, all the way at the bottom: - 555;
      const newY = y + 241;
      this.ctx.save();
      this.ctx.translate( this.canvas.width - 1, 0 );
      this.ctx.rotate( 0.205 * Math.PI ); //  1.25 0.75 *
  
      this.ctx.lineWidth = 1;
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle='#8c61df';
  
      this.ctx.beginPath();
      this.ctx.arc(newX, newY, 7, 0, Math.PI * 2, true);
      this.ctx.closePath();
  
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
    }
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

  drawRibosome (x, y, rotation) {
    if (rotation) {
      const newX = x - 855; // at the top: - 850; reducing this abs number moves it down, all the way at the bottom: - 555;
      const newY = y + 241; // + 241; don't change this number
      this.ctx.save();
      this.ctx.translate( this.canvas.width - 1, 0 );
      this.ctx.rotate( 0.205 * Math.PI ); //  1.25 0.75 *

      this.ctx.fillStyle='#c38912';
      this.ctx.strokeStyle='#8c61df';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(newX-5, newY + 70);
      this.ctx.lineTo(newX + 105, newY + 70);
      this.ctx.arc(newX+50, newY + 50, 60, Math.PI * 0.1, Math.PI * 0.90, true);
      this.ctx.closePath();
      this.ctx.fill(); 
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(newX + 100, newY + 90);
      this.ctx.lineTo(newX, newY + 90);
      this.ctx.arc(newX+50, newY + 60, 60, Math.PI * 0.81,  Math.PI * 0.19, true);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.font = '18px sans-serif';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText('Ribosome', newX+ 10, newY + 40);
      
      this.ctx.restore();
    } else {
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
  }

  drawRNA (toX, toY, fromX, fromY) {
    this.ctx.lineWidth = 15;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.strokeStyle='#50ddc4';
    this.ctx.closePath();
    this.ctx.stroke();
    if (toX > 600) { // draw line on top
      let fromX1 =  600 ;
      let toX2 = Math.min(toX, 700) ;
      const newAdjacent1 = Math.abs(toX - 600);
      const newAdjacent2 = Math.abs(toX - toX2);
      const newOposite1 = fromY > 200 ? 0.75 * newAdjacent1 +fromY + 75 : 0.75 * newAdjacent1 +fromY;
      const newOposite2 = fromY > 200 ? 0.75 * newAdjacent2 +fromY + 75 : 0.75 * newAdjacent2 +fromY;
      this.ctx.beginPath();
      this.ctx.lineJoin = 'miter';
      this.ctx.moveTo(fromX1, newOposite2); // fromY
      this.ctx.lineTo(toX2, newOposite1); // toY
      this.ctx.strokeStyle='#3caee5';
      this.ctx.closePath();
      this.ctx.stroke();
    }
    this.ctx.font = '14px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("5'", fromX, fromY + 8);
    this.ctx.fillText("RNA", fromX + 10, fromY + 15);
    
  }

  drawDNAStrand () {
    this.ctx.lineWidth = 20;
    this.ctx.lineJoin = 'round';
    // gap after gen 3
    this.ctx.beginPath();
    this.ctx.moveTo(800, 350);
    this.ctx.lineTo(870, 350);
    this.ctx.strokeStyle="#8c61df";
    this.ctx.stroke();
    // gene 3
    this.ctx.beginPath();
    this.ctx.moveTo(800, 350);
    this.ctx.lineTo(700, 350);
    this.ctx.strokeStyle='#50ddc4';
    this.ctx.stroke();
    // gene 2
    this.ctx.beginPath();
    this.ctx.moveTo(700, 350);
    this.ctx.lineTo(600, 350);
    this.ctx.strokeStyle="#3caee5";
    this.ctx.stroke();
    // gene 1
    this.ctx.beginPath();
    this.ctx.moveTo(600, 350);
    this.ctx.lineTo(500, 350);
    this.ctx.strokeStyle="#50ddc4";
    this.ctx.stroke();
    // operator
    this.ctx.beginPath();
    this.ctx.moveTo(500, 350);
    this.ctx.lineTo(400, 350);
    this.ctx.strokeStyle='#3e2fe7';
    this.ctx.stroke();
    // promoter
    this.ctx.beginPath();
    this.ctx.moveTo(400, 350);
    this.ctx.lineTo(300, 350);
    this.ctx.strokeStyle="#17f4ac";
    this.ctx.stroke();
    // gap between CAP and promoter
    this.ctx.beginPath();
    this.ctx.moveTo(300, 350);
    this.ctx.lineTo(280, 350);
    this.ctx.strokeStyle="#8c61df";
    this.ctx.stroke();
    // cap binding site
    this.ctx.beginPath();
    this.ctx.moveTo(280, 350);
    this.ctx.lineTo(200, 350);
    this.ctx.strokeStyle="#3e2fe7";
    this.ctx.stroke();
    if (this.props.loopDNA) {
      // back loop
      this.ctx.beginPath();
      this.ctx.moveTo(201, 350);
      this.ctx.quadraticCurveTo(130, 345,105, 330); // (cp1x, cp1y, cp2x, cp2y, x, y)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(100, 380, 50, Math.PI* 0.43 , Math.PI * 1.57, false);
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(105, 430);
      this.ctx.quadraticCurveTo(130, 415 ,200,410); // (cp1x, cp1y, cp2x, cp2y, x, y)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      // second CAP site
      this.ctx.beginPath();
      this.ctx.moveTo(200, 410)
      this.ctx.lineTo(280, 410);
      this.ctx.strokeStyle="#3e2fe7";
      this.ctx.stroke();
      // end loop
      this.ctx.beginPath();
      this.ctx.moveTo(280, 410)
      this.ctx.lineTo(300, 410)
      this.ctx.lineTo(320, 460)
      this.ctx.strokeStyle="#8c61df";
      this.ctx.stroke();
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(200, 350);
      this.ctx.lineTo(6, 350);
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
  