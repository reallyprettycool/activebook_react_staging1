import React, { Component } from 'react';
import Canvas from './Canvas';
import {carbons, processes, reactants, glycolysis, pyruvateOx, krebs, States} from './cellRespirationVariables'

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dragok: false,
      startX: null,
      startY: null,
      options:[],
      fixtures:[],
      currentProcess: 'glycolysis',
      currentStep:1,
      missedSteps:0,
      feedback: false,
      inCellDrag: false,
      ATPCount:0,
      drawCell: false,
      oxygen: false,
      chemiosmosis: false,
      protons: false,
      protonMolecules: [],
      targets: [],
    }
    this.maxSteps= States.length;
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.etcHasOxygen = 0;
    this.maxATPCount = 30;
    this.ETCpositions = [
      { minX: 450, maxX: 490, minY:310.6, maxY: 340, x: 460, y: 320, occupied: false },
      { minX: 450, maxX: 490, minY:290.6, maxY: 310, x: 460, y: 300, occupied: false },
      { minX: 450, maxX: 490, minY:270.6, maxY: 290, x: 460, y: 280, occupied: false },
      { minX: 450, maxX: 490, minY:250.6, maxY: 270, x: 460, y: 260, occupied: false },
      { minX: 450, maxX: 490, minY:230.6, maxY: 250, x: 460, y: 240, occupied: false },
    ];
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.spawnProtons(4);
  }

  updateAnimationState() {
    // this.setState(prevState => ({ angle: prevState.angle + 1 }));
    // console.log ('draw protons? ', this.state.protons);
    if (this.state.protons === true) {
      this.setState(prevState => ({ 
        protonMolecules: this.moveMolecules(prevState.protonMolecules),
        }));
    }
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  // }

  setCanvasSize = (height, width) => {
    // console.log ('max height: ', height, this.maxHeight*0.97)
      this.maxHeight= height;
      this.maxWidth= width;
      const newState = States[0]; // 0 // 24 to start etc
      this.setState(newState)
  }

  checkIfWon () {
    if (this.state.ATPCount === this.maxATPCount) {
      if (this.state.missedSteps === 0) {
        this.props.postAttempt();
      } else { 
        // let newState = States[0];
        // newState.feedback =false; // need to first reset all the draggable items positions
        // this.setState(newState);
        alert(`You had ${this.state.missedSteps} misses. \nTry again so you can get closer to the minimum number of steps!`);
        window.location.reload();
      }
    }
  }

  handleMatch (item) {
    const name = item.name;
    this.rightSound.play()
    // remove from correct answer array
    if (this.state.correctAnswer.length > 1) {
      // remove item from options shown and from the answer array:
      const answerArray = this.state.correctAnswer.slice(); // copy state without reference
      const index = answerArray.indexOf(name);
      if (index > -1) { answerArray.splice(index, 1)}; // remove from array if present.
      const optionsArray = this.state.options.slice(); // copy state without reference
      const idx = optionsArray.indexOf(item);
      // console.log ('index of item to remove ', idx)
      if (idx > -1) {optionsArray.splice(idx,1)}
      // const newOptions = this.state.options.filter(obj=> obj.name !== item.name && obj.x !== item.x && obj.y !== item.y);
      // find matching item in possible drawings
      const newDrawings = this.state.allDrawings.filter(obj=> obj.name === name);
      const remainingDrawings = this.state.allDrawings.filter(obj=> obj.name !== name);
      // const idxDrawing = newDrawings.indexOf(newDrawings[0]);
      let allDrawings = newDrawings.length > 1 ? remainingDrawings.concat(newDrawings.slice(1)) : remainingDrawings;
  
      this.setState(prevState => ({ 
        fixtures: prevState.fixtures.concat(newDrawings[0]), //
        correctAnswer:answerArray,
        options: optionsArray, //newOptions, 
        allDrawings:allDrawings,
      }));
    } else {
      let newState = States[this.state.currentStep];
      newState.feedback =false;
      this.setState(newState)
      this.setState(prevState => ({ 
        currentStep: prevState.currentStep+1,
      }));
    }
  }

  handleMiss () {
    this.wrongSound.play()
    this.setState(prevState => ({ 
      missedSteps: prevState.missedSteps+1,
      feedback: true,
    }));
  }

  handleETC () {
    let draggableArray = this.state.options.slice(); // copy state without reference
    const allDrawings = this.state.allDrawings.slice();
    const currentDrawings = this.state.fixtures.slice();
    let removeElectron = false;
    let electronObj = null;
    // let lastElectronIndex = null;
    let incorrectMessage = false;
    let feedback = false;
    console.log('draggables ', draggableArray)

    for (let obj of draggableArray) {
      let currentIndx
      if (obj.type === 'electrons' && obj.isDragging === true) {
        // allow moves only within the graph area
        if (obj.x < 495 && obj.x > 450 && obj.y < 350 && obj.y > 230.6) {  // check if match minX: 450, maxX: 490, minY:230.6, maxY: 340,
          // console.log('true ?', !obj.ETCposition, !this.ETCpositions[0].occupied, this.state.question.includes('NADH'), (!obj.ETCposition && !this.ETCpositions[0].occupied && this.state.question.includes('NADH')))
          if (!obj.ETCposition && !this.ETCpositions[0].occupied && this.state.question.includes('NADH')) { // is not currently in the ETC and first protein in ETC is free
            obj.x = this.ETCpositions[0].x;
            obj.y = this.ETCpositions[0].y;
            obj.ETCposition = 1;
            this.ETCpositions[0].occupied= true;
            electronObj = obj;
            // console.log('obj ', electronObj)
            this.rightSound.play();
            this.spawnSpecialProtons(this.ETCpositions[0].y); // create proton that will travel through protein
            let drawingToAdd = allDrawings.shift(); // remove first element from first drawings to match NADH number
            if (currentDrawings[currentDrawings.length-1].type !== 'oxygen') {currentDrawings.pop();} // remove last element from fixtures
            if (drawingToAdd) {currentDrawings.push(drawingToAdd);} // replace last elemetn of fixtures with first element of drawings
            // objIndex= draggableArray.indexOf(obj);
          } else if (this.state.question.includes('FADH') && !obj.ETCposition && !this.ETCpositions[1].occupied) {
            obj.x = this.ETCpositions[1].x;
            obj.y = this.ETCpositions[1].y;
            obj.ETCposition = 2;
            this.ETCpositions[1].occupied= true;
            electronObj = obj;
            this.rightSound.play();
            let drawingToAdd = allDrawings.shift(); // remove first element from first drawings 
            if (currentDrawings[currentDrawings.length-1].type !== 'oxygen') {currentDrawings.pop();} // remove last element from fixtures
            if (drawingToAdd) {currentDrawings.push(drawingToAdd);}// replace last element of fixtures with first element of drawings
            // objIndex= draggableArray.indexOf(obj);
          } else if (obj.ETCposition) { // electron has etc position and next position is open, electron not in final etc position
            currentIndx = obj.ETCposition;
            if (obj.ETCposition <= 5 && !this.ETCpositions[obj.ETCposition].occupied) {
              // move electrons to next position if position is available
              obj.x = this.ETCpositions[currentIndx].x; // etc position is +1 from ETC's array index
              obj.y = this.ETCpositions[currentIndx].y;
              this.ETCpositions[currentIndx-1].occupied= false; // set previous ETC location as vacant
              this.ETCpositions[currentIndx].occupied= true; // set new ETC location as unavailable
              obj.ETCposition += 1; // update electron's position
              this.rightSound.play();
              console.log ('obj moved ', obj)
            }
            if (obj.ETCposition === 1 || obj.ETCposition === 3 || obj.ETCposition === 5) {
            this.spawnSpecialProtons(this.ETCpositions[currentIndx-1].y); // create proton that will travel through protein
              if (obj.ETCposition === 5) {
                removeElectron = true;
              }
            }
          } else if (!obj.ETCposition) { // no ETC position assigned
            obj.isDragging = false;
            obj.x = obj.initialX;
            obj.y = obj.initialY;
            feedback = true;
            this.wrongSound.play();
          } else { // if etc position assigned, return to etc position
            obj.x = this.ETCpositions[obj.ETCposition-1].x;
            obj.y = this.ETCpositions[obj.ETCposition-1].y;
            this.wrongSound.play();
          } 
        }  else {
          if (!obj.ETCposition) { // no ETC position assigned
            console.log('obj etc position ', obj.ETCposition, !obj.ETCposition)
            obj.isDragging = false;
            obj.x = obj.initialX;
            obj.y = obj.initialY;
            this.wrongSound.play();
            feedback = true;
          } else { // if etc position assigned, return to etc position
            obj.x = this.ETCpositions[obj.ETCposition-1].x;
            obj.y = this.ETCpositions[obj.ETCposition-1].y;
            this.wrongSound.play();
          } 
        } 
        obj.isDragging = false;
        // break; // exit loop after first match
      } else if (obj.type === 'oxygen' && obj.isDragging === true) {
        if (obj.x < 500 && obj.x > 440 && obj.y < 350 && obj.y > 220.6 && this.etcHasOxygen <1) {
          obj.x = 448;
          obj.y = 235;
          obj.quantity = 2;
          this.etcHasOxygen = 2;
        } else {
          //   obj.ETCposition = false;
          obj.isDragging = false;
          obj.x = obj.initialX;
          obj.y = obj.initialY;
        }
        obj.isDragging = false;
        // break; // exit loop after first match
      } else if (obj.type === 'electrons' && obj.ETCposition && obj.ETCposition < 5) {
        if (!this.ETCpositions[obj.ETCposition].occupied) {
          // move electrons to next position if position is available
          currentIndx = obj.ETCposition;
          obj.x = this.ETCpositions[currentIndx].x; // etc position is +1 from ETC's array index
          obj.y = this.ETCpositions[currentIndx].y;
          console.log ('ETC positions ', obj.ETCposition, this.ETCpositions, this.ETCpositions[currentIndx], currentIndx, obj)
          this.ETCpositions[currentIndx-1].occupied= false; // set previous ETC location as vacant
          this.ETCpositions[currentIndx].occupied= true; // set new ETC location as unavailable
          obj.ETCposition += 1; // update electron's position
          this.rightSound.play();
        }
        if (obj.ETCposition === 1 || obj.ETCposition === 3 || obj.ETCposition === 5) {
        this.spawnSpecialProtons(this.ETCpositions[obj.ETCposition-1].y); // create proton that will travel through protein
          if (obj.ETCposition === 5) {
            removeElectron = true;
            if (this.etcHasOxygen < 1) {
              incorrectMessage= true;
            } 
          }
        }
      } else if (obj.type === 'electrons' && obj.ETCposition && obj.ETCposition === 5) {
        removeElectron = true;
      }
      obj.isDragging = false;
    } // first for of loop

    // place electron just moved on the end of array
    const electronIndex = draggableArray.findIndex(p => p === electronObj);
    if (electronIndex >= 0) {
      draggableArray.splice(electronIndex,1);
      draggableArray.push(electronObj);
      console.log('etc position ', (electronObj.ETCposition), !(electronObj.ETCposition))
    }

    const newState = { 
      dragok: false,
      options: draggableArray,  // overwrites the changes, carefull!
      fixtures: currentDrawings,
      allDrawings: allDrawings,
      feedback: feedback,
    }

    if (incorrectMessage) {newState.incorrectMessage = 'Drag oxygen into the ETC to remove electrons'};

    this.setState(newState)
    console.log('remove electron? ', removeElectron)
    // remove electrons from array and adjust oxygen quantity
    if (removeElectron && this.etcHasOxygen > 0) {
     // remove those electrons from draggable array and return oxygen to original position after a few seconds
      setTimeout(() => {
        // remove electron currently in last protein of ETC
        let newDraggables = draggableArray.filter(itm => itm.y !== this.ETCpositions[4].y)
        this.ETCpositions[4].occupied= false;
        // create new water molecule
        this.spawnWater();
        // return oxygen to original position if the last oxygen has been removed
        for (let obj of newDraggables) { 
          if (obj.type === 'oxygen' ) {
            if (this.etcHasOxygen === 1) {
              obj.x =obj.initialX;
              obj.y = obj.initialY;
              obj.quantity = 2;
              this.etcHasOxygen = 0;
            } else if (this.etcHasOxygen === 2){
              obj.quantity = 1;
              this.etcHasOxygen = 1;
            } else if (obj.type === 'electrons' && obj.ETCposition && obj.ETCposition <= 5) {
              if (obj.ETCposition < 5 && !this.ETCpositions[obj.ETCposition].occupied) {
                // move electrons to next position if position is available
                obj.x = this.ETCpositions[obj.ETCposition].x; // etc position is +1 from ETC's array index
                obj.y = this.ETCpositions[obj.ETCposition].y;
                this.ETCpositions[obj.ETCposition-1].occupied= false; // set previous ETC location as vacant
                this.ETCpositions[obj.ETCposition].occupied= true; // set new ETC location as unavailable
                obj.ETCposition += 1; // update electron's position
                this.rightSound.play();
              }
              if (obj.ETCposition === 1 || obj.ETCposition === 3 || obj.ETCposition === 5) {
              this.spawnSpecialProtons(this.ETCpositions[obj.ETCposition-1].y); // create proton that will travel through protein
              }
            } 
          }
        }

        if (newDraggables.length === 1) { // this step is done
          let futureState = States[this.state.currentStep];
          futureState.feedback =false;
          futureState.currentStep = this.state.currentStep + 1;
          this.setState(futureState)
        } else {
          this.setState({options: newDraggables,}) // update state after waiting period
        }
    }, 500); // half a second
  }
    
  }

  myDown = (mx, my) => {
    let dragok = false;
    let draggableArray = this.state.options.slice(); // copy state without reference
    // console.log(' the draggables ', draggableArray)
    for (let r of draggableArray) {

      if ((r.type === 'reactants' || r.type === 'nadhE')&& mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
        break; // exit loop after first match
      }
      if ((r.type === 'process' || r.type === 'carbon' || r.type === 'oxygen') && mx > r.x-10 && mx < r.x + r.width && my > r.y-20 && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
        break; // exit loop after first match
      }
      if ((r.type === 'electrons') && mx > r.x-8 && mx < r.x + r.width && my > r.y-8 && my < r.y + r.height) {
        // if yes, set that rects isDragging=true
        dragok = true;
        r.isDragging = true;
        break; // exit loop after first match
      }
    }
    // save the current mouse position
    this.setState({
      options: draggableArray,
      dragok:dragok,
      startX: mx,
      startY: my,
    })
  }

  myUp = () => {
    // clear all the dragging flags
    if (this.state.currentProcess === 'electron transport chain') {
      this.handleETC();
    } else {
      let targetArray = this.state.targets.slice();
      let draggableArray = this.state.options.slice(); // copy state without reference
      for (let obj of draggableArray) {
        if (obj.isDragging === true)  {
          const potentialTargets = targetArray.filter(target=> {
            //return obj.x - 0.5*obj.width <= target.x + target.width && obj.x + 0.5*obj.width >= target.x && obj.y <= target.y + target.height && obj.y >= target.y
            return obj.x < target.maxX && obj.x > target.minX && obj.y < target.maxY && obj.y > target.minY
          });
          if (potentialTargets && potentialTargets.length >= 1) {
            const matchingTargets = potentialTargets.filter(target=> target.name === obj.name);
            if (matchingTargets.length > 0) {
              this.handleMatch(obj);
            } else {
              this.handleMiss();
            } 
          } 
          obj.x = obj.initialX;
          obj.y = obj.initialY;    
          obj.isDragging = false;
          break; // exit loop after first match
        }
        obj.isDragging = false;
      }
      this.setState({
        dragok: false,
        // options: draggableArray,  // overwrites the changes, don't use it
      })
    }
  }

  myMove = (mx, my) => {
    const dx = mx - this.state.startX;
    const dy = my - this.state.startY;
    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    let draggableArray = this.state.options.slice(); // copy state without reference
    for (let r of draggableArray) {
      // if dragging and dragged inside the graph area
      if (r.isDragging) {
        r.x += dx;
        r.y += dy;  
        break; // exit loop after first match         
      }
    }
    // reset the starting mouse position for the next mousemove
    this.setState({
      startX: mx,
      startY: my,
      options: draggableArray,  
    })

  }

  spawnProtons (qty) {
    let protonArray = [];
    const radius = 3;
    const vx= 2;
    const vy= 2;
    for (let i = 0; i < qty; i++) {
      const theX = (this.maxWidth*0.41) + (Math.random()*(this.maxWidth*0.140)); // between 40-55%
      const theY = (this.maxHeight*0.36) + (Math.random()*(this.maxHeight*0.55)); // between 35-91 %
      const angle = Math.random()*2*Math.PI;
      const direction = [Math.cos(angle), Math.sin(angle)];
      protonArray.push({
        x: theX,
        y: theY,
        vx: vx * direction[0],
        vy: vy * direction[1],
        radius: radius,
        color:'red',
        molType: 'proton',
      })
      const anotherX = (this.maxWidth*0.57) + (Math.random()*(this.maxWidth*0.08)); // between 57-65%
      protonArray.push({
        x: anotherX,
        y: theY,
        vx: vx * direction[1],
        vy: vy * direction[0],
        radius: radius,
        color:'red',
        molType: 'special',
      })
    }
    this.setState({protonMolecules: protonArray})
  }

  spawnSpecialProtons (y) {
    // create protons that will move horizontally to cross a specific ETC protein
    let protonArray = [];
    protonArray.push({
      x: 350,
      y: y,
      vx: 3,
      vy: 0,
      radius: 3,
      color:'red',
      molType: 'special',
    })
    this.setState(prevState => ({ 
      protonMolecules: prevState.protonMolecules.concat(protonArray),
    }));
  }

  spawnWater () {
    let waterMol = [];
    // push oxygen
    waterMol.push({
      x: 447, // ** 448
      y: 235,
      vx: -2,
      vy: 0,
      radius: 8,
      quantity: 1,
      color:'blue',
      molType: 'oxygen',
    })
    // push proton 1
    waterMol.push({
      x: 439,
      y: 226,
      vx: -2,
      vy: 0,
      radius: 3,
      color:'red',
      molType: 'water',
    })
      // push proton 2
      waterMol.push({
        x: 439,
        y: 244,
        vx: -2,
        vy: 0,
        radius: 3,
        color:'red',
        molType: 'water',
      })
    this.setState(prevState => ({ 
      protonMolecules: prevState.protonMolecules.concat(waterMol),
    }));
  }

  moveMolecules (moleculeArray) {
    let ATPCount = 0;
    for (let i= 0; i< moleculeArray.length; i++) {
      let futureX = moleculeArray[i].x + moleculeArray[i].vx;
      let futureY = moleculeArray[i].y + moleculeArray[i].vy;
      const yCurrentDistance = Math.min(Math.abs(moleculeArray[i].y-(this.maxHeight*0.355)), Math.abs(moleculeArray[i].y-(this.maxHeight*0.91)))
      const yFutureDistance = Math.min(Math.abs(futureY-(this.maxHeight*0.355)), Math.abs(futureY-(this.maxHeight*0.91)))
      if ((yCurrentDistance > yFutureDistance) && ((futureY + moleculeArray[i].radius) >= (this.maxHeight*0.91) || // lower than bottom border OR
      (futureY - moleculeArray[i].radius) <= (this.maxHeight*0.355))) { // higher than top water edge
        moleculeArray[i].vy *= -1;
        futureY = moleculeArray[i].y + moleculeArray[i].vy; // update future y
      }
      if (moleculeArray[i].molType === 'special') { // for special protons, use intermembrane space as boundary 
        if (moleculeArray[i].x < this.maxWidth*0.55 && futureX >= this.maxWidth*0.55) {
          // as soon as a proton crosses the membrane, give it a random direction 
          const angle =  Math.random()*2*Math.PI; // Math.random()> 0.5 ? (1.5 + Math.random())*Math.PI : Math.PI/2; // random angles between 270 & 90 degrees
          const direction = [Math.cos(angle), Math.sin(angle)];
          moleculeArray[i].vx = 2 * direction[0]; // velocity = 2
          moleculeArray[i].vy = 2* direction[1]; // only vx was assigned at molecule creation
          futureX = moleculeArray[i].x + Math.abs(moleculeArray[i].vx); // update future x, only positive vx
          futureY = moleculeArray[i].y + moleculeArray[i].vy; // update future y
        }
        if (moleculeArray[i].vx > 0 && (futureX + moleculeArray[i].radius) >= (this.maxWidth*0.665)) { // right of right border
              moleculeArray[i].vx *= -1;
              futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
        } 
        if (moleculeArray[i].vx < 0 && (futureX - moleculeArray[i].radius) <= (this.maxWidth*0.56)) {  // left of left border OR 
          if (this.state.chemiosmosis === true && futureY < this.maxHeight*0.485 && futureY > this.maxHeight*0.445) {
            this.rightSound.play();
            ATPCount += 1;
            moleculeArray[i].molType = 'specialB';
            moleculeArray[i].x = this.maxWidth*0.540
            if (i%2 === 0) {
              // send more protons into the intermemb space every other time
              this.spawnSpecialProtons(this.ETCpositions[0].y);
            }
          } else {
            moleculeArray[i].vx *= -1;
            futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
          }
        }
      } else if (moleculeArray[i].molType === 'specialB') {
        moleculeArray[i].vx = -2;
        moleculeArray[i].vy = 0;
      } else {
        const xCurrentDistance = Math.min(Math.abs(moleculeArray[i].x-(this.maxWidth*0.405)), Math.abs(moleculeArray[i].x-(this.maxWidth*0.545))); // distance between molecule center & membrane center
        const xFutureDistance = Math.min(Math.abs(futureX-(this.maxWidth*0.405)), Math.abs(futureX-(this.maxWidth*0.545))); // distance between molecule center & membrane center
        if ((xCurrentDistance > xFutureDistance) && ((futureX - moleculeArray[i].radius) <= (this.maxWidth*0.405) || // left of left border OR 
            (futureX + moleculeArray[i].radius) >= (this.maxWidth*0.545))) { // right of right border
              moleculeArray[i].vx *= -1;
              futureX = moleculeArray[i].x + moleculeArray[i].vx; // update future x
        } 
        if ((moleculeArray[i].molType === 'water' || moleculeArray[i].molType === 'oxygen')&& futureX <= this.maxWidth*0.415 + moleculeArray[i].radius) {
          // remove water molecule from array
          moleculeArray.splice(i, 1); 
          continue;
        }
      }

      moleculeArray[i].x += moleculeArray[i].vx;
      moleculeArray[i].y += moleculeArray[i].vy;
    }
    if (this.state.chemiosmosis === true) {
      const totalCount = this.state.ATPCount + ATPCount > 32 ? 32 : this.state.ATPCount + ATPCount
      this.setState({ 
        ATPCount: totalCount }, ()=> {
        this.checkIfWon();
      });
      
    }
    return moleculeArray
  }

  render() {
    //style={{height:'3vh'}}
    return (
      <div className="activity-container">   
        <div className='d-none d-md-block d-lg-block p-4'>
          {!this.state.feedback && <h1 className='my-2'>{this.state.question}</h1>}
          {this.state.feedback && <h1 className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</h1>}
        </div>
        <div className='d-block d-sm-block d-md-none d-lg-none'>
          {!this.state.feedback && <p className='my-2'>{this.state.question}</p>}
          {this.state.feedback && <p className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</p>}
        </div>
        <div className='col-lg-10 col-md-12 justify-content-center'>
          <Canvas 
              angle={this.state.angle} 
              setCanvasSize={this.setCanvasSize}
              options={this.state.options}
              fixtures= {this.state.fixtures}
              myDown={this.myDown}
              myUp={this.myUp}
              myMove={this.myMove}
              dragok={this.state.dragok}
              inCellDrag={this.state.inCellDrag}
              ATPCount={this.state.ATPCount}
              missedSteps={this.state.missedSteps}
              oxygen={this.state.oxygen}
              protons={this.state.protons}
              protonMolecules={this.state.protonMolecules}
              chemiosmosis={this.state.chemiosmosis}
              drawCell= {this.state.drawCell}
            />
        </div>
      </div>
      )
    }
  }
  
  export default Animation
