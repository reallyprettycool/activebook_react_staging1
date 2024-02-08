import React, { Component } from 'react';
import Canvas from './Canvas';
import ProgressBar from '../ProgressBar';
import {stateOptions} from './meiosisVariables';
import {States} from '../CellCyle/cellCycleVariables';



class Meiosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dragok: false,
      fixtures:[],
      futureFixtures: [],
      targets: [],
      draggables: [],
      question: "Welcome to Meiosis activity",
      correctCount: 0,
      level: 1,
      maxCount: 5,
    }
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
    this.maxLevel = 5;
  }

  componentDidMount() {
    if (this.props.activity === 'CellCycle') {
      this.setState(States[0])
    } else { // Meiosis activity
      this.setState(stateOptions[0])
    }
  }

  setCanvasSize = (height, width) => {
    this.maxHeight= height;
    this.maxWidth= width;
  }

  checkIfWon () {
    // console.log( 'correct count ', this.state.correctCount, 'max ', this.state.maxCount)
    if (this.state.correctCount >= this.state.maxCount) {
      if (this.state.level === this.maxLevel) {
        this.props.postAttempt();
      } else {
        this.setState({
          level: this.state.level + 1,
          correctCount: 0,
        }, () => { 
          this.pickQuestion(); 
        });
      }
    } else {
      this.pickQuestion();
    }
  }

  pickQuestion () {
    if (this.props.activity === 'CellCycle') {
      switch(this.state.level) {
        case 1:
          this.setState(States[0]) // this.setState(stateOptions[0])
          break;
        case 2:
          this.setState(States[Math.floor(Math.random()*3)+1]) // this.setState(stateOptions[Math.floor(Math.random()*5)+1])
          break;
        case 3:
          this.setState(States[Math.floor(Math.random()*4)+5]) //this.setState(stateOptions[Math.floor(Math.random()*5)+6])
          break;
        case 4:
          this.setState(States[Math.floor(Math.random()*4)+9]) //this.setState(stateOptions[Math.floor(Math.random()*5)+11])
          break;
        case 5:
        this.setState(States[13]) // this.setState(stateOptions[16])
          break;
        default:
          this.setState(States[0])
          break;
      }
    } else { // mitosis activity
      switch(this.state.level) {
        case 1:
          this.setState(stateOptions[0])
          break;
        case 2:
          this.setState(stateOptions[Math.floor(Math.random()*5)+1])
          break;
        case 3:
          this.setState(stateOptions[Math.floor(Math.random()*5)+6])
          break;
        case 4:
          this.setState(stateOptions[Math.floor(Math.random()*5)+11])
          break;
        case 5:
          this.setState(stateOptions[16])
          break;
        default:
          this.setState(stateOptions[0])
          break;
      }
    }
  }

  handleMatch (name) {
    // remove hit target(s) from target list
    const currentFixtures = this.state.fixtures.slice() ;
    const newAnswers = this.state.targets.filter(item=> item.name !== name);
    // console.log('answers left ', newAnswers)
    // find and add new fixtures to fixture list
    const newDrawings = this.state.futureFixtures.filter(item=> item.name === name);
    if (!newAnswers || newAnswers.length < 1 ) { // || !newDrawings || newDrawings.length < 1
      this.setState({
        correctCount: this.state.correctCount + 1,
        fixtures: currentFixtures.concat(newDrawings),
      });
      setTimeout(() => {
        this.checkIfWon(); // correct count may not have updated
      }, 500);
    } else {
      this.setState({
        targets: newAnswers,
        fixtures: currentFixtures.concat(newDrawings),
        correctCount: this.state.correctCount + 1,
      });
    }
    this.rightSound.play();
  }

  handleMiss () {
    this.setState({correctCount: 0});
    this.wrongSound.play();
  }

  myUp = () => {
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    let targetArray = this.state.targets.slice();
    for (let obj of draggableArray) {
      if (obj.isDragging === true)  {
        if (obj.x < 680) { // only do something if object was dragged inside diagram
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
      if ((r.type === 'chromosome') && mx > (r.x - r.width*0.5) && mx < r.x + r.width*0.5 && my > r.y - r.height*0.5 && my < r.y + r.height*0.5) {
          // if yes, set that rects isDragging=true
          dragok = true;
          r.isDragging = true;
          break; // exit loop after first match
        }
        // console.log('my down', mx, my, r.x, r.y, r.width , r.height, (mx > r.x-10 && mx < r.x + r.width + 10 && my > r.y-10 && my < r.y + r.height + 10))
        else if ((r.type === 'phases') && mx  > r.x && mx < r.x + r.width + 10 && my > r.y-10 && my < r.y + r.height + 10) {
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

  render() {
    const maxCount = Math.max(this.state.targets.length + this.state.correctCount, this.state.maxCount);
    return (
      <div className="activity-container">  
      <div className= 'row'>
        <div className='col-9'>
          <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/maxCount))} />
        </div>
        <div className='col-3'>
          <span>Level {this.state.level} of {this.maxLevel}</span>
        </div>
      </div>
      <div className='d-none d-md-block d-lg-block p-4'>
        {!this.state.feedback && <h1 className='my-2'>{this.state.question}</h1>}
        {this.state.feedback && <h1 className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</h1>}
      </div>
      <div className='d-block d-sm-block d-md-none d-lg-none'>
        {!this.state.feedback && <p className='my-2'>{this.state.question}</p>}
        {this.state.feedback && <p className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</p>}
      </div> 

      <div className='row'>
        <Canvas 
        dragok={this.state.dragok}
        myDown={this.myDown}
        myUp={this.myUp}
        myMove={this.myMove}
        setCanvasSize={this.setCanvasSize}
        fixtures={this.state.targets.concat(this.state.fixtures)}
        draggables={this.state.draggables}
        level={this.state.level}
        />
        </div>
        </div>
    )
  }
}

export default Meiosis