import React, { Component } from 'react';
import Canvas from './Canvas';
import {stateOptions} from './geneExpressionVariables';


class GeneExpression extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      question: "Welcome to Gene Expression Activity",
      fixtures:[],
      futureFixtures: [],
      targets: [],
      draggables: [],
      movables: [],
      missedSteps: 0,
      loopDNA: false,
      level: 1,
      animation: false,
    }
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.maxLevel = 14;
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
    this.colors = ['#ffd4e5', '#d4ffea', '#eecbff', '#feffa3', '#dbdcff'];
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
    this.setState(stateOptions[0])
  }

  updateAnimationState() {
    if (this.state.animation === true) {
      this.setState(prevState => ({ 
        movables: this.moveMolecules(prevState.movables),
        }));
    }
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  checkIfWon () {
    if (this.state.level === this.maxLevel) {
      if (this.state.missedSteps === 0) {
        this.props.postAttempt();
      } else { 
        alert(`You had ${this.state.missedSteps} misses. \nTry again so you can get closer to the minimum number of steps!`);
        window.location.reload();
      }
    } else {
      const newState = stateOptions[this.state.level];
      newState.level = this.state.level + 1;
      this.setState(newState);
    }
  }

  handleMatch (name) {
    // remove hit target(s) from target list
    const currentFixtures = this.state.fixtures.slice() ;
    const newAnswers = this.state.targets.filter(item=> item.name !== name);
    const newDraggables = this.state.draggables.filter(item=> item.name !== name);
    // find and add new fixtures to fixture list
    const newDrawings = this.state.futureFixtures.filter(item=> item.name === name);
    const newState = {
      fixtures: currentFixtures.concat(newDrawings),
      draggables: newDraggables,
      targets: newAnswers,
    };
    if (name === 'activator') { newState.loopDNA = true};
    if (!newAnswers || newAnswers.length < 1 ) { // || !newDrawings || newDrawings.length < 1
      this.setState(newState);
      setTimeout(() => {
        this.checkIfWon(); // correct count may not have updated
      }, 500);
    } else {
      this.setState(newState);
    }
    this.rightSound.play();
  }

  handleMiss () {
    this.setState({
      missedSteps: this.state.missedSteps + 1,
      feedback: true,
    });
    this.wrongSound.play();
  }

  // ************     handle animation  ************ 

  moveMolecules(movablesArray) {
    // const len  = movablesArray.length;
    for (let item of movablesArray) {
      switch (item.name) {
        case 'polymerase':
          if (item.x < 650) { // (item.x < 800)
            if (item.x < 500 && item.x + item.vx >= 500 ) { // polymerase reached 
              const RNA = {
                type: 'rna',
                name: 'rna',
                fromX: 500,
                fromY: 340,
                toX: 500,
                toY: 340,
                vx: item.vx, // same vx as polymerase
                vy: 1.5,
              }
              movablesArray.unshift(RNA); // add RNA into movable array
            }
            item.x += item.vx; // move at a speed of 2 on the x axis
          } else {
            this.setState({animation: false})
            this.checkIfWon(); // move to next level
          }
          break; 
        
        case 'rna' :
          if (item.toX < 800) {
            item.toX += item.vx; 
            item.fromY -= item.vy;
            if (item.x%10 === 0) {
              // movablesArray.splice( len - 3, 1) // remove a moving nucleotide
            }
          }
          break;
        case 'ribosome':
          if (item.x < 750) { // ribosome moves from 450 - 750, breakpoints: 550, 650
            if (item.x < 600 && item.x + item.vx >= 600) {
              movablesArray.pop(); // remove polymerase from movable array
            }
            if (item.x%10 === 0 && item.x !== 550 && item.x !== 650 && item.x !== 552 && item.x !== 652 ) {
              // movablesArray.splice( len - 3, 1) // remove a moving aminoacid
              const y = item.x%20 === 0 ? item.y -2 : item.y + 2;
              const aminoacid = {
                type: 'aminoacid',
                x: item.x + 40,
                y: y -8,
                name: 'aminoacid',
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
              }
              movablesArray.unshift(aminoacid) // add new aminoacid in peptide to beginning of array
              // console.log('new amino acid', movablesArray)
            }
            if ((item.x < 550 && item.x + item.vx >= 550) || (item.x < 650 && item.x + item.vx >= 650) || (item.x < 750 && item.x + item.vx >= 750)) {
              let name = 'Peptide 1';
              if (item.x > 600 && item.x < 700) { name = 'Peptide 2'}
              if (item.x > 700) { name = 'Peptide 3'}
              const label = {
                type: 'text',
                x: item.x*0.75 + 200,
                y: item.x * 0.5 - 190,
                text: name
              }
              movablesArray.unshift(label)
            }
            
            item.x += item.vx; // move at a speed of 2 on the x axis
          } else {
            this.setState({animation: false})
            // console.log('movables' , movablesArray)
            this.checkIfWon(); // move to next level
          }
          break;
        case 'monomer':
          if (item.x + item.vx > 850 || item.x + item.vx < 7) { item.vx *= -1;}
          if (item.y + item.vy > 320 || item.y + item.vy < 60) { item.vy *= -1;}
          item.x += item.vx;
          item.y += item.vy;
          break;
        default: 
          break; 
      }
    }
    return movablesArray
  }

  // ************     handle drag events  ************

  myUp = () => {
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    let targetArray = this.state.targets.slice();
    for (let obj of draggableArray) {
      if (obj.isDragging === true)  {
        if (obj.x < 800) { // only do something if object was dragged inside diagram
          const potentialTargets = targetArray.filter(target=> target.name === obj.name);
          // console.log('potential targets ', potentialTargets)
          // console.log('same location? ', (obj.x - obj.width <= potentialTargets[0].x + potentialTargets[0].width && obj.x + obj.width >= potentialTargets[0].x - potentialTargets[0].width && obj.y - obj.height <= potentialTargets[0].y + potentialTargets[0].height && obj.y + obj.height >= potentialTargets[0].y - potentialTargets[0].height))
          if (potentialTargets && potentialTargets.length >= 1) {
            const matchingTargets = potentialTargets.filter(target=> {
              //return obj.x - 0.5*obj.width <= target.x + target.width && obj.x + 0.5*obj.width >= target.x && obj.y <= target.y + target.height && obj.y >= target.y
              return obj.x - obj.width <= target.x + target.width && obj.x + obj.width >= target.x - target.width && obj.y - obj.height <= target.y + target.height && obj.y + obj.height >= target.y - target.height
            });
            // console.log('matching targets ', matchingTargets)
            if (matchingTargets.length < 1) {
              this.handleMiss();
            } else {
            this.handleMatch(obj.name);
            }
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
      // options: draggableArray,  // overwrites the changes, don't use it or use callback to handle match or handle miss
    })
  }

  myDown = (mx, my) => {
    let dragok = false;
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    // console.log(' the draggables ', draggableArray)
    for (let r of draggableArray) {
      let y = r.y;
      if (r.type === 'text') { y = r.y - 20} // offset the start of text
      if ( mx > r.x && mx < r.x + r.width && my > y && my < y + r.height) {
          // if yes, set that rects isDragging=true
          dragok = true;
          r.isDragging = true;
          break; // exit loop after first match
        }
    }
    // save the current mouse position
    this.setState({
      draggables: draggableArray,
      dragok:dragok,
      startX: mx,
      startY: my,
    })
  }


  myMove = (mx, my) => {
    const dx = mx - this.state.startX;
    const dy = my - this.state.startY;
    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    let draggableArray = this.state.draggables.slice(); // copy state without reference
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
      draggables: draggableArray,  
    })
  }

  render(){
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
            <Canvas 
              dragok={this.state.dragok}
              myDown={this.myDown}
              myUp={this.myUp}
              myMove={this.myMove}
              drawings={this.state.draggables.concat(this.state.fixtures).concat(this.state.movables)}
              loopDNA = {this.state.loopDNA}
            />
          </div>
    )
  }

}

export default GeneExpression