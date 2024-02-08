import React, { Component } from 'react';
import Canvas from './Canvas';
import '../lockLandscape.css'

class DNAreplication2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      dragok:false,
    }
    
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
  }

  componentDidMount () {
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
      <div>
        <Canvas 
          dragok={this.state.dragok}
          myDown={this.myDown}
          myUp={this.myUp}
          myMove={this.myMove}
          />
      </div>
    )
    
  }
    
}

export default DNAreplication2;