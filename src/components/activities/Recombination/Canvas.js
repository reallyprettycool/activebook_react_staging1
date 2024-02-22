import React, { Component } from 'react';

// this componenent is used by Meiosis
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.BB = null;
    this.offsetX = null;
    this.offsetY = null;
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
    // console.log(this.props.drawings)

    // re draw
    this.draw();
    
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    for (let item of this.props.drawings) {
      switch (item.type) {
        case 'text':
        this.drawText (item.x, item.y, item.text)
        break;
      case 'boldText':
        this.drawBoldText (item.x, item.y, item.text)
        break;
      case 'target':
        this.drawTarget (item.x, item.y, item.width, item.height, item.color)
        break;
      case 'cell':
        this.drawCells(item.x, item.y, item.r)
        break;  
      case 'chromosome':
        this.drawChromosomes(item.x, item.y, item.origin);
        this.drawLabel(item.x-14, item.y -35, item.label1);
        this.drawLabel(item.x-10, item.y -15, item.label2); 
        break; 
      case 'cell with chromosomes':
        this.drawCells(item.x, item.y, item.r)
        this.drawChromosomes(item.x+5, item.y, item.origin); 
        this.drawLabel(item.x-9, item.y -35, item.label1);
        this.drawLabel(item.x-5, item.y -15, item.label2);
        break;  
      case 'cell with labels':
        this.drawCells(item.x, item.y, item.r)
        this.drawText(item.x-20, item.y+5, item.labels[0].text, item.labels[0].origin)
        this.drawText(item.x, item.y+5, item.labels[1].text, item.labels[1].origin)
        break;
      case 'bigChromosome':
        this.drawBigChromosomes (item.x, item.y, item.origin, item.mark);
        break;
      case 'mark':
        this.drawAlleles(item);
        break;
      case 'arrow':
        this.drawArrow(item.fromx, item.fromy, item.tox, item.toy, item.color);
        break;
        default: 
          break; 
      }
    }
  }

  drawText (x, y, text, origin) {
    let color='black';
    if (origin && origin.includes('maternal')) {
      color = 'red';
    } else if (origin && origin.includes('paternal')) {
      color = 'blue';
    } 
    this.ctx.font = '28px sans-serif';
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }
  drawBoldText (x, y, text) {
    this.ctx.font = 'bold 22px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x, y);
  }

  drawCells (x, y, r) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
    this.ctx.fillStyle ='white';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawLabel(x, y, text) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    this.ctx.moveTo(x+12, y- 4);
    this.ctx.lineTo(x+ 1, y );
    this.ctx.closePath();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x-14, y+5);
    this.ctx.closePath();
  }

  drawChromosomes (mx, my, origin) {
    this.ctx.lineWidth = 1;
    let color
    if (origin && origin.includes('maternal')) {
      color = 'red';
    } else if (origin && origin.includes('paternal')) {
      color = 'blue';
    } else {
      color = '#fc5f09';
    }
    const nloops = 9  // const nloops = size === 'large' ? 9 : 7; // 9 //6
    const radiusX = 5; //5 //5
    const radiusY = 7; // size === 'large' ? 7 : 6; // 7 //6
    // draw kinetochore 
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    let x = mx//150;
    let y = my//75;
    let x1= mx;
    let y1=my;
    // let x2= mx;
    // let y2=my;
    // let x3= mx;
    // let y3=my;
    let newColor = color;
    for (let i = 0 ; i< nloops; i++) {
      // top left arm:
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
      x -= radiusX*Math.cos(Math.PI/2.25);
      y -= radiusX*Math.sin(Math.PI/2.25);
      this.ctx.strokeStyle=newColor;
      this.ctx.stroke();
      // bottom left arm:
      this.ctx.beginPath();
      this.ctx.ellipse(x1, y1, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
      x1 += radiusX*Math.cos(Math.PI*1.41);
      y1 -= radiusX*Math.sin(Math.PI*1.41);
      this.ctx.strokeStyle=newColor;
      this.ctx.stroke();
      if (origin && origin.includes('recombinant') && i >= nloops/2) {
        newColor = color === 'blue' ? 'red' : 'blue';
      }
    }
    this.ctx.closePath();
  } 

  drawBigChromosomes (mx, my, origin, mark) {
    this.ctx.lineWidth = 1;
    let startRec = Math.min(mark, this.props.drawings[this.props.drawings.length -1].x)
    let endRec = Math.max(mark, this.props.drawings[this.props.drawings.length -1].x)
    let x = mx//150;
    let y = my//75;
    // console.log('Math.sin(Math.PI/2.25)', Math.sin(Math.PI/2.25)) // 0.984807753012208
    // console.log('Math.cos(Math.PI*1.41)', Math.cos(Math.PI*1.41)) // -0.2789911060392296
    // console.log('Math.cos(Math.PI/2.25)', Math.cos(Math.PI/2.25)) // 0.17364817766693041
    // console.log('Math.sin(Math.PI*1.41)', Math.sin(Math.PI*1.41)) // -0.960293685676943
    let color= '#fc5f09';
    if (origin && origin.includes('maternal')) {
      color = 'red';
    } else if (origin && origin.includes('paternal')) {
      color = 'blue';
    } 
    const originalColor = color;
    const nloops = 30 ;
    const radiusY = 7; //5 //5
    const radiusX =  11;

    // let positionArray1 = [];
    // let positionArray2 = [];
    let x1 = mx//150;
    let y1 = my//75;
    let x2= mx;
    let y2=my;
    for (let i = 0 ; i< nloops; i++) {
      // if (i === 0 || i === nloops -1) { 
      //   positionArray1.push([x1,y1]);
      //   positionArray2.push([x2,y2]);
      // }
      if (x1 > startRec && x1 < endRec) { color = 'purple'
      } else { color=originalColor}
      // top left arm:
      this.ctx.beginPath();
      this.ctx.ellipse(x1, y1, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation Math.PI * 1/6, startAngle, endAngle [, anticlockwise]);
      this.ctx.strokeStyle=color;
      this.ctx.stroke();
      // bottom left arm:
      this.ctx.beginPath();
      this.ctx.ellipse(x1, y2, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
      this.ctx.strokeStyle=color;
      this.ctx.stroke();
      // bottom right arm:
      if (x2 > startRec && x2 < endRec) { color = 'purple'
      } else { color=originalColor}
      this.ctx.beginPath();
      this.ctx.ellipse(x2, y1, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
      this.ctx.strokeStyle=color;
      this.ctx.stroke();
      // top right arm:
      this.ctx.beginPath();
      this.ctx.ellipse(x2, y2, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
      this.ctx.strokeStyle=color;
      this.ctx.stroke();
      x1 -= radiusY*1.1;
      y1 -= radiusY*0.17;
      y2 += radiusY*0.17;
      x2 += radiusY*1.1;

      // draw recombination label
      if (x2 > 785 && x2 < 830) {
        this.ctx.beginPath();
        this.ctx.ellipse(x2, 495, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
        this.ctx.strokeStyle='purple';
        this.ctx.stroke();
      }
          // draw kinetochore 
      this.ctx.beginPath();
      this.ctx.arc(x, y, radiusX, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fillStyle = originalColor;
      this.ctx.fill();
    }

    this.drawBoldText (435, 500, "Posible sites for recombination:")
    // console.log('positions 1', positionArray1)
    // console.log('positions 2', positionArray2)
  }

  drawAlleles (item) {
    const parentalRatio = Math.abs(100-this.props.recombinationFreq)
    this.ctx.font = '32px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText ( `${this.props.recombinationFreq}%`,260, 160)
    this.ctx.fillText(`${parentalRatio}%`,80, 160);
    // draw set allele
    let x2 = item.mark;
    if (x2 >= 640 && x2 < 650)  { x2 = 639
    } else if (x2 >= 650 && x2 <= 660)  { x2 = 661}
    let y1 // maternal tick
    let y1b // maternal tich 2
    let y2 // paternal tick
    let y2b // paternal tick 2
    // maternal mark 
    if (x2 <= 650) {
      y1 = x2*0.15454545 + 199.54575;
      y1b= 400.454545 -x2*0.15454545 
      y2= 500.454545 -x2*0.15454545;
      y2b = x2*0.15454545 + 299.54575;
    } else {
      y1 = 400.454545 -x2*0.15454545 ;
      y1b = x2*0.15454545 + 199.54575;
      y2 = x2*0.15454545 + 299.54575;
      y2b= 500.454545 -x2*0.15454545;
    }
    this.drawMark (x2,y1, item.maternal[0], 'red')
    this.drawMark (x2,y1b, '')
    this.drawMark (x2,y2, item.paternal[0], 'blue')
    this.drawMark (x2,y2b, '')

    // draw moving allele 
    let x = item.x;
    if (x >= 640 && x < 650)  { x = 639
    } else if (x >= 650 && x <= 660)  { x = 661}
    let y11 // maternal tick
    let y11b // maternal tich 2
    let y22 // paternal tick
    let y22b // paternal tick 2
    // maternal mark 
    if (x <= 650) {
      y11 = x*0.15454545 + 199.54575;
      y11b= 400.454545 -x*0.15454545 
      y22= 500.454545 -x*0.15454545;
      y22b = x*0.15454545 + 299.54575;
    } else {
      y11 = 400.454545 -x*0.15454545 ;
      y11b = x*0.15454545 + 199.54575;
      y22 = x*0.15454545 + 299.54575;
      y22b= 500.454545 -x*0.15454545;
    }
    this.drawMark (x,y11, item.maternal[1], 'red')
    this.drawMark (x,y11b, '')
    this.drawMark (x,y22, item.paternal[1], 'blue')
    this.drawMark (x,y22b, '')
    this.drawLines(x,y11b,y22b,y11)
    // console.log(item.mark, item.maternal)
  }

  drawLines (x, y1,y2, y3) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([5, 5])
    this.ctx.moveTo(x, y2-20);
    this.ctx.lineTo(x, y1+20);
    this.ctx.moveTo(x, y3-45);
    this.ctx.lineTo(x, 140);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'purple';
    this.ctx.stroke();
    this.ctx.setLineDash([])
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${String.fromCharCode(8592)} Drag this ${String.fromCharCode(8594)}`, x-65, 120);
  }

  drawMark (x,y, text, color = 'black'){
    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.moveTo(x, y- 7);
    this.ctx.lineTo(x, y + 7 );
    this.ctx.closePath();
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.fillStyle = color;
    if (y > 335) { // put label on top for top chromosome and bottom for bottom chromosome
      this.ctx.fillText(text, x-8, y+35);
      this.ctx.closePath();
    } else {
      this.ctx.fillText(text, x-8, y-25);
      this.ctx.closePath();
    }
  }

  drawTarget (x, y, width, height, color='#e5e5e5') {
    this.ctx.beginPath();
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = 2;
    this.ctx.rect(x, y, width, height);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
  }

  drawGraph() {
    // draw axes
    this.ctx.beginPath();
    this.ctx.moveTo(420, 50);
    this.ctx.lineTo(420, 220);
    this.ctx.lineTo(890, 220);
    this.ctx.strokeStyle= 'black';
    this.ctx.stroke();
    // draw labels:
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Distance on the chromosome", 500,250);
    this.ctx.save(); // save orientation
    this.ctx.translate(0, this.canvas.height - 1);// hold top-right hand corner when rotating ( this.canvas.width - 1, 0 );
    this.ctx.rotate(3* Math.PI / 2); // rotate 270 degrees ( 3 * Math.PI / 2 );//  rotate 90 degrees ( Math.PI / 2); 
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = "right";
    this.ctx.fillText('Recombination', 480, 390);
    this.ctx.fillText('frequency', 435, 410);
    this.ctx.restore();
  }

  drawArrow(fromx, fromy, tox, toy, color = '#7a7a7a'){
    const headlen = 7;   // length of head in pixels
    const angle = Math.atan2(toy-fromy,tox-fromx);
    // const color = '#7a7a7a'; //#cccccc
    //starting path of the arrow from the start square to the end square and drawing the stroke
    this.ctx.beginPath();
    this.ctx.lineJoin = 'miter';
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    this.ctx.beginPath();
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));

    //path from the side point of the arrow, to the other side point
    this.ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    this.ctx.lineTo(tox, toy);
    this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));

    //draws the paths created above
    this.ctx.stroke();
    this.ctx.fillStyle = color;
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
    const canvasStyle = {border:'1px solid blue'} //style={canvasStyle}
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="550px" width="900px" style={canvasStyle} ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas