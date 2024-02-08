import React, { Component } from 'react';
import Canvas from './Canvas';
import ProgressBar from '../ProgressBar';
import {optionChoices, getRandomScenario} from './thermodynamicsVariables';
// import '../lockLandscape.css';


class Thermodynamics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      options: optionChoices[0],
      answer: [],
      correctOption: '',
      question:'Drag products and reactancts to respetive position',
      whatToShow: 'game',
      level: 1, 
      correctCount: 0,
      maxCount: 5, /// change to 5
      message: false,
      showEnergyLabels: true,
      resetPositions: false,
    }
    this.highestLevel= 4;
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 
  }

  componentDidMount() {
    this.pickQuestion()
  }

  pickQuestion () {
    let newState = getRandomScenario(this.state.level)
    newState.whatToShow = 'game';
    newState.message = false;
    newState.resetPositions = true; // the Canvas component will redraw positions hardcoded. 
    this.setState(newState)
  }

  checkMatch (input) {
    if (this.state.correctOption === input) {
    this.setState({
      correctCount: this.state.correctCount+1, 
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
  } else {
    this.setState({
      correctCount: 0,
      message: 'Try again',
      whatToShow: 'game',
      }, () => {
        this.wrongSound.play();
    }) 
    }
  }

  checkPositions () { // click function
    this.setState({whatToShow: 'pause'})
    if (this.state.answer[0].y > this.maxHeight*0.3 && this.state.answer[1].y > this.maxHeight*0.3) {
      // the larger the y, the lower it's location on the graph. Canvas is backwards!
      if (this.state.answer[0].y > this.state.answer[1].y*1.05) {
        this.checkMatch(this.state.answer[1].text) // item 1 is placed above the graph, lower y
      } else if (this.state.answer[0].y < this.state.answer[1].y*0.95) {
        this.checkMatch(this.state.answer[0].text) // item 0 is placed above the graph, lower y
      } else {
        this.setState({message: 'increase the difference between the boxes'})
      }

    } else {
      this.setState({message: 'Place the boxes into their corresponding positions in the graph'})
    }
  }

  setCanvasSize = (height, width) => {
    this.maxHeight= height;
    this.maxWidth= width;
  }

  getPositions = (answer) => {
    // console.log(answer)
    this.setState({answer:answer, resetPositions:false, message:false, whatToShow:'game'});
  }

  render() {
    return (
      <div className="activity-container"  id='bootstrap-overrides'>
        <div className='d-none d-md-block d-lg-block' style={{height:'2vh'}}></div>
        <ProgressBar percentage={Math.ceil(this.state.correctCount*(100/this.state.maxCount))} />
        <div className='d-none d-md-block d-lg-block p-2'>
          <h2 className='pt-2'>Move the products and reactants to indicate:</h2>      
          <h2>{this.state.question}</h2>
        </div>  
        <div className='d-block d-sm-block d-md-none d-lg-none'>
          <p>Move the products and reactants to indicate:</p>      
          <p>{this.state.question}</p>
        </div>
        <div className='row'>
          <div className='col-7'>
            <Canvas 
                options={this.state.options}
                sendPositions={this.getPositions}
                setCanvasSize={this.setCanvasSize}
                showEnergyLabels={this.state.showEnergyLabels}
                resetPositions={this.state.resetPositions}
                level = {this.state.level}
                />
          </div>
          <div className='col-5 d-inline-flex flex-column'>
            <div className='d-none d-md-block d-lg-block' style={{height:'5vh'}}></div>
            <div className='d-none d-md-block d-lg-block p-2'>
              {this.state.whatToShow === 'game' && !this.state.message &&<h3>Drag the <span style={{color:"#6600ff"}}>blue</span> and <span style={{color:"#ff0033"}}>red</span> boxes to their corresponding position.</h3>}
              {this.state.message && <h3 style={{color:"#ff0033"}}>{this.state.message}</h3>}
              {this.state.whatToShow === 'game' && <h3>When done, click below to check your answer:</h3>}
            </div>
            <div className='d-block d-sm-block d-md-none d-lg-none'>
              {this.state.whatToShow === 'game' && !this.state.message &&<p>Drag the <span style={{color:"#6600ff"}}>blue</span> and <span style={{color:"#ff0033"}}>red</span> boxes to their corresponding position.</p>}
              {this.state.message && <p style={{color:"#ff0033"}}>{this.state.message}</p>}
              {this.state.whatToShow === 'game' && <p>When done, click below to check your answer:</p>}
            </div>
            <div className='d-inline-flex justify-content-center'>
            {this.state.whatToShow === 'game' && <button onClick={e => this.checkPositions(e)} className='btn btn-primary mt-1 mx-1'>Check</button>}
            </div>
          </div>
        </div>
      </div>
    )
  }
  }
  
  export default Thermodynamics