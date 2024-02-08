import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom' ;
import {L1Pairs, L2Pairs, L3Pairs, initialData, instructionList} from './SaturatedUnsaturatedVariables';
import '../lockLandscape.css'
import DragAndDrop from './DragAndDrop';
import ProgressBar from '../ProgressBar';
import Instructions from '../Instructions';


class SaturatedUnsaturated extends Component {
  constructor(props){
    super(props);
    this.state = {
      // redirect:false,
      leftImage: '',
      rightImage: '',
      correctCount: 0,
      maxCount: 5,
      level: 1,
      message: false,
      updateDrag: false,
      whatToShow: 'instructions',
    }
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
  }

  componentDidMount () {
    this.pickCards ()
  }

  pickCards () {
    const flip = Math.round(Math.random()); // get random number 1 or 0
    let thePairs = [];
    if (this.state.level === 1) { thePairs = L1Pairs[Math.floor(Math.random()*L1Pairs.length)]}
    if (this.state.level === 2) { thePairs = L2Pairs[Math.floor(Math.random()*L2Pairs.length)]}
    if (this.state.level === 3) { thePairs = L3Pairs[Math.floor(Math.random()*L3Pairs.length)]}
    console.log('level: ', this.state.level)
    if (flip >0.5) {
      this.setState({
        leftImage: thePairs.saturated,
        rightImage: thePairs.unsaturated,
        leftChoice: 'Saturated fat',
        rightChoice: 'Unsaturated fat',
      }) 
    } else {
      this.setState({
        leftImage: thePairs.unsaturated,
        rightImage: thePairs.saturated,
        leftChoice: 'Unsaturated fat',
        rightChoice: 'Saturated fat',
      }) 
    }
    
  }

  checkMatch (leftChoice, rightChoice) {
    if (leftChoice === this.state.leftChoice && rightChoice === this.state.rightChoice) {
      this.setState({correctCount: this.state.correctCount+1,}, () => {
        this.rightSound.play()
        if (this.state.correctCount === this.state.maxCount && this.state.level < 3) {
          alert(`You passed level ${this.state.level}! \n It's time to master level ${this.state.level+1}`);
          this.setState({ 
            correctCount: 0,
            level: this.state.level+1, 
            updateDrag:true,
          }, ()=> this.pickCards())
        } else if (this.state.correctCount === this.state.maxCount && this.state.level === 3) {
            this.props.postAttempt()
        } else {
          this.setState({ 
            // correctCount: this.state.correctCount+1,
            updateDrag:true,
          })
          this.pickCards()
        }
      })
    } else {
      this.wrongSound.play()
      this.setState({ 
        correctCount: 0,
        message: 'Drag each fat type to match the images below',
      })
    }
    console.log('Parend update drag? ', this.state.updateDrag)
  }

  setUpdateDrag = () => {
    this.setState({updateDrag:false })
  }

  afterDrag = (leftChoice, rightChoice) => {
    if (leftChoice.length < 1 && rightChoice.length < 1) {
      this.setState({message: 'Drag each fat type to match the images below'})
    }
    if (leftChoice.length < 1) {
      this.setState({message: 'Select the fat type for the image on the left'})
    }
    if (rightChoice.length < 1) {
      this.setState({message: 'Select the fat type for the image on the right'})
    } 
    if (rightChoice.length === 1 && leftChoice.length === 1) {
      this.checkMatch (leftChoice[0].content, rightChoice[0].content);
    }
    
  };

  toggleForms= (showMe = 'instructions') => {
    // 'instructions' 'video' 'game'
    if (showMe === 'game') {
      this.setState({
        whatToShow: showMe,
        message: 'Drag each fat type to match the images below',
      })
    } else {
      this.setState({whatToShow: showMe})
    }
  }

  showImages () {
      return (
        <div className='row'>
          <div className='col-6'>
            <img className="img-fluid" src={`/images/SaturatedUnsaturated/${this.state.leftImage}`} alt='type of fat' />
          </div>

          <div className='col-6'>
            <img className="img-fluid" src={`/images/SaturatedUnsaturated/${this.state.rightImage}`} alt='type of fat' />
          </div>
        </div>
      )
  }

  render(){
    
    return (
      <div className="container-fluid activity-container">
        
        <div className='mh-20'>
          {this.state.whatToShow === 'game' && <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/this.state.maxCount))} />}
          
          {this.state.message && <p style={{color:'#007bff'}} className='mr-3'>{this.state.message}</p> }

          <DragAndDrop choices={initialData.options} headings={initialData.titles} afterDrag={this.afterDrag} updateDrag={this.state.updateDrag} setUpdateDrag={this.setUpdateDrag}/>
        </div>
        <div className='mh-80'>
          {this.state.whatToShow === 'instructions' && <Instructions instructions={instructionList} toggleForm={this.toggleForms}/>}
          {this.state.whatToShow === 'game' && this.showImages()}
        </div>

      </div>
    )
  }
}

export default SaturatedUnsaturated 
