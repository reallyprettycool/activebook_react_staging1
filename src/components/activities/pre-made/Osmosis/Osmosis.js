import React, { Component } from 'react';
// import '../lockLandscape.css'
import Animation from './Animation';
import Label from './Label';
import {radii, colors, getRandomScenario} from './osmosisVariables';
import ProgressBar from '../ProgressBar';
import '../lockLandscape.css'

class Osmosis extends Component {
  constructor(props){
    super(props);
    this.state = {
      barrier: true,
      bothSides: false,
      level: 1,
      whatToShow: 'game',
      question: 'Which solution has MORE solutes?',
      correctOption:"Inside the cell",
      selected: 'none',
      correctCount: 0,
      maxCount: 6,
      insideMolecules: 18,
      outsideMolecules: 8,
      radius: radii[Math.floor(Math.random() * radii.length)], //null,
      moleculeColor: colors[Math.floor(Math.random() * colors.length)], //null,
      moleculeType: 'hydrophilic' ,//null, 'X' //'hydrophilic'; //'hydrophobic';
      btn1Label: "Inside the cell",
      btn2Label: 'Outside the cell',
      btn3Label: 'Neither',
      message: 'Select from these options: ',
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
    newState.selected = 'none';
    newState.whatToShow = 'game';
    newState.message = 'Select from these options: '
    if (this.state.level === 3) {
      newState.maxCount = 7; // increase number of guesses to 7
      newState.btn1Label = "Into the cell";
      newState.btn2Label = 'Out of the cell';
    }
    if (this.state.level === 4) {
      newState.btn1Label = 'Add more solutes inside the cell';
      newState.btn2Label = 'Add more solutes outside the cell';
      newState.btn3Label = 'Leave it as is';
    }
    if (this.state.level === 5) {
      newState.btn1Label = 'Add more solutes inside the cell';
      newState.btn2Label = 'Allow solutes to exit the cell';
      newState.btn3Label = 'Leave it as is';
    }
    if (this.state.level === 6) {
      newState.btn1Label = 'Add more solutes inside the cell';
      newState.btn2Label = 'Give the cell a cell wall';
      newState.btn3Label = 'Leave it as is';
    }
    if (this.state.level <= 3) {this.setState(newState)}
    else {
      setTimeout(() => {
        this.setState(newState)
      }, 4500);
    }
  }

  checkMatch (input) {
    if (this.state.correctOption === input) {
      // const barrier = (this.state.level >= 4) ? false : true;
      this.setState({
        correctCount: this.state.correctCount+1, 
        barrier: false,
        message: 'The game will resume shortly...',
        question: 'You are correct! Well done!'
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
    } else if (this.state.level <= 3) {
      this.wrongSound.play()
      this.setState({ 
        correctCount: 0,
        whatToShow: 'game',
      })
    } else {
      this.setState({
        correctCount: 0,
        message: 'The game will resume shortly...',
        question: "That's incorrect, look what happens:"
        }, () => {
          this.wrongSound.play();
          this.pickQuestion();
      }) 
    }
  }

  clickFnc = (event) => {
    const {name} = event.target; 
    if (this.state.whatToShow=== 'game') {
      this.setState({ whatToShow: 'pause', selected:name})
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
        <div className='d-none d-md-block d-lg-block' style={{height:'2vh'}}></div>
        <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/this.state.maxCount))} />
        <div className='d-none d-md-block d-lg-block' style={{height:'2vh'}}></div>
        <div className='row d-flex flex-row'>
          <div className='col-6'>
            <div className='d-none d-md-block d-lg-block p-4'>
              <h1 className='my-2'>{this.state.question}</h1>
            </div>
            <div className='d-block d-sm-block d-md-none d-lg-none'>
             <h5 className='my-2'>{this.state.question}</h5>
            </div>
            <div className='d-none d-md-block d-lg-block' style={{height:'2vh'}}></div>
            <Animation 
              barrier={this.state.barrier}
              radius = {this.state.radius}
              insideMolecules = {this.state.insideMolecules}
              outsideMolecules = {this.state.outsideMolecules}
              moleculeColor = {this.state.moleculeColor}
              moleculeType = {this.state.moleculeType}
              selected= {this.state.selected}
            />
          </div>
          <div  className='col-6 flex-column py-1'>
             <div className='d-none d-md-block d-lg-block' style={{height:'5vh'}}></div>
            <Label 
              radius = {this.state.radius}
              moleculeColor = {this.state.moleculeColor}
              moleculeType = {this.state.moleculeType}
            />
              <p className='mt-2'>{this.state.message}</p>
              {this.showButtons()}
          </div>
        </div>
      </div>
    )
  }

}

export default Osmosis

//col-lg-4 col-md-6 col-sm-12 d-inline-flex flex-lg-column flex-sm-row