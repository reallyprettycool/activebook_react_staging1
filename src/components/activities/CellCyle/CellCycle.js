// import React, { Component } from 'react';
// import Canvas from './Canvas';
// import ProgressBar from '../ProgressBar';
// import {getRandomScenario} from './cellCycleVariables';



// class CellCycle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       question: 'Welcome to cell cycle activity',
//       feedback: false,
//       dragok: false,
//       draggables: [],
//       fixtures: [],
//       targets: [],
//       futureFixtures: [],
//       startX: null,
//       startY: null,
//       misses: 0,
//       correctCount: 0,
//       level: 1,
//     }
//     this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
//     this.rightSound = new Audio('/audio/correct_sound.m4a'); 
//     this.maxLevel= 4;
//   }

//   componentDidMount() {
//     const newState = getRandomScenario(this.state.level)
//     this.setState(newState)
//   }

//   setCanvasSize = (height, width) => {
//     this.maxHeight= height;
//     this.maxWidth= width;
//   }

//   pickQuestion () {
//     // if reached max correct answers for this level, move up to next level
//     console.log ('correct count ',this.state.correctCount ,this.state.maxCount -1)
//     if (this.state.correctCount >= this.state.maxCount -1) {
//       console.log('picking question option 1')
//       const newState = getRandomScenario(this.state.level+1)
//       newState.level = this.state.level+1;
//       newState.correctCount = 0;
//       newState.misses = 0;
//       newState.startX = null;
//       newState.startY = null;
//       newState.dragok = false;
//       this.setState(newState)
//     } else { // otherwise, keep working on current level
//       console.log('picking question option 2')
//       const newState = getRandomScenario(this.state.level)
//       console.log('new state targets ', newState.targets, 'new state ', newState)
//       newState.correctCount = this.state.correctCount + 1;
//       newState.misses = 0;
//       newState.startX = null;
//       newState.startY = null;
//       newState.dragok = false;
//       this.setState(newState)
//       console.log('new state targets ', newState.targets, 'new state ', newState)
//     }
//   }

//   handleMatch (name) {
//     this.rightSound.play();
//     console.log(this.state.correctCount, this.state.maxCount, this.state.targets.length)
//     if (this.state.targets.length > 1) {
//       console.log('option 1')
//       // const index = answerArray.indexOf(target);
//       // if (index > -1) { answerArray.splice(index, 1)}; // remove target from array if present.
//       const newAnswers = this.state.targets.filter(item=> item.name !== name);
//       const newDrawings = this.state.futureFixtures.filter(item=> item.name === name);
//       this.setState(prevState => ({
//         targets: newAnswers,
//         fixtures: prevState.fixtures.concat(newDrawings),
//         correctCount: prevState.correctCount + 1,
//         misses: 0,
//       }));
//     } else if (this.state.targets.length === 1 && this.state.targets[0].name.length > 1) {
//       console.log('option 2')
//       const answerArray = this.state.targets.slice(); // copy state without reference
//       // console.log('length ',target.name.length, (target.name.length > 1))
//       // remove target from array
//      const newAnswers = answerArray[0].name.filter(item=> item !== name);
//      answerArray[0].name = newAnswers;
//     //  console.log('new answers ', newAnswers, 'target:', target,'target name:',target.name.length, target.name)
//      // add drawing of target to fixtures 
//      const newDrawings = this.state.futureFixtures.filter(item=> item.name === name);
//      const allDrawings = this.state.fixtures.concat(newDrawings)
//      const newCount = this.state.correctCount + 1;
//      this.setState({
//       targets: answerArray,
//       fixtures: allDrawings,
//       correctCount: newCount,
//       misses: 0,
//     }, () => { console.log('updated targets' , this.state.targets)}
//     );
//     } else {
//       if (this.state.level === this.maxLevel) {
//         this.props.postAttempt();
//       } else {
//         console.log('option 3')
//         this.pickQuestion();
//         // let newState = {};
//         // if (this.state.correctCount >= this.state.maxCount -1) {
//         //   newState = getRandomScenario(this.state.level+1)
//         //   newState.level = this.state.level+1;
//         //   newState.correctCount = 0;
//         //   newState.misses = 0;
//         //   newState.startX = null;
//         //   newState.startY = null;
//         //   newState.dragok = false;
//         //   this.setState(newState)
//         //   console.log('new targets' , newState.targets)
//         // } else { // otherwise, keep working on current level
//         //   console.log('picking question option 2')
//         //   const newState = getRandomScenario(this.state.level)
//         //   console.log('new state targets ', newState.targets, 'new state ', newState)
//         //   newState.correctCount = this.state.correctCount + 1;
//         //   newState.misses = 0;
//         //   newState.startX = null;
//         //   newState.startY = null;
//         //   newState.dragok = false;
//         //   this.setState(newState)
//         //   console.log('new state targets ', newState.targets, 'new state ', newState)
//         // }
//       }
//     }
//   }

