import React, { Component } from 'react';
import Canvas from './Canvas';
import ProgressBar from '../ProgressBar';
import { getRandomScenario} from './recombinationVariables';

class Recombination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1, // 1
      trial: 0,
      feedback: false,
      fixtures:[],
      targets: [],
      draggables: [],
      correctCount:0,
      mark: 0,
      goal: 50,
      recombinationFreq: 50,
      question: 'Welcome to Crossing over & Recombination acitivity',
      maxCount: 12,
    }
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
    this.maxLevel = 3;
    this.stateOptions = {};
    // this.dragX = 0;
    // this.getRandomScenario;
  }

  componentDidMount() {
    const newState = getRandomScenario(this.state.level, this.state.trial);
    this.setState(newState);
    // console.log('new state', newState)
  }

  checkIfWon () {
    if (this.state.level === this.maxLevel && this.state.correctCount >= this.state.maxCount) {
      this.props.postAttempt();
    } else if (this.state.correctCount >= this.state.maxCount) {
      const newState = getRandomScenario(this.state.level+1, 0);
      newState.level=this.state.level+1;
      newState.trial=0;
      newState.correctCount=0;
      this.setState(newState, () => {
        if (this.state.level === 3) {
          this.calculateRecombination(639);
        }
      });
    } else {
      const newState = getRandomScenario(this.state.level, this.state.trial);
      newState.trial=this.state.trial+1;
      this.setState(newState, () => {
        if (this.state.level === 3) {
          this.calculateRecombination(639);
        }
      });
    }
  }

  handleMatch (obj) {
    this.rightSound.play();
    obj.x = obj.finalX;
    obj.y = obj.finalY;
    this.setState(prevState => ({ 
      fixtures: prevState.fixtures.concat([obj]),
      draggables: prevState.draggables.filter(item=> item.id !== obj.id ),
      correctCount: prevState.correctCount + 1,
    }),
    ()=> {
      // console.log('the fixtures ', this.state.fixtures, 'the draggables ', this.state.draggables)
      if (this.state.draggables.length === 0 ) {
        this.checkIfWon(); 
      }
    }); 
  }

  handleMiss () {
    this.setState({
      correctCount: 0,
      feedback: true,
    });
    this.wrongSound.play();
  }

  calculateRecombination (x) {
    let recombinationFrq = 50;
    let distance = Math.abs(this.state.mark-x);
    if (distance < 220 ) {
      recombinationFrq = Math.round(50*distance/220);
    } 
    this.setState({recombinationFreq:recombinationFrq})
  }
  myUp = () => {
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    if (this.state.level <= 2) {
      let targetArray = this.state.targets.slice();
      for (let obj of draggableArray) {
        if (obj.isDragging === true)  {
          if (obj.y < 360 ) {
            const potentialTargets = targetArray.filter(target=> target.name === obj.name);
            let y = obj.y;
            let x = obj.x;
            let width;
            let height;
            if (obj.type.includes('cell')) { y = obj.y - obj.r; x = obj.x - obj.r; width= obj.r*2; height=obj.r*2} // offset by cell radius
              
            const matchingTargets = potentialTargets.filter(target=> {
              return x <= target.x + target.width && x + width >= target.x && y <= target.y + target.height && y + height >= target.y
            });
            if (matchingTargets.length < 1) {
              this.handleMiss();
              obj.x = obj.initialX;
              obj.y = obj.initialY; 
            } else {
              this.handleMatch(obj);
            }    
          } else {
            obj.x = obj.initialX;
            obj.y = obj.initialY;    
          }
          obj.isDragging = false;
          break; // exit loop after first match
        }
        obj.isDragging = false;
      }
    } else {
      draggableArray[0].isDragging = false;
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
      let width;
      let height;
      if (r.type.includes('cell')) { y = r.y - r.r; x = r.x - r.r; width= r.r*2; height=r.r*2} // offset by cell radius
      if (r.type.includes('mark')) { height= r.height; width= r.width*2; x= r.x - r.width} // offset by cell radius
      if ( mx > x && mx < x + width && my >= y && my <= y + height) {
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
    // let dragX
    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    let draggableArray = this.state.draggables.slice(); // copy state without reference
    for (let r of draggableArray) {
      // if dragging and dragged inside the graph area
      if (r.isDragging) {
        r.x += dx;
        r.y += dy;  
        if (r.type === 'mark') {
          r.y=r.initialY;
          if (r.x >= 640 && r.x < 650)  { r.x = 639
          } else if (r.x >= 650 && r.x <= 660)  { r.x = 661
          } else if (r.x < 426.69 ) { r.x = 426 
          } else if (r.x > 873) { r.x = 873}
          // this.dragX = r.x;
          this.calculateRecombination(r.x);
        }
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

  checkPositions (option) { // click function
    if (option === 'not possible') {
      if (this.state.goal > 50) {
        this.rightSound.play(); 
        this.setState(prevState => ({ 
          correctCount: prevState.correctCount + 1,
        }),
        ()=> { this.checkIfWon(); }); 
      } else {
        this.handleMiss();
      }
    } else if (this.state.goal === this.state.recombinationFreq) {
      this.rightSound.play(); 
      this.setState(prevState => ({ 
        correctCount: prevState.correctCount + 1,
      }),
      ()=> { this.checkIfWon(); });
    } else {
      this.handleMiss();
    }
  }

  // checkPossible () { // click function
  //   if (this.state.goal > 50) {
  //     this.rightSound.play(); 
  //     this.setState(prevState => ({ 
  //       correctCount: prevState.correctCount + 1,
  //     }),
  //     ()=> { this.checkIfWon(); }); 
  //   } else {
  //     this.handleMiss();
  //   }
  // }

  render() {
    // console.log(Math.floor(this.state.correctCount*(100/(Math.max(this.state.maxCount,this.state.draggables.length)))))
    return (
      <div className="activity-container">  
      <div className= 'row'>
        <div className='col-9'>
          <ProgressBar percentage={Math.floor(this.state.correctCount*(100/(Math.max(this.state.maxCount,this.state.draggables.length))))} />
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
        <div className='col-7'>
        <Canvas 
          dragok={this.state.dragok}
          myDown={this.myDown}
          myUp={this.myUp}
          myMove={this.myMove}
          drawings={this.state.fixtures.concat(this.state.draggables)} //.concat(this.state.draggables)
          recombinationFreq={this.state.recombinationFreq}
        />
        </div>
        <div className='col-5 d-inline-flex flex-column'>
          <div className='d-none d-md-block d-lg-block' style={{height:'5vh'}}></div>
            {this.state.level === 3 && <h6 className='pt-2'>When done dragging, click a button bellow: </h6> } 
          <div className='d-inline-flex justify-content-center'>
            {this.state.level === 3 && <button onClick={e => this.checkPositions('check')} className='btn btn-primary mt-1 mx-1'>Check <span class="fa fa-check"></span></button>}
          </div>
          <div className='d-inline-flex justify-content-center'>
             {this.state.level === 3 && <button onClick={e => this.checkPositions('not possible')} className='btn btn-primary mt-1 mx-1'>Not possible <span class="fa fa-ban"></span></button>}
          </div>
          {this.state.level === 3 && <p className='pt-2'>Click 'Not possible' if it is impossible to achieve the recombination frequency requested</p> } 
        </div>
      </div>
      </div>
    )
  }

}

export default Recombination