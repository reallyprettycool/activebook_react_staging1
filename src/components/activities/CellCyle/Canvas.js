// import React, { Component } from 'react';

// // this componenent is used by CellCycle
// class Canvas extends React.Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//     this.canvas = null;
//     this.ctx = null;
//     this.BB = null;
//     this.offsetX = null;
//     this.offsetY = null;
//   }

//     componentDidMount () {
//       this.canvas = this.canvasRef.current
//       this.ctx = this.canvas.getContext('2d');
//       this.props.setCanvasSize(this.canvas.height, this.canvas.width); // relays the canvas size to the Animation container
//       this.BB = this.canvas.getBoundingClientRect();
//       this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
//       this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
//       // initial draw
//       this.draw();
//       // listen for mouse events:
//       this.canvas.onmousedown = this.myDown;
//       this.canvas.onmouseup = this.myUp;
//       this.canvas.onmousemove = this.myMove;
//       // listen for touch events in mobile devices:
//       this.canvas.addEventListener("touchstart", this.myDownTouch, false);
//       this.canvas.addEventListener("touchend", this.myUpTouch, false);
//       this.canvas.addEventListener("touchmove", this.myMoveTouch, false);
//       // this.canvas.addEventListener("touchcancel", handleCancel, false);
//       // listen for window size changes 
//       window.addEventListener("resize", this.handleReSize);
//     }

//     componentDidUpdate(prevProps) {
//       // update offset
//       this.BB = this.canvas.getBoundingClientRect();
//       this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
//       this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
  
//       // if (this.props.options !== prevProps.options) {
//       // }
  
//       // re draw
//       this.draw();
//     }

//     draw() {
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
//       // this.drawCells();
//       this.drawFixtures();
//       this.drawDraggables();
//     }
    
//     drawFixtures () {
//       for (let fixture of this.props.fixtures) {
//         switch (fixture.type) {
//           case 'chromosome':
//             this.drawChromosomes(fixture.x, fixture.y, fixture.size, fixture.arms); 
//             break;    
//           case 'phases': 
//             this.ctx.font = 'bold 20px sans-serif';
//             this.ctx.fillStyle = 'black';
//             this.ctx.fillText(fixture.text, fixture.x, fixture.y);
//             break;    
//           case 'arrow':
//             this.drawArrows(fixture.fromx, fixture.fromy, fixture.tox, fixture.toy);
//             break;    
//           case 'cell':
//             this.drawCells(fixture.x, fixture.y, fixture.r)
//             break;    
//           case 'box':
//             this.ctx.beginPath();
//             this.ctx.lineWidth = 2;
//             this.ctx.rect(fixture.x, fixture.y, fixture.width, fixture.height);
//             this.ctx.closePath();
//             this.ctx.fillStyle = '#e5e5e5';
//             this.ctx.fill();
//             this.ctx.strokeStyle='black';
//             this.ctx.stroke();
//             break;  
//           default: 
//             break; 
//         }
//       }
//     }

//     drawDraggables () {
//       this.ctx.beginPath();
//       this.ctx.rect(740, 40, 235, 285);
//       this.ctx.closePath();
//       this.ctx.fillStyle = '#e5e5e5';
//       this.ctx.fill();
//       this.ctx.font = 'bold 20px sans-serif';
//       this.ctx.fillStyle = 'black';
//       this.ctx.fillText('Drag these:', this.canvas.width*0.805, 70);

//       for (let draggable of this.props.draggables) {
//         switch (draggable.type) {
//           case 'chromosome':
//             this.drawChromosomes(draggable.x, draggable.y, draggable.size, draggable.arms); 
//             break;    
//           case 'phases': 
//             this.ctx.font = 'bold 20px sans-serif';
//             this.ctx.fillStyle = 'black';
//             this.ctx.fillText(draggable.text, draggable.x, draggable.y);
//             break; 
//           default: 
//             break; 
//         } 
//       }
//     }

//     drawCells (x, y, r) {
//       this.ctx.beginPath();
//       this.ctx.lineWidth = 2;
//       this.ctx.moveTo(x, y);
//       this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
//       this.ctx.strokeStyle='black';
//       this.ctx.stroke();
//       this.ctx.fillStyle ="white";
//       this.ctx.fill();
//     }

//     drawChromosomes (mx, my, size, arms) {
//       this.ctx.lineWidth = 1;
//       let x = mx//150;
//       let y = my//75;
//       const nloops = size === 'large' ? 9 : 6; // 9 //6
//       const radiusX = 5; //5 //5
//       const radiusY = size === 'large' ? 7 : 6; // 7 //6
//       // draw kinetochore 
//       this.ctx.beginPath();
//       this.ctx.arc(x, y, 5, 0, Math.PI * 2, true);
//       this.ctx.closePath();
//       this.ctx.fillStyle = '#fc5f09';
//       this.ctx.fill();
//       // top left arm:
//       if (arms.includes('top left')) {
//         x = mx//150;
//         y = my//75;
//         for (let i = 0 ; i< nloops; i++) {
//           this.ctx.beginPath();
//           this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
//           x -= radiusX*Math.cos(Math.PI/2.25);
//           y -= radiusX*Math.sin(Math.PI/2.25);
//           this.ctx.strokeStyle='#fc5f09';
//           this.ctx.stroke();
//         }
//       }
//       // bottom left arm:
//       if (arms.includes('bottom left')) {
//         x= mx;
//         y=my;
//         for (let i = 0 ; i< nloops; i++) {
//           this.ctx.beginPath();
//           this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
//           x += radiusX*Math.cos(Math.PI*1.41);
//           y -= radiusX*Math.sin(Math.PI*1.41);
//           this.ctx.strokeStyle='#fc5f09';
//           this.ctx.stroke();
//         }
//       }

//        // bottom right arm:
//       if (arms.includes('bottom right')) {
//         x= mx;
//         y=my;
//         for (let i = 0 ; i< nloops; i++) {
//           this.ctx.beginPath();
//           this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 1/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
//           x += radiusX*Math.cos(Math.PI/2.25);
//           y += radiusX*Math.sin(Math.PI/2.25);
//           this.ctx.strokeStyle='#fc5f09';
//           this.ctx.stroke();
//         }
//       }
//        // top right arm:
//        if (arms.includes('top right')) {
//         x= mx;
//         y=my;
//         for (let i = 0 ; i< nloops; i++) {
//           this.ctx.beginPath();
//           this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI * 5/6, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
//           x -= radiusX*Math.cos(Math.PI*1.41);
//           y += radiusX*Math.sin(Math.PI*1.41);
//           this.ctx.strokeStyle='#fc5f09';
//           this.ctx.stroke();
//         }
//       }
//     }

//     drawArrows(fromx, fromy, tox, toy){
//       const headlen = 7;   // length of head in pixels
//       const angle = Math.atan2(toy-fromy,tox-fromx);
//       //starting path of the arrow from the start square to the end square and drawing the stroke
//       this.ctx.beginPath();
//       this.ctx.lineJoin = 'miter';
//       this.ctx.moveTo(fromx, fromy);
//       this.ctx.lineTo(tox, toy);
//       this.ctx.strokeStyle = "#017467";
//       this.ctx.lineWidth = 8;
//       this.ctx.stroke();
  
//       //starting a new path from the head of the arrow to one of the sides of the point
//       this.ctx.beginPath();
//       this.ctx.moveTo(tox, toy);
//       this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  
//       //path from the side point of the arrow, to the other side point
//       this.ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
  
//       //path from the side point back to the tip of the arrow, and then again to the opposite side point
//       this.ctx.lineTo(tox, toy);
//       this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  
//       //draws the paths created above
//       this.ctx.stroke();
//       this.ctx.fillStyle = "#017467";
//       this.ctx.fill();
  
//     }

//     // **********  handle screen events *******************

//   handleReSize = (event) => {
//     // reset the offset calculation when window resizes
//     this.BB = this.canvas.getBoundingClientRect();
//     this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
//     this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
//   }

//   // handle mousedown events
//   myDown= (e) => {
//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();
//     // get the current mouse position
//     const mx = parseInt((e.clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
//     const my = parseInt((e.clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);
//     // send current position to parent container
//     this.props.myDown(mx,my);

//   }

//   // handle mouseup events
//   myUp = (e) => {  
//     // console.log('my up ' , e)
//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();
//     // tell parent component that move is finished
//     this.props.myUp();
//   }
 
//   // handle mouse moves
//   myMove = (e) => {
//     // if we're dragging anything...
//     if (this.props.dragok) {

//       // tell the browser we're handling this mouse event
//       e.preventDefault();
//       e.stopPropagation();

//       // get the current mouse position
//       const mx = parseInt((e.clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
//       const my = parseInt((e.clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

//       // send positions to parent component
//       this.props.myMove(mx, my);
//     }
//   }

//   // handle TOUCH events
//   myDownTouch= (e) => {
//     // console.log('my down ' , e)
//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     // get the current mouse position
//     const mx = parseInt((e.targetTouches[0].clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
//     const my = parseInt((e.targetTouches[0].clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);

//     // send current position to parent container
//     this.props.myDown(mx,my);
//   }

//   // handle Touch events
//   myUpTouch = (e) => {  
//     // console.log('my up ' , e)
//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     // tell parent component that move is finished
//     this.props.myUp();
//   }
 
//   // handle mouse moves
//   myMoveTouch = (e) => {
//     // if we're dragging anything...
//     if (this.props.dragok) {
//       // tell the browser we're handling this mouse event
//       e.preventDefault();
//       e.stopPropagation();
//       // get the current mouse position
//       const mx = parseInt((e.targetTouches[0].clientX-this.BB.left)* this.offsetX); // const mx = parseInt(e.clientX - this.offsetX);
//       const my = parseInt((e.targetTouches[0].clientY-this.BB.top)* this.offsetY); // const my = parseInt(e.clientY - this.offsetY);
//       // send positions to parent component
//       this.props.myMove(mx, my);
//     }
//   }

//   render() {
//     const canvasStyle = {border:'1px solid blue'} //style={canvasStyle}
//     return (
//     <div className='canvas-container'>
//       <canvas id='water-container' style={canvasStyle} height="400px" width="1000px" ref={this.canvasRef} />
//     </div>
//     )
//   }
// }


// export default Canvas
