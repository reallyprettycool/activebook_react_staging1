import React, { Component } from 'react';


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { 
    //   dragok: false,
    //   startX: null,
    //   startY: null,
    //   // draggables: this.props.options,
    // }
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.lineWidth= 12;
    this.offsetX = null;
    this.offsetY = null;
    this.scale = 1;
    this.protons = [
      {
        x: 670,
        y: 350,
        radius: 3,
        color:'red',
      },
      {
        x: 670,
        y: 330,
        radius: 3,
        color:'red',
      },
      {
        x: 655,
        y: 340,
        radius: 3,
        color:'red',
      },
      {
        x: 660,
        y: 368,
        radius: 3,
        color:'red',
      },
      {
        x: 660,
        y: 383,
        radius: 3,
        color:'red',
      },
    ]
  }

  componentDidMount () {
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas.getContext('2d');
    this.props.setCanvasSize(this.canvas.height, this.canvas.width); // relays the canvas size to the Animation container
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
    // if (this.canvas.width < this.BB.width || this.canvas.height < this.BB.height ) { // **
    //   this.scale = this.BB.width/this.canvas.width;
    // } else {
    //   this.scale = 1;
    // }
    // console.log('CM canvas width ', this.canvas.width, 'this BB width ', this.BB.width)
    // console.log('CM canvas height ', this.canvas.height, 'this BB width ', this.BB.height)
    // console.log('CM scale width', this.scale)
    // console.log('CM scale height', this.BB.height/this.canvas.height)
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
    // if (this.canvas.width < this.BB.width || this.canvas.height < this.BB.height ) { // **
    //   this.scale = this.BB.width/this.canvas.width;
    // } else {
    //   this.scale = 1;
    // }
    // if (this.props.options !== prevProps.options) {
    // }

    // re draw
    this.draw();
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.scale(this.scale, this.scale); // ** scales canvas with window size change
    if (this.props.drawCell) {
      this.drawCell();
      this.drawMitochondrium ();
      this.drawMatrix();
      this.drawLabels();
      this.drawETC();
    }
    
    if (this.props.chemiosmosis === true) {
      this.drawATPSynthase();
      if (this.props.ATPCount > 2 && this.props.ATPCount <= 32) {
        this.drawNADH(380, 180, 57, 'yellow', `${this.props.ATPCount - 2} ATP`, 'black')
      }
    }

    this.drawFixtures();

    if (this.props.options) {this.drawDraggables();}

    if (this.props.drawCell) {
      this.drawATPCount();
    }

    this.drawMisses();

    if (this.props.protons === true) {
      this.drawMolecules(this.props.protonMolecules);
    }
  }

  drawDraggables() {
    if (this.props.inCellDrag === true) {
      this.ctx.font = 'bold 20px sans-serif';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText('Drag from diagram', this.canvas.width*0.73, 130);
      this.ctx.fillText(`${String.fromCharCode(8592)} inside the cell`, this.canvas.width*0.73, 150);
      for (let obj of this.props.options) {
        if (obj.type === 'carbon') {
          this.drawCarbons (obj.x, obj.y, obj.c)
          if ('text' in obj) {
            this.drawText (obj.text, obj.x-5, obj.y-15, 'black')
          }
        } else if (obj.type === 'nadhE') {
          this.drawNADH(obj.x, obj.y, obj.width, obj.fill, obj.text, obj.color)
          this.drawElectrons(obj.x, obj.y)
          if (obj.text.includes('2')) {this.drawElectrons(obj.x+46, obj.y)} 
          if (obj.text.includes('6')||obj.text.includes('8')||obj.text.includes('10')) {
            this.drawElectrons(obj.x+30, obj.y);
            this.drawElectrons(obj.x+30, obj.y+29);
            this.drawElectrons(obj.x, obj.y+29);
            this.drawElectrons(obj.x+60, obj.y+29);
            this.drawElectrons(obj.x+60, obj.y);
          }
        } else if (obj.type === 'electrons') {
        this.drawElectrons(obj.x, obj.y)
        } else if (obj.type === 'proton') { 
          this.drawMolecules([obj])
        } else if (obj.type === 'oxygen') {
          this.drawOxygen(obj.x, obj.y)
          if (obj.quantity > 1){
            this.drawOxygen(obj.x, obj.y+15)
          }
        }
      }
      if (this.props.oxygen) {
        this.drawText(`Drag oxygen O${String.fromCharCode(8322)} from here:`, this.canvas.width*0.73, 250)
        this.drawMolecules(this.protons)
        this.drawText('Protons (H+)', 690, 345)
        this.drawOxygen(670, 375)
        this.drawText(`Water (H${String.fromCharCode(8322)}0)`, 690, 375)

      }
    } else {
      if (this.props.drawCell) {
        this.ctx.beginPath();
        this.ctx.rect(610, 115, 225, 285);
        this.ctx.closePath();
        this.ctx.fillStyle = '#e5e5e5';
        this.ctx.fill();
        this.ctx.font = 'bold 20px sans-serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Drag these:', this.canvas.width*0.73, 140);
      }
      // console.log('draggables for drawing ', this.props.options)
      for (let obj of this.props.options) {
        if (obj.type === 'carbon') {
          this.drawCarbons (obj.x, obj.y, obj.c)
          if ('text' in obj) {
            this.drawText (obj.text, obj.x-5, obj.y-15, 'black')
          }
        } else if (obj.type === 'process') {
          this.drawText (obj.text, obj.x, obj.y, 'black')
        } else {
          this.drawNADH(obj.x, obj.y, obj.width, obj.fill, obj.text, obj.color)
        }
      }
    }
  }

  drawFixtures () {
    for (let obj of this.props.fixtures) {
      if (obj.type === 'carbon') {
        this.drawCarbons (obj.x, obj.y, obj.c)
      } else if (obj.type === 'process') {
        this.drawText (obj.text, obj.x, obj.y, 'black')
      } else if (obj.type === 'arrow') {
        this.arrow(obj.fromx, obj.fromy, obj.tox, obj.toy); //(fromx, fromy, tox, toy)
      } else if (obj.type === 'curve') {
        this.curvedArrow(obj.x,obj.y, obj.r1, obj.r2, obj.side)
      } else if (obj.type === 'text') {
        this.drawText (obj.text, obj.x, obj.y, obj.color) 
      } else if (obj.type === 'krebs') {
        this.drawKrebs(obj.x, obj.y);
        this.drawText (obj.text, obj.x-14, obj.y, 'black')
      } else if (obj.type === 'box') {
        this.ctx.beginPath();
        this.ctx.rect(obj.x, obj.y, obj.width, obj.height)
        this.ctx.closePath();
        this.ctx.fillStyle = '#e5e5e5';
        this.ctx.fill();
        this.drawText (obj.text, obj.x, obj.y-2, 'black')
      } else if (obj.type === 'proton') { 
        this.drawMolecules([obj])
      } else if (obj.type === 'electrons') { 
        this.drawElectrons(obj.x, obj.y)
      } else if (obj.type === 'oxygen') {
        this.drawOxygen(obj.x, obj.y)
        if (obj.quantity > 1){
          this.drawOxygen(obj.x, obj.y+15)
        }
      } else if (obj.type === 'nadhE') {
        this.drawNADH(obj.x, obj.y, obj.width, obj.fill, obj.text, obj.color)
        this.drawElectrons(obj.x, obj.y)
        if (obj.text.includes('2')) {this.drawElectrons(obj.x+46, obj.y)} 
        if (obj.text.includes('6')||obj.text.includes('8')||obj.text.includes('10')) {
          this.drawElectrons(obj.x+30, obj.y);
          this.drawElectrons(obj.x+30, obj.y+29);
          this.drawElectrons(obj.x, obj.y+29);
          this.drawElectrons(obj.x+60, obj.y+29);
          this.drawElectrons(obj.x+60, obj.y);
          if (obj.text.includes('8')||obj.text.includes('10')) {
            this.drawElectrons(obj.x-14, obj.y+4);
            this.drawElectrons(obj.x+obj.width, obj.y+4);
            if (obj.text.includes('10')) {
              this.drawElectrons(obj.x-14, obj.y+16);
              this.drawElectrons(obj.x+obj.width, obj.y+16);
            }
          }
        }     
      } else {
        this.drawNADH(obj.x, obj.y, obj.width, obj.fill, obj.text, obj.color)
      }
    }
  }

  drawATPCount () {
    this.drawText(`ATP count: ${String(this.props.ATPCount)} out of 32`, 610, 20, 'black');
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle='black';
    let x = 627;  
    let y = 25;
    for (let i =0; i< 32; i++) {
      this.ctx.beginPath();
      this.ctx.rect(x, y, 15, 15);
      this.ctx.closePath();
      if (i < this.props.ATPCount) {this.ctx.fillStyle = 'yellow'}
      else {this.ctx.fillStyle = '#e5e5e5';}
      this.ctx.fill();
      this.ctx.stroke();
      if (this.props.ATPCount == '-2' && i<2) {
        this.ctx.beginPath();
        this.ctx.rect(610, y+(i*17), 15, 15);
        this.ctx.closePath();
        this.ctx.fillStyle = 'red'
        this.ctx.fill();
        this.ctx.stroke();
      }
      x+= 17;
      if ((i+1)%8 === 0) {
        y+= 17;
        x=627;
      }
    }
  }

  drawMisses() {
    if (this.props.missedSteps > 0) {
      this.drawText ('misses:', 780, 60, 'black')
      this.drawText (`${this.props.missedSteps}`, 800, 80, 'red')
    }
  }

  drawCell (){
    this.ctx.lineWidth = this.lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(0.5*this.lineWidth, 0.5*this.lineWidth);
    this.ctx.lineTo(0.5*this.lineWidth, this.canvas.height-0.5*this.lineWidth );
    this.ctx.lineTo(this.canvas.width*0.7, this.canvas.height-0.5*this.lineWidth);
    this.ctx.lineTo(this.canvas.width*0.7, 0.5*this.lineWidth);
    this.ctx.lineTo(0.5*this.lineWidth, 0.5*this.lineWidth);
    this.ctx.strokeStyle='#fdcbaf';
    this.ctx.stroke();
    this.ctx.fillStyle ="#afe1fd";
    this.ctx.fill();
  }

  drawMitochondrium (){
    this.ctx.lineWidth = this.lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.03, this.canvas.height*0.33);
    this.ctx.lineTo(this.canvas.width*0.03, this.canvas.height*0.95 );
    this.ctx.lineTo(this.canvas.width*0.67, this.canvas.height*0.95);
    this.ctx.lineTo(this.canvas.width*0.67, this.canvas.height*0.33);
    this.ctx.lineTo(this.canvas.width*0.03, this.canvas.height*0.33);
    this.ctx.strokeStyle='#ff8080';
    this.ctx.stroke();
    this.ctx.fillStyle ="#FFCCCC";
    this.ctx.fill();
  }

  drawMatrix (){
    this.ctx.lineWidth = this.lineWidth ;
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width*0.05, this.canvas.height*0.36);
    this.ctx.lineTo(this.canvas.width*0.05, this.canvas.height*0.92 );
    this.ctx.lineTo(this.canvas.width*0.56, this.canvas.height*0.92);
    this.ctx.lineTo(this.canvas.width*0.56, this.canvas.height*0.36);
    this.ctx.lineTo(this.canvas.width*0.05, this.canvas.height*0.36);
    this.ctx.closePath();
    this.ctx.fillStyle ="#ffdbed";
    this.ctx.fill();
    this.ctx.moveTo(this.canvas.width*0.56-this.lineWidth*0.7, this.canvas.height*0.36);
    this.ctx.lineTo(this.canvas.width*0.56-this.lineWidth*0.7, this.canvas.height*0.92);
    this.ctx.closePath();
    this.ctx.strokeStyle='#ff8080';
    this.ctx.stroke();
  }

  drawETC () {
    this.ctx.beginPath();
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.60, 15, 14, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.66, 5, 6, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.70, 8, 17, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.75, 6, 5, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.80, 11, 15, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.fillStyle ="#8080ff";
    this.ctx.fill();
  }

  drawATPSynthase () {
    this.ctx.beginPath();
    this.ctx.ellipse(this.canvas.width*0.555, this.canvas.height*0.46, 8, 14, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.ellipse(this.canvas.width*0.530, this.canvas.height*0.46, 14, 10, Math.PI / 2, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    this.ctx.fillStyle ="#66cc66";
    this.ctx.fill();  
  }

  drawLabels () {
    this.ctx.font = '28px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Cell', this.canvas.width*0.63, this.canvas.height*0.08);
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText('cytoplasm', this.canvas.width*0.58, this.canvas.height*0.13);
    this.ctx.fillText('mitochondrial matrix', this.canvas.width*0.10, this.canvas.height*0.90);
    this.ctx.save();
    this.ctx.translate( this.canvas.width - 1, 0 );
    this.ctx.rotate( 3 * Math.PI / 2 );
    this.ctx.textAlign = "right";
    this.ctx.fillText('intermembrane space',-160, -285);
    this.ctx.restore();
  }

  drawElectrons (x, y) {
    const r = 6; // radius
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
    this.ctx.moveTo(x+2*r, y);
    this.ctx.arc(x+2*r, y, r, 0, Math.PI * 2, true);
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
    this.ctx.fillStyle ="yellow";
    this.ctx.fill();
    this.ctx.font = 'bold 8px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('e', x-2, y+2);
    this.ctx.fillText('e', x+2*r-2, y+2);
  }

  drawOxygen (x, y) {
    const r = 8; // radius
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
    this.ctx.fillStyle ="blue";
    this.ctx.fill();
  }

  drawCarbons (x,y,c) {
    const r = 6; // radius
    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    let newX = x;    
    for (let i = 0; i< c; i++) {
      this.ctx.moveTo(newX, y);
      this.ctx.arc(newX, y, r, 0, Math.PI * 2, true);
      if (i< c-1) {
        this.ctx.moveTo(newX+r, y);
        this.ctx.lineTo(newX+3*r, y);
      }
      newX = newX+4*r;
    }
    this.ctx.strokeStyle='black';
    this.ctx.stroke();
    this.ctx.fillStyle ="grey";
    this.ctx.fill();
  }

  drawKrebs (x, y) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 12;
    this.ctx.lineJoin = 'miter';
    const r = 26;
    this.ctx.arc(x, y, r, 0, Math.PI * 1.5, false);
    // draw arrow head
    this.ctx.moveTo(x+r-8, y);
    this.ctx.lineTo(x+r+8, y);
    this.ctx.lineTo(x+r, y-10);
    this.ctx.lineTo(x+r-8, y);
    this.ctx.closePath();
    this.ctx.strokeStyle='#fc5f09';
    this.ctx.stroke();
  }

  drawNADH (x, y, width, fill, text, color) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, 26);
    this.ctx.closePath();
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    // draw text 
    this.drawText(text, x+5, y+18, color)
  }

  drawMolecules (molecules) {
    for (let oneMolecule of molecules) {
      // draw molecules only if they are passed 41% of the canvas
      if (oneMolecule.x > this.canvas.width*0.42 || !this.props.drawCell) {
        if (oneMolecule.molType === 'oxygen') {
          this.drawOxygen(oneMolecule.x, oneMolecule.y)
        } else {
          this.ctx.beginPath();
          this.ctx.arc(oneMolecule.x, oneMolecule.y, oneMolecule.radius, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fillStyle = oneMolecule.color;
          this.ctx.fill();
        }
      }
    } 
  }

  drawText (text, x, y, color) {
    this.ctx.font = 'bold 16px sans-serif';
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }


  arrow(fromx, fromy, tox, toy){
    const headlen = 7;   // length of head in pixels
    const angle = Math.atan2(toy-fromy,tox-fromx);
    //starting path of the arrow from the start square to the end square and drawing the stroke
    this.ctx.beginPath();
    this.ctx.lineJoin = 'miter';
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.strokeStyle = "#008080";
    this.ctx.lineWidth = 8;
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
    this.ctx.fillStyle = "#008080";
    this.ctx.fill();
  }

  curvedArrow (x,y, radiusX, radiusY, side) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 8;
    this.ctx.lineJoin = 'miter';
    if (side === 'left') {
      this.ctx.ellipse(x+12, y, radiusX, radiusY, 0, 1.4 * Math.PI , Math.PI / 2); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    } else {
      this.ctx.ellipse(x, y, radiusX, radiusY, 0, Math.PI / 2, 1.6 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);
    }
    // draw arrow head
    const r = radiusX;
    const theX = side === 'left'?  x+8 : x+4 ;
    const theY = y+radiusY*0.5;
    this.ctx.moveTo(theX, theY+r-5);
    this.ctx.lineTo(theX, theY+r+5);
    side === 'left'? this.ctx.lineTo(theX-6, theY+r) : this.ctx.lineTo(theX+6, theY+r); 
    this.ctx.lineTo(theX, theY+r-5);
    this.ctx.closePath();
    this.ctx.strokeStyle='#008080';
    this.ctx.stroke();
  }

  // **********  handle screen events *******************

  handleReSize = (event) => {
    // reset the offset calculation when window resizes
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = (this.canvas.width/this.BB.width); //this.BB.left;
    this.offsetY = (this.canvas.height/this.BB.height); //this.BB.top;
    // if (this.canvas.width < this.BB.width || this.canvas.height < this.BB.height ) { // *** 
    //   this.scale = this.BB.width/this.canvas.width;
    // } else {
    //   this.scale = 1;
    // }
    // console.log('canvas width ', this.canvas.width, 'this BB width ', this.BB.width)
    // console.log('canvas height ', this.canvas.height, 'this BB width ', this.BB.height)
    // console.log('scale ', this.scale)
    // console.log('window width ', window.innerWidth)
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
      <canvas id='water-container' height="400px" width="850px" ref={this.canvasRef} />
    </div>
    )
  }
}


export default Canvas
