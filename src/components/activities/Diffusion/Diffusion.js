import React, { Component } from 'react';
// import '../lockLandscape.css'
import Animation from './Animation';
import Label from './Label';
import {radii, colors, getRandomScenario} from './diffusionVariables';
import ProgressBar from '../ProgressBar';
import '../lockLandscape.css'


class Diffusion extends Component {
  constructor(props){
    super(props);
    this.state = {
      barrier: true,
      bothSides: false,
      level: 1,
      whatToShow: 'pause',
      question: '',
      correctOption:'',
      correctCount: 0,
      maxCount: 6,
      scenario: 'Facilitated diffusion' ,
      radius: radii[Math.floor(Math.random() * radii.length)], //null,
      side: ['right', 'left'][Math.round(Math.random())], //null,
      otherSide: null,
      moleculeColor: colors[Math.floor(Math.random() * colors.length)], //null,
      moleculeType:  'X' ,//null, //'hydrophilic'; //'hydrophobic';
      btn1Label: `${String.fromCharCode(8592)} To the left`,
      btn2Label: `${String.fromCharCode(8594)} To the right`,
      btn3Label: 'Neither',
      message: 'Game will start shortly...',
    }
    this.highestLevel= 6;
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
  }

  componentDidMount() {
    this.pickQuestion()
  }

  pickQuestion () {
    let newState = {};
    newState = getRandomScenario(this.state.level)
    newState.whatToShow = 'game';
    newState.message = 'Select from these options: '
    newState.barrier = true;
    if (this.state.level === 2 || this.state.level === 3) {
      newState.bothSides= true;
      newState.maxCount = 6; // increase number of guesses to 6
    }
    if (this.state.level === 4) {
      newState.bothSides= false;
      newState.btn1Label = 'Carrier protein';
      newState.btn2Label = 'Carrier protein & energy';
    }
    if (this.state.level === 5) {
      newState.bothSides= true;
      newState.maxCount = 8; // increase number of guesses to 8
    }
    if (this.state.level === 6) {
      newState.btn1Label = 'Simple diffusion';
      newState.btn2Label = 'Facilitated diffusion';
      newState.btn3Label = 'Active transport';
      newState.maxCount = 10; // increase number of guesses to 10
    }
    
    // show carrier proteins and energy for all active transport *****
    if (this.state.level === 1 && this.correctCount === 0) {this.setState(newState)}
    else {
      setTimeout(() => {
        this.setState(newState)
      }, 3900);
    }
  }

  checkMatch (input) {
    if (this.state.correctOption === input) {
      // const barrier = (this.state.level >= 4) ? false : true;
      this.setState({
        correctCount: this.state.correctCount+1, 
        barrier: false,
        message: 'The game will resume shortly...',
        question: 'You are correct! Take a look:'
        }, () => {
        this.rightSound.play()
        if (this.state.correctCount === this.state.maxCount && this.state.level < this.highestLevel) {
          alert(`You passed level ${this.state.level}! \n It's time to master level ${this.state.level+1} \n Total levels: ${this.highestLevel}`);
          this.setState({ 
            correctCount: 0,
            level: this.state.level+1, 
          }, ()=> this.pickQuestion())
        } else if ((this.state.correctCount === this.state.maxCount) && (this.state.level === this.highestLevel)) {
          this.props.postAttempt()
        } else {
          this.pickQuestion();
        }
      })
    } else {
      this.wrongSound.play()
      this.setState({ 
        correctCount: 0,
        whatToShow: 'game',
      })
    }
  }

  clickFnc = (event) => {
    const {name} = event.target; 
    if (this.state.whatToShow=== 'game') {
      this.setState({ whatToShow: 'pause'})
      this.checkMatch(name)
    }
  }

  showButtons () {
    if (this.state.whatToShow === 'game') {
      return (
      <div className='d-inline-flex flex-column'>
        <button onClick={e => this.clickFnc(e)} name={this.state.btn1Label} className='btn btn-primary mt-1 mx-1'>{this.state.btn1Label}</button>
        <button onClick={e => this.clickFnc(e)} name={this.state.btn2Label} className='btn btn-primary mt-2 mx-1'>{this.state.btn2Label}</button>
        <button onClick={e => this.clickFnc(e)} name={this.state.btn3Label} className='btn btn-primary mt-2 mx-1'>{this.state.btn3Label}</button>
      </div>
      )
    }
  }

  render(){
    return (
      <div className="activity-container">
        <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/this.state.maxCount))} />
        <div className='row d-flex flex-row'>
          <div className='col-7'>
            <div className='d-none d-md-block d-lg-block p-4'>
              <h1 className='my-2'>{this.state.question}</h1>
            </div>
            <div className='d-block d-sm-block d-md-none d-lg-none'>
              <p className='my-2'>{this.state.question}</p>
            </div>
            <Animation 
              barrier={this.state.barrier}
              radius = {this.state.radius}
              side = {this.state.side}
              bothSides = {this.state.bothSides}
              moleculeColor = {this.state.moleculeColor}
              moleculeType = {this.state.moleculeType}
              scenario = {this.state.scenario}
            />
          </div>
          <div  className='col-5 flex-column py-1'>
            <Label 
              radius = {this.state.radius}
              moleculeColor = {this.state.moleculeColor}
              moleculeType = {this.state.moleculeType}
            />
            {/* <div  className='d-flex flex-column'> */}
              <p className='mt-2'>{this.state.message}</p>
              {this.showButtons()}
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }

}

export default Diffusion

//col-lg-4 col-md-6 col-sm-12 d-inline-flex flex-lg-column flex-sm-row