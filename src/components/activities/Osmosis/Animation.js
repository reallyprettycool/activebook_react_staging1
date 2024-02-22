import React, { Component } from 'react';
import Canvas from './Canvas'

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      innerRadius: 72,
      outerRadius: 75,
      waterMolecules: [], 
      otherMolecules:[],
      cellWall: false,
      openChannels: false,
      cellStatus: null,
      dashLine: 10,
      dashGap:0,
    };
    this.lineWidth = 10;
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  updateAnimationState() {
    if (this.state.cellStatus) { this.manageCellSize() }
    this.setState(prevState => ({ 
      waterMolecules: this.moveMolecules(prevState.waterMolecules),
      otherMolecules: this.moveMolecules(prevState.otherMolecules),
      }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.insideMolecules !== prevProps.insideMolecules || this.props.moleculeColor !== prevProps.moleculeColor || this.props.radius !== prevProps.radius) {
      this.setState({ 
        innerRadius: 72,
        outerRadius: 75,
        waterMolecules: [], 
        otherMolecules:[],
        cellWall: false,
        openChannels: false,
        cellStatus: null,
        dashLine: 10,
        dashGap: 0,});
      this.spawnWaterMolecules(35);
      this.spawnMoleculesOutside(this.props.outsideMolecules);
      this.spawnMoleculesInside(this.props.insideMolecules);
    } 
    if (this.props.selected !== prevProps.selected) {
      this.manageOutcome();
    }
  }

  setCanvasSize = (height, width) => {
    this.maxHeight= height;
    this.maxWidth= width;
    this.xCenter= this.maxWidth*0.5;
    this.yCenter = this.maxHeight*0.52;
    this.spawnWaterMolecules(35);
    this.spawnMoleculesOutside(this.props.outsideMolecules);
    this.spawnMoleculesInside(this.props.insideMolecules);
  }

  manageOutcome () {
    let outsideMolecules = this.props.outsideMolecules;
    let insideMolecules = this.props.insideMolecules;
    let changeCellSize = false;
    let cellWall = false;
    switch(this.props.selected) {
      case 'Add more solutes inside the cell':
        this.spawnMoleculesInside(18)
        insideMolecules += 18;
        changeCellSize = true;
        break;
      case 'Add more solutes outside the cell':
        this.spawnMoleculesOutside(40)
        outsideMolecules +=40;
        changeCellSize = true;
        break;
      case 'Leave it as is':
        outsideMolecules = this.props.outsideMolecules;
        insideMolecules = this.props.insideMolecules;
        changeCellSize = true;
        break;
      case 'Allow solutes to exit the cell':
        if (this.props.outsideMolecules > this.props.insideMolecules) {changeCellSize = true;}
        this.setState({
          openChannels:true, 
          dashGap: 8,
          dashLine:10,
        })
        break;
      case 'Give the cell a cell wall':
        changeCellSize = true;
        cellWall = true;
        break;
      default:
        break;
    }
    if (changeCellSize && insideMolecules >= 18 && outsideMolecules <= 8 && this.props.selected !== 'Allow solutes to exit the cell') {
      this.setState({cellStatus:'expanding', cellWall: cellWall}) // lets water come in and increases cell radii
      // console.log('cell expanding')

    }
    if (changeCellSize && insideMolecules <= 18 && outsideMolecules >= 40) {
      this.setState({cellStatus:'shrinking', cellWall: cellWall}) // lets water leave the cell and reduces cell radii
      // console.log('cell shrinking')
    }
  }

  manageCellSize () {
    // change inner and outer radius 
    let innerFactor = 0;
    let outerFactor = 0;
    if (this.state.cellStatus === 'shrinking') {
      innerFactor = 0.9975; 
      outerFactor= 0.999;
      this.setState(prevState => ({ 
        innerRadius: innerFactor*(prevState.innerRadius),
        outerRadius: outerFactor*(prevState.outerRadius),
        }));
    }
    if (this.state.cellStatus === 'expanding' && !this.state.cellWall) {
      innerFactor = 1.001; 
      outerFactor= 1.001;
      // create variable to manage dash segments 
      const gapFactor = 0.01;
      const lineFactor = 0.999;
      this.setState(prevState => ({ 
        innerRadius: innerFactor*(prevState.innerRadius),
        outerRadius: outerFactor*(prevState.outerRadius),
        dashLine: lineFactor*prevState.dashLine,
        dashGap: gapFactor + prevState.dashGap,
      }));
    }
  }

  spawnWaterMolecules (qty) {
    let waterArray = [];
    const radius = 3;
    const vx= 6/radius;
    const vy= 6/radius;
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
        molType: 'water',
      })
    }
    this.setState({waterMolecules: waterArray})
  }

  spawnMoleculesOutside (qty) {
    let moleculeArray = [];
    const vx= 6/this.props.radius;
    const vy= 6/this.props.radius;
    let theX, theY
    for (let i = 0; i < qty; i++) {
      const angle = Math.random()*2*Math.PI;
      const direction = [Math.cos(angle), Math.sin(angle)];
      theX = (this.maxWidth*0.02) + (Math.random()*(this.maxWidth*0.97)); // 
      theY = (this.maxHeight*0.09) + (Math.random()*(this.maxHeight*0.88));
      const xDistance = (theX - this.xCenter); 
      const yDistance = (theY- this.yCenter);
      const distanceToCellCenter = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); 
      if (distanceToCellCenter <= this.state.outerRadius*1.2) {
        // console.log('Rejected distance between ', distanceToCellCenter, 'outer radius ', this.state.outerRadius)
        i = i-1; //reset the loop
        theX= null;
        theY=null;
      } else if (distanceToCellCenter > this.state.outerRadius*1.2) {
        // console.log('Accepted distance between ', distanceToCellCenter, 'outer radius ', this.state.outerRadius)
        moleculeArray.push({
          x: theX,
          y: theY,
          vx: vx * direction[0],
          vy: vy * direction[1],
          radius: this.props.radius,
          color:this.props.moleculeColor,
          molType:'solute',
        })
      }   
    }
    this.setState(prevState => ({ 
      otherMolecules: prevState.otherMolecules.concat(moleculeArray)
      }));
  }

  spawnMoleculesInside (qty) {
    let moleculeArray = [];
    const vx= 6/this.props.radius;
    const vy= 6/this.props.radius;
    let theX, theY
    for (let i = 0; i < qty; i++) {
      const angle = Math.random()*2*Math.PI; // for random direction
      const direction = [Math.cos(angle), Math.sin(angle)];
      const r = this.state.innerRadius * Math.sqrt(Math.random())*0.9 // compensate for more points with greater radius
      const theta = Math.random() * 2 * Math.PI
      theX = this.xCenter + r * Math.cos(theta)
      theY = this.yCenter + r * Math.sin(theta)
      moleculeArray.push({
        x: theX,
        y: theY,
        vx: vx * direction[0],
        vy: vy * direction[1],
        radius: this.props.radius,
        color:this.props.moleculeColor,
        molType: 'solute',
      })
    }
    this.setState(prevState => ({ 
      otherMolecules: prevState.otherMolecules.concat(moleculeArray)
      }));
  }

  moveMolecules (moleculeArray) {
    for (let i= 0; i< moleculeArray.length; i++) {
      const xDistance = (moleculeArray[i].x - this.xCenter); 
      const yDistance = (moleculeArray[i].y- this.yCenter);
      const distanceToCellCenter = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); 
      let futureX = moleculeArray[i].x + moleculeArray[i].vx;
      let futureY = moleculeArray[i].y + moleculeArray[i].vy;
      let futureXdist = futureX - this.xCenter;
      let futureYdist = futureY - this.yCenter;
      // prevent molecules from leaving the main container
      let futureDistToCenter = Math.sqrt((futureXdist * futureXdist) + (futureYdist * futureYdist)); 
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
      // console.log('allow solutes out? ', (this.props.selected !== 'Allow solutes to exit the cell' || (this.props.selected === 'Allow solutes to exit the cell' && moleculeArray[i].type !== 'solute')))
      if (this.props.selected === 'Allow solutes to exit the cell') {
        moleculeArray[i].x += moleculeArray[i].vx;
        moleculeArray[i].y += moleculeArray[i].vy;
        continue; 
      } else if (((this.state.cellStatus !== 'shrinking' || ( this.state.cellStatus === 'shrinking' && moleculeArray[i].molType !== 'water')) || 
      (this.props.selected !== 'Allow solutes to exit the cell' || (this.props.selected === 'Allow solutes to exit the cell' && moleculeArray[i].molType !== 'solute'))) &&
      (distanceToCellCenter <= this.state.innerRadius*0.92 && futureDistToCenter > this.state.innerRadius*0.92)) { // molecule about to move outside the cell
        moleculeArray[i].vx *= -1;
        moleculeArray[i].vy *= -1;
        // moleculeArray[i].x -= moleculeArray[i].vx*0.25;
        futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
        futureY = moleculeArray[i].y + moleculeArray[i].vy; // update future y
      } else if ((this.state.cellStatus !== 'expanding' || (this.state.cellStatus === 'expanding' && moleculeArray[i].molType !== 'water')) &&
        (distanceToCellCenter > this.state.outerRadius*1.1 + moleculeArray[i].radius  && futureDistToCenter <= this.state.outerRadius*1.1+ moleculeArray[i].radius )) { // molecule about to move inside the cell
        moleculeArray[i].vx *= -1;
        moleculeArray[i].vy *= -1;
        // moleculeArray[i].x -= moleculeArray[i].vx*0.25;
        futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
        futureY = moleculeArray[i].y + moleculeArray[i].vy; // update future y
      }

      moleculeArray[i].x += moleculeArray[i].vx;
      moleculeArray[i].y += moleculeArray[i].vy;
    }
    return moleculeArray
  }

  render() {
    return <Canvas 
            innerRadius={this.state.innerRadius}
            outerRadius={this.state.outerRadius}
            water={this.state.waterMolecules}
            setCanvasSize={this.setCanvasSize}
            waterMolecules={this.state.waterMolecules}
            otherMolecules={this.state.otherMolecules}
            cellWall = {this.state.cellWall}
            openChannels = {this.state.openChannels}
            cellStatus = {this.state.cellStatus}
            dashGap={this.state.dashGap} // intervals for membrane gaps
            dashLine={this.state.dashLine}
          />;
  }
}

export default Animation