//   handleMiss () {
//     this.wrongSound.play();
//     // console.log('missed ', this.state.misses, (this.state.level > 1 && this.state.misses >=3))
//     const misses = this.state.misses + 1
//     this.setState({ 
//       misses: misses,
//       correctCount: 0,
//     });
//   }

//   myUp = () => {
//     let draggableArray = this.state.draggables.slice(); // copy state without reference
//     let targetArray = this.state.targets.slice();
//     for (let obj of draggableArray) {
//       if (obj.isDragging === true)  {
//         // allow moves only within the graph area
//         // create array with targets and match objects to targets
//         // if (obj.type === 'chromosome') {
//         //   // handle drag events for chromosomes *******
//         // } else {
//           for (let target of targetArray) {
//             if (obj.x - 0.5*obj.width <= target.x + target.width && obj.x + 0.5*obj.width >= target.x && obj.y <= target.y + target.height && obj.y >= target.y) {
//               // most targets only have one name, but cell targets have an array of names
//               console.log ('includes ? ', obj.name, target.name, (target.name.includes(obj.name)) )
//               if (obj.name === target.name || target.name.includes(obj.name)) {
//                 this.handleMatch(obj.name);
//               } else {
//                 this.handleMiss();
//               }
//             }
//           }
//         // }
//         obj.x = obj.initialX;
//         obj.y = obj.initialY;    
//         obj.isDragging = false;
//         break; // exit loop after first match
//       }
//       obj.isDragging = false;
//     }
//     this.setState({
//       dragok: false,
//       // options: draggableArray,  // overwrites the changes, don't use it or use callback to handle match or handle miss
//     })
//   }

//   myDown = (mx, my) => {
//     let dragok = false;
//     let draggableArray = this.state.draggables.slice(); // copy state without reference
//     // console.log(' the draggables ', draggableArray)
//     for (let r of draggableArray) {
//       if ((r.type === 'chromosome') && mx > (r.x - r.width*0.5) && mx < r.x + r.width*0.5 && my > r.y - r.height*0.5 && my < r.y + r.height*0.5) {
//           // if yes, set that rects isDragging=true
//           dragok = true;
//           r.isDragging = true;
//           break; // exit loop after first match
//         }
//         // console.log('my down', mx, my, r.x, r.y, r.width , r.height, (mx > r.x-10 && mx < r.x + r.width + 10 && my > r.y-10 && my < r.y + r.height + 10))
//         else if ((r.type === 'phases') && mx  > r.x && mx < r.x + r.width + 10 && my > r.y-10 && my < r.y + r.height + 10) {
//         // if yes, set that rects isDragging=true
//         dragok = true;
//         r.isDragging = true;
//         break; // exit loop after first match
//       }
//     }
//     // save the current mouse position
//     this.setState({
//       draggables: draggableArray,
//       dragok:dragok,
//       startX: mx,
//       startY: my,
//     })
//   }



//   myMove = (mx, my) => {
//     const dx = mx - this.state.startX;
//     const dy = my - this.state.startY;
//     // move each rect that isDragging 
//     // by the distance the mouse has moved
//     // since the last mousemove
//     let draggableArray = this.state.draggables.slice(); // copy state without reference
//     for (let r of draggableArray) {
//       // if dragging and dragged inside the graph area
//       if (r.isDragging) {
//         r.x += dx;
//         r.y += dy;  
//         break; // exit loop after first match         
//       }
//     }
//     // reset the starting mouse position for the next mousemove
//     this.setState({
//       startX: mx,
//       startY: my,
//       options: draggableArray,  
//     })
//   }

//   render() {
//     return (
//       <div className="activity-container">  
//         <div className= 'row'>
//           <div className='col-9'>
//             <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/this.state.maxCount))} />
//           </div>
//           <div className='col-3'>
//             <span>Level {this.state.level} of {this.maxLevel}</span>
//           </div>
//         </div>
//         <div className='d-none d-md-block d-lg-block p-4'>
//           {!this.state.feedback && <h1 className='my-2'>{this.state.question}</h1>}
//           {this.state.feedback && <h1 className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</h1>}
//         </div>
//         <div className='d-block d-sm-block d-md-none d-lg-none'>
//           {!this.state.feedback && <p className='my-2'>{this.state.question}</p>}
//           {this.state.feedback && <p className='my-2' style={{color: 'blue'}}>{this.state.incorrectMessage}</p>}
//         </div> 

//         <div className='row'>

//           {/* <div className='col-8'> */}
//             <Canvas 
//               dragok={this.state.dragok}
//               myDown={this.myDown}
//               myUp={this.myUp}
//               myMove={this.myMove}
//               setCanvasSize={this.setCanvasSize}
//               fixtures={this.state.targets.concat(this.state.fixtures)}
//               draggables={this.state.draggables}
//               />
//           {/* </div> */}

//           {/* <div className='col-4'>
//           </div> */}

//         </div>
//        </div>
//     )
//   }

// }

// export default CellCycle
