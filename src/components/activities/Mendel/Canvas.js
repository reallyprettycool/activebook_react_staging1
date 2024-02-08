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

    // re draw
    this.draw();
    // console.log(this.props.drawings)

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawItems();
    if (this.props.misses > 0) {
      this.drawMisses()
    }
  }

  drawItems () {
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
          this.drawChromosomes(item.x, item.y, item.size, item.arms, item.origin); 
          break; 
        case 'label':
          this.drawLabel(item.x, item.y, item.text); 
          break; 
        case 'chromosome with label':
          this.drawChromosomes(item.x, item.y, item.size, item.arms, item.origin); 
          this.drawLabel(item.x-10, item.y -15, item.label);
          break; 
        case 'chromosome with mark':
          this.drawChromosomes(item.x, item.y, item.size, item.arms, item.origin); 
          this.drawMark(item.x-10, item.y -15);
          break; 
          case 'arrow':
          this.drawArrow(item.fromx, item.fromy, item.tox, item.toy, item.color);
          break;
        case 'cell with chromosomes':
          this.drawCells(item.x, item.y, item.r);
          for (let chromosome of item.chromosomes) {
            this.drawChromosomes(chromosome.x, chromosome.y, chromosome.size, chromosome.arms, chromosome.origin); 
            this.drawLabel(chromosome.x-10, chromosome.y -15, chromosome.label);
            // this.drawChromosomes(chromosome.xOffset+item.x, chromosome.yOffset+item.y, chromosome.size, chromosome.arms, chromosome.origin); 
          }
          // if (item.labels) {
          //   for (let label of item.labels) {
          //     this.drawLabel(item.x+label.xOffset, item.y+ label.yOffset, label.text); 
          //   }
          // }
        default: 
          break; 
      }
    }

  }

  drawMisses () {
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'red';
    if (this.props.level < 3) {
      this.ctx.fillText(`Misses: ${this.props.misses}`, 550, 75);
    } else {
      this.ctx.fillText(`Misses: ${this.props.misses}`, 730, 40);
    }
  }

  drawText (x, y, text) {
    this.ctx.font = '18px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x, y);
  }
  drawBoldText (x, y, text) {
    this.ctx.font = 'bold 20px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x, y);
  }

  drawLabel(x, y, text) {
    // const width = this.ctx.measureText(text).width;
    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    this.ctx.moveTo(x+12, y- 4);
    this.ctx.lineTo(x+ 1, y );
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    // this.ctx.rect(x, y-10, 12, 8); //width+4
    // this.ctx.fillStyle = 'black';
    // this.ctx.fill();
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, x-14, y+5);
    this.ctx.closePath();
  }

  drawMark(x, y) {
    // const width = this.ctx.measureText(text).width;
    this.ctx.beginPath();
    this.ctx.lineWidth = 6;
    this.ctx.moveTo(x+12, y- 4);
    this.ctx.lineTo(x+ 1, y );
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.closePath();
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

  drawCells (x, y, r) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
    let color = "white"
    // if (this.props.level === 5) {
    //   const matchingTargets = this.props.fixtures.filter(fixture=> {
    //     return fixture.type === 'box' && x <= fixture.x + fixture.width && x >= fixture.x && y <= fixture.y + fixture.height && y >= fixture.y
    //   });
    //   if (matchingTargets.length >= 1) {
    //     color ="#e5e5e5";
    //   }
    // }
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
    this.ctx.fillStyle =color;
    this.ctx.fill();
  }

  drawChromosomes (mx, my, size, arms, origin) {
    this.ctx.lineWidth = 1;
    let x = mx//150;
    let y = my//75;
    let color
    if (origin && origin.includes('maternal')) {
      color = 'red';
    } else if (origin && origin.includes('paternal')) {
      color = 'blue';
    } else {
      color = '#fc5f09';
    }
    const nloops = size === 'large' ? 9 : 7; // 9 //6
    const radiusX = 5; //5 //5
    const radiusY = size === 'large' ? 7 : 6; // 7 //6
    // draw kinetochore 
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    // top left arm:
    if (arms.includes('top left')) {
      x = mx//150;
      y = my//75;
      let newColor = color;
      for (let i = 0 ; i< nloops; i++) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
        x -= radiusX*Math.cos(Math.PI/2.25);
        y -= radiusX*Math.sin(Math.PI/2.25);
        this.ctx.strokeStyle=newColor;
        this.ctx.stroke();
        if (origin && origin.includes('recombinant') && i >= nloops/2) {
          newColor = color === 'blue' ? 'red' : 'blue';
        }
      }
    }
    // bottom left arm:
    if (arms.includes('bottom left')) {
      x= mx;
      y=my;
      let newColor=color
      for (let i = 0 ; i< nloops; i++) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
        x += radiusX*Math.cos(Math.PI*1.41);
        y -= radiusX*Math.sin(Math.PI*1.41);
        this.ctx.strokeStyle=newColor;
        this.ctx.stroke();
        if (origin && origin.includes('recombinant') && i >= nloops/2) {
          newColor = color === 'blue' ? 'red' : 'blue';
        }
      }
    }

     // bottom right arm:
    if (arms.includes('bottom right')) {
      x= mx;
      y=my;
      let newColor = color;
      for (let i = 0 ; i< nloops; i++) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
        x += radiusX*Math.cos(Math.PI/2.25);
        y += radiusX*Math.sin(Math.PI/2.25);
        this.ctx.strokeStyle=newColor;
        this.ctx.stroke();
        if (origin && origin.includes('recombinant') && i >= nloops/2) {
          newColor = color === 'blue' ? 'red' : 'blue';
        }
      }
    }
     // top right arm:
     if (arms.includes('top right')) {
      x= mx;
      y=my;
      let newColor = color;
      for (let i = 0 ; i< nloops; i++) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
        x -= radiusX*Math.cos(Math.PI*1.41);
        y += radiusX*Math.sin(Math.PI*1.41);
        this.ctx.strokeStyle=newColor;
        this.ctx.stroke();
        if (origin && origin.includes('recombinant') && i >= nloops/2) {
          newColor = color === 'blue' ? 'red' : 'blue';
        }
      }
    }
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
    // const canvasStyle = {border:'1px solid blue'} //style={canvasStyle}
    return (
    <div className='canvas-container'>
      <canvas id='water-container' height="450px" width="1050px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas