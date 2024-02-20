import React, { Component } from 'react';
import Canvas from './Canvas'

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      angle: 0,
      waterMolecules: [], 
      pores: [],
      poreWidth:20,
      lineLength:20,
      channelProteins: [],
      otherMolecules:[],
      ATP: [],
    };
    // this.barrier = false;
    // this.props.radius = 5;
    // this.props.side = 'right';
    // this.props.moleculeColor = 'red';
    // this.props.moleculeType = 'hydrophilic'; //'hydrophobic';
    this.lineWidth = 10;
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  updateAnimationState() {
    // this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.setState(prevState => ({ 
      waterMolecules: this.moveMolecules(prevState.waterMolecules),
      otherMolecules: this.moveMolecules(prevState.otherMolecules),
      }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  setCanvasSize = (height, width) => {
    // console.log ('max height: ', height, this.maxHeight*0.97)
      this.maxHeight= height;
      this.maxWidth= width;
    this.spawnWaterMolecules(35);
    (this.props.barrier || this.props.scenario === 'Simple diffusion') ? this.defineMembrane(0, this.maxHeight*0.97) : this.defineMembrane(5*this.props.radius, 20);  //(20,20) // (0, this.maxHeight*0.97)
    this.spawnOtherMolecules(16, this.props.side);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.side !== prevProps.side || this.props.moleculeColor !== prevProps.moleculeColor || this.props.moleculeType !== prevProps.moleculeType || this.props.radius !== prevProps.radius) {
      this.setState({channelProteins:[], ATP: []});
      this.spawnWaterMolecules(35);
      (this.props.barrier || this.props.scenario === 'Simple diffusion') ? this.defineMembrane(0, this.maxHeight*0.97) : this.defineMembrane(5*this.props.radius, 20);  //(20,20) // (0, this.maxHeight*0.97)
      this.spawnOtherMolecules(16, this.props.side);
    } else if (this.props.barrier !== prevProps.barrier) {
      this.setState({channelProteins:[], ATP: []});
      (this.props.barrier || this.props.scenario === 'Simple diffusion') ? this.defineMembrane(0, this.maxHeight*0.97) : this.defineMembrane(5*this.props.radius, 20);  //(20,20) // (0, this.maxHeight*0.97)
    }
  }

  defineMembrane (poreWidth, lineLength) {
    const lineWidth = Math.round(this.lineWidth*0.8) ;
    const x = Math.round(this.maxWidth*0.5);
    const color = '#fdcbaf';
    let poreArray=[];
    // backward loop: draws pores from bottom to top
    for (let y= Math.ceil(this.maxHeight*0.97); y> Math.ceil(this.maxHeight*0.07); y=y-poreWidth-lineLength) {
      let yTop = y-lineLength;
      if (yTop < Math.ceil(this.maxHeight*0.07)) {yTop = Math.ceil(this.maxHeight*0.07)} 
      poreArray.push({startX: x,   startY: y, endY:yTop, width: lineWidth, color: color})
    }
    this.setState({pores: poreArray}, () => {
        this.setChannelProteins()
    })
  }

  setChannelProteins () {
    if (!this.props.barrier && this.props.scenario !== 'Simple diffusion') {
      const color = '#fc5f09';
      const lineWidth = Math.round(this.lineWidth*0.5);
      const lineLength = Math.round(this.lineWidth*0.7); // make line longer than thickess of membrane
      const x = Math.round(this.maxWidth*0.5);
      const startX = x-lineLength;
      const endX = x+lineLength;
      let channelArray = [];
      for (let onePore of this.state.pores) {
        if (onePore.startY < Math.ceil(this.maxHeight*0.97)) {
          channelArray.push({startX:startX, y: onePore.startY, endX: endX, color: color, lineWidth:lineWidth })
        }
        if (onePore.endY > Math.ceil(this.maxHeight*0.07)) {
          channelArray.push({startX:startX, y: onePore.endY, endX: endX, color: color, lineWidth:lineWidth })
        }
      }
      this.setState({channelProteins:channelArray})
    }
  }

  spawnWaterMolecules (qty) {
    let waterArray = [];
    const radius = 3;
    const vx= 10/radius;
    const vy= 10/radius;
    for (let i = 0; i < qty; i++) {
      const theX = (this.maxWidth*0.02) + (Math.random()*(this.maxWidth*0.95)); // between 55 * 425 -5
      const theY = (this.maxHeight*0.09) + (Math.random()*(this.maxHeight*0.88));
      const angle = Math.random()*2*Math.PI;
      const direction = [Math.cos(angle), Math.sin(angle)];
      waterArray.push({
        x: theX,
        y: theY,
        vx: vx * direction[0],
        vy: vy * direction[1],
        radius: 3,
        color:'blue',
        type: 'water'
      })
    }
    this.setState({waterMolecules: waterArray})
  }

  spawnOtherMolecules (qty, side) {
    let moleculeArray = [];
    const vx= 10/this.props.radius;
    const vy= 10/this.props.radius;
    let theX, theY
    for (let i = 0; i < qty; i++) {
      const angle = Math.random()*2*Math.PI;
      const direction = [Math.cos(angle), Math.sin(angle)];
      // check if correct side, if both sides, then make molecules only for even loops
      if (side === 'left' || (this.props.bothSides && (side === 'right') && (i%4 === 0))) {
        theX = (this.maxWidth*0.02) + (Math.random()*(this.maxWidth*0.45)); // 
        theY = (this.maxHeight*0.09) + (Math.random()*(this.maxHeight*0.88));
        moleculeArray.push({
          x: theX,
          y: theY,
          vx: vx * direction[0],
          vy: vy * direction[1],
          radius: this.props.radius,
          color:this.props.moleculeColor,
        })
      } 
      if (side === 'right' || (this.props.bothSides && (side === 'left') && (i%4 === 0))) {
        theX = (this.maxWidth*0.52) + (Math.random()*(this.maxWidth*0.45)); // 
        theY = (this.maxHeight*0.09) + (Math.random()*(this.maxHeight*0.88));
        moleculeArray.push({
          x: theX,
          y: theY,
          vx: vx * direction[0],
          vy: vy * direction[1],
          radius: this.props.radius,
          color:this.props.moleculeColor,
        })
      }
    }
    this.setState({otherMolecules: moleculeArray})
    // }
  }

  moveMolecules (moleculeArray) {
    let ATParray = [];
    for (let i= 0; i< moleculeArray.length; i++) {
      let futureX = moleculeArray[i].x + moleculeArray[i].vx;
      let futureY = moleculeArray[i].y + moleculeArray[i].vy;
      const xCurrentDistance = Math.min(Math.abs(moleculeArray[i].x-(this.maxWidth*0.02)), Math.abs(moleculeArray[i].x-(this.maxWidth*0.97))); // distance between molecule center & membrane center
      const xFutureDistance = Math.min(Math.abs(futureX-(this.maxWidth*0.02)), Math.abs(futureX-(this.maxWidth*0.97))); // distance between molecule center & membrane center
      if ((xCurrentDistance > xFutureDistance) && ((futureX - moleculeArray[i].radius) <= (this.maxWidth*0.02) || // left of left border OR 
          (futureX + moleculeArray[i].radius) >= (this.maxWidth*0.97))) { // right of right border
            moleculeArray[i].vx *= -1;
            futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
      } 
      const yCurrentDistance = Math.min(Math.abs(moleculeArray[i].y-(this.maxHeight*0.09)), Math.abs(moleculeArray[i].y-(this.maxHeight*0.97)))
      const yFutureDistance = Math.min(Math.abs(futureY-(this.maxHeight*0.09)), Math.abs(futureY-(this.maxHeight*0.97)))
      if ((yCurrentDistance > yFutureDistance) && ((futureY + moleculeArray[i].radius) >= (this.maxHeight*0.97) || // lower than bottom border OR
          (futureY - moleculeArray[i].radius) <= (this.maxHeight*0.09))) { // higher than top water edge
            moleculeArray[i].vy *= -1;
            futureY = moleculeArray[i].y + moleculeArray[i].vy; // update future y
      }
      const xCurrentDist = Math.abs(moleculeArray[i].x-Math.round(this.maxWidth*0.5)); // distance between molecule center & membrane center
      const xFutureDist = Math.abs(futureX-Math.round(this.maxWidth*0.5)); // distance between molecule center & membrane center
      if ((moleculeArray[i].type !== 'water' && xFutureDist <= this.props.radius + 0.5*this.lineWidth)) {
        if ((xCurrentDist > xFutureDist) && this.props.barrier) {
          moleculeArray[i].vx *= -1;
        } else if ((!this.props.barrier && this.props.scenario !== 'Simple diffusion')) {
          for (let onePore of this.state.pores) { // **** loop through pores
            if((xCurrentDist > xFutureDist) && (futureY - moleculeArray[i].radius < onePore.startY) && 
            (futureY + moleculeArray[i].radius > onePore.endY)) { // will occur in facilitated & active transport
              moleculeArray[i].vx *= -1; // bounce at the membrane sections
              // moleculeArray[i].vy *= -1;
            } else if (this.props.scenario === 'Active transport') {
              if ((this.props.side === 'right' && moleculeArray[i].vx < 0) || // molecule moving from high to low
                (this.props.side === 'left' && moleculeArray[i].vx > 0)){
                  moleculeArray[i].vx *= -1; // don't let molecules move with gradient
              } else if (( moleculeArray[i].x >= Math.round(this.maxWidth*0.5) && moleculeArray[i].x+ moleculeArray[i].vx < Math.round(this.maxWidth*0.5))||
              ( moleculeArray[i].x <= Math.round(this.maxWidth*0.5) && moleculeArray[i].x+ moleculeArray[i].vx > Math.round(this.maxWidth*0.5))) { // when molecule crosses mid point
                ATParray.push({x: moleculeArray[i].x, y:moleculeArray[i].y})
              }
            }
          } 
        }
      }
        // const xDist = Math.abs(futureX-Math.round(this.maxWidth*0.5)); // distance between molecule center & membrane center
        // if (xDist <= this.props.radius + 0.5*this.lineWidth) { // compare location along x-axis
        
      // }
      moleculeArray[i].x += moleculeArray[i].vx;
      moleculeArray[i].y += moleculeArray[i].vy;
    }
    this.setState({ATP: this.state.ATP.concat(ATParray)})
    return moleculeArray
  }

  render() {
    return <Canvas 
            angle={this.state.angle} 
            water={this.state.waterMolecules}
            setCanvasSize={this.setCanvasSize}
            waterMolecules={this.state.waterMolecules}
            pores = {this.state.pores}
            channelProteins = {this.state.channelProteins}
            otherMolecules={this.state.otherMolecules}
            barrier ={this.props.barrier}
            ATP = {this.state.ATP}
          />;
  }
}

export default Animation

      // // Check for collisions with other molecules in the array in moveMolecules()
      // if (i > 0 && i < moleculeArray.length-1) {
      //   for (let j = 0; j< i; j++) {
      //     var xDistance = (moleculeArray[j].x - moleculeArray[i].x); 
      //     var yDistance = (moleculeArray[j].y - moleculeArray[i].y);
      //     var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); 
      //     var sumOfRadius = ((moleculeArray[i].radius) + (moleculeArray[j].radius)); // add the balls radius together
      //     if (distanceBetween <= sumOfRadius) {  
      //       moleculeArray[i].vx *= -1;
      //       moleculeArray[j].vx *= -1;
      //       moleculeArray[i].vy *= -1;
      //       moleculeArray[j].vy *= -1;
      //     }
      //   }
      // }