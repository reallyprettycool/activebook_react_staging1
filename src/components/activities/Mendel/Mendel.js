import React, { Component } from 'react';
import Canvas from './Canvas';
import ProgressBar from '../ProgressBar';
import { getRandomScenario} from './mendelVariables';
import { getRandomScenario2} from './mendel2variables';

class Mendel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      level: 0, // 0
      feedback: false,
      question: 'Welcome to Mendel inheritance',
      incorrectMessage: '',
      fixtures:[],
      futureFixtures: [],
      targets: [],
      draggables: [],
      dragok: false,
      stage: 0,
      missedSteps: 0,
    }
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
    this.maxLevel = 7;
    this.stateOptions = {};
    // this.getRandomScenario;
  }

  componentDidMount() {
    if (this.props.activity === 'Mendel1') {this.getRandomScenario = getRandomScenario}
    else {this.getRandomScenario = getRandomScenario2}
    this.checkIfWon();
  }

  checkIfWon () {
    if (this.state.level === this.maxLevel && this.state.stage === 5) {
      if (this.state.missedSteps === 0) {
        this.props.postAttempt();
      } else { 
        // alert(`You had ${this.state.missedSteps} misses. \nTry again so you can get closer to the minimum number of steps! \nYou'll be redirected to level 3`);
        // window.location.reload();
        this.stateOptions = this.getRandomScenario(6+Math.round(Math.random())); // reset to level 6 or 7 (random options)
        let newState = {};
        // newState.level = 3; // reset to level 3
        newState.stage= 1;
        newState.feedback= false;
        newState.incorrectMessage=this.stateOptions.incorrectMessage.stage1
        newState.missedSteps= 0;
        newState.question = this.stateOptions.question.stage1;
        newState.fixtures = this.stateOptions.targets.stage1.concat(this.stateOptions.fixtures.stage1); //.concat(cellsL3)
        newState.targets = this.stateOptions.targets.stage1;
        newState.futureFixtures = this.stateOptions.futureFixtures.stage1;
        newState.draggables = this.stateOptions.draggables.stage1;
        this.setState(newState);
      }
    } else {
      if (this.state.level < 2 || (this.state.level < 3 && this.state.missedSteps > 0)) {
        let newState = {};
        if (this.state.missedSteps === 0) {
          newState = this.getRandomScenario(this.state.level+ 1) // stateOptions[this.state.level];
          newState.level = this.state.level + 1;
          newState.missedSteps= 0;
          this.setState(newState);
        } else {
          newState = this.getRandomScenario(this.state.level) // stateOptions[this.state.level];
          newState.missedSteps= 0;
          this.setState(newState);
        }
      } else {
         if (this.state.stage === 5 && this.state.missedSteps > 0) {
          this.stateOptions = this.getRandomScenario(this.state.level);
          let newState = {};
          newState.stage= 1;
          newState.feedback= false;
          newState.missedSteps = 0;
          newState.incorrectMessage=this.stateOptions.incorrectMessage.stage1
          newState.question = this.stateOptions.question.stage1;
          newState.fixtures = this.stateOptions.targets.stage1.concat(this.stateOptions.fixtures.stage1); //.concat(cellsL3)
          newState.targets = this.stateOptions.targets.stage1;
          newState.futureFixtures = this.stateOptions.futureFixtures.stage1;
          newState.draggables = this.stateOptions.draggables.stage1;
          // console.log('new state ', newState)
          this.setState(newState);
         } else if (this.state.stage === 0 || (this.state.stage === 5 && this.state.missedSteps < 1)) {
          this.stateOptions = this.getRandomScenario(this.state.level+ 1);
          let newState = {};
          newState.level = this.state.level + 1;
          newState.stage= 1;
          newState.feedback= false;
          if (this.state.stage === 0) { newState.missedSteps = 0};
          newState.incorrectMessage=this.stateOptions.incorrectMessage.stage1
          newState.question = this.stateOptions.question.stage1;
          newState.fixtures = this.stateOptions.targets.stage1.concat(this.stateOptions.fixtures.stage1); //.concat(cellsL3)
          newState.targets = this.stateOptions.targets.stage1;
          newState.futureFixtures = this.stateOptions.futureFixtures.stage1;
          newState.draggables = this.stateOptions.draggables.stage1;
          // console.log('new state ', newState)
          this.setState(newState);
          // console.log('initial targets ', newState.targets)
        } else if (this.state.stage === 1) {
          this.setState(prevState => ({ 
            fixtures: this.stateOptions.targets.stage2.concat(prevState.fixtures.concat(this.stateOptions.fixtures.stage2)),
            stage: 2,
            question:  this.stateOptions.question.stage2,
            feedback: false,
            incorrectMessage: this.stateOptions.incorrectMessage.stage2,
            targets: this.stateOptions.targets.stage2,
            futureFixtures: this.stateOptions.futureFixtures.stage2,
          }));
        } else if (this.state.stage === 2) {
          this.setState(prevState => ({ 
            fixtures: this.stateOptions.targets.stage3.concat(prevState.fixtures.concat(this.stateOptions.fixtures.stage3)),
            stage: 3,
            question:  this.stateOptions.question.stage3,
            feedback: false,
            incorrectMessage: this.stateOptions.incorrectMessage.stage3,
            targets: this.stateOptions.targets.stage3,
            futureFixtures: this.stateOptions.futureFixtures.stage3,
            draggables:this.stateOptions.draggables.stage3,
          }));
        } else if (this.state.stage === 3) {
          this.setState(prevState => ({ 
            fixtures: this.stateOptions.targets.stage4.concat(prevState.fixtures.concat(this.stateOptions.fixtures.stage4)),
            stage: 4,
            question:  this.stateOptions.question.stage4,
            feedback: false,
            incorrectMessage: this.stateOptions.incorrectMessage.stage4,
            targets: this.stateOptions.targets.stage4,
            futureFixtures: this.stateOptions.futureFixtures.stage4,
            draggables:this.stateOptions.draggables.stage1,
          }));
        } else if (this.state.stage === 4) {
          this.setState(prevState => ({ 
            fixtures: this.stateOptions.targets.stage3.concat(prevState.fixtures.concat(this.stateOptions.fixtures.stage5)),
            stage: 5,
            question:  this.stateOptions.question.stage5,
            feedback: false,
            incorrectMessage: this.stateOptions.incorrectMessage.stage5,
            targets: this.stateOptions.targets.stage3,
            futureFixtures: this.stateOptions.futureFixtures.stage5,
            draggables:this.stateOptions.draggables.stage3,
          }));
        } 
      }
    }
  }

  handleMatch (obj, target) {
    this.rightSound.play();
    if (this.state.level < 3) {
      this.setState(prevState => ({ 
       fixtures: prevState.fixtures.concat(prevState.futureFixtures.filter(item=> item.text === obj.text )), 
       draggables: prevState.draggables.filter(item=> item.id !== obj.id),
     }),
     ()=> {
       if (this.state.draggables.length === 0 ) {
         this.checkIfWon(); 
       }
     });
    } else {
      this.setState(prevState => ({ 
        fixtures: prevState.fixtures.concat(prevState.futureFixtures.filter(item=> item.name === obj.name && item.x >= target.x && item.x<= target.x + target.width && item.y >= target.y && item.y<= target.y + target.height )),
        targets: prevState.targets.filter(item=> item.x !== target.x || item.y !== target.y || item.name !== target.name ),
      }),
      ()=> {
        // console.log('the fixtures ', this.state.fixtures, 'the targets ', this.state.targets)
        if (this.state.targets.length === 0 ) {
          this.checkIfWon(); 
        }
      }); 
    }
  }

  handleMiss () {
    this.setState({
      missedSteps: this.state.missedSteps + 1,
      feedback: true,
    });
    this.wrongSound.play();
  }

  // ************     handle drag events  ************

  myUp = () => {
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    let targetArray = this.state.targets.slice();
    for (let obj of draggableArray) {
      if (obj.isDragging === true)  {
        if (obj.y >= 280 && this.state.stage === 3) { // for stage 3, add prediction to fixture array
          const locationTargets = targetArray.filter(target=> {
            //return obj.x - 0.5*obj.width <= target.x + target.width && obj.x + 0.5*obj.width >= target.x && obj.y <= target.y + target.height && obj.y >= target.y
            return obj.x <= target.x + target.width && obj.x + obj.width >= target.x && obj.y <= target.y + target.height && obj.y + obj.height >= target.y
          });
          if (locationTargets.length > 0) {
            const newObj =  { 
              x: 700,
              y: 330,
              type: 'text',
              text: obj.text,
            };
           if (obj.name !== locationTargets[0].name) {
             this.handleMiss();
           }
            this.setState(prevState => ({ 
              fixtures: prevState.fixtures.concat([newObj]),
            }),
            ()=> {  this.checkIfWon(); });
          }
        } else if (obj.x < 700 || this.state.stage === 5) { // only do something if object was dragged inside diagram
          const potentialTargets = targetArray.filter(target=> target.name === obj.name);
          // console.log('potential targets ', potentialTargets, 'the object ', obj)
          // console.log('same location? ', (obj.x - obj.width <= potentialTargets[0].x + potentialTargets[0].width && obj.x + obj.width >= potentialTargets[0].x - potentialTargets[0].width && obj.y - obj.height <= potentialTargets[0].y + potentialTargets[0].height && obj.y + obj.height >= potentialTargets[0].y - potentialTargets[0].height))
          if (potentialTargets && potentialTargets.length >= 1) {
            const matchingTargets = potentialTargets.filter(target=> {
              //return obj.x - 0.5*obj.width <= target.x + target.width && obj.x + 0.5*obj.width >= target.x && obj.y <= target.y + target.height && obj.y >= target.y
              return obj.x <= target.x + target.width && obj.x + obj.width >= target.x && obj.y <= target.y + target.height && obj.y + obj.height >= target.y
            });
            // console.log('matching targets ', matchingTargets)
            if (matchingTargets.length < 1) {
              this.handleMiss();
           
            } else {
            this.handleMatch(obj, matchingTargets[0]);
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
      let x = r.x;
      if (r.type.includes('text')) { y = r.y - 20} // offset the start of text
      if (r.type.includes('cell')) { y = r.y - r.r; x = r.x - r.r} // offset by cell radius
      if (r.type.includes('chromosome')) { y = r.y - r.height*0.5; x = r.x - r.width*0.5} // offset by cell radius
      // console.log(r,  mx, r.x, r.x + r.width, my,  y,  y + r.height,( mx > r.x && mx < r.x + r.width && my > y && my < y + r.height))
      if ( mx > x && mx < x + r.width && my >= y && my <= y + r.height) {
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
    return (
      <div className="activity-container">  
      <div className= 'row'>
        <div className='col-9'>
          <ProgressBar percentage={Math.floor(this.state.level*(100/this.maxLevel))} />
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
        {!this.state.feedback && <p className='my-1'>{this.state.question}</p>}
        {this.state.feedback && <p className='my-1' style={{color: 'blue'}}>{this.state.incorrectMessage}</p>}
      </div> 

      <div className='row'>
        <Canvas 
          dragok={this.state.dragok}
          myDown={this.myDown}
          myUp={this.myUp}
          myMove={this.myMove}
          drawings={this.state.fixtures.concat(this.state.draggables)}
          misses = {this.state.missedSteps}
          level = {this.state.level}
        />
        </div>
        </div>
    )
  }

}

export default Mendel