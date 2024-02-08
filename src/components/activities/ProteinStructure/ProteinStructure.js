import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom' 
import { slides, bonds, processes, instructionList } from './ProteinStructureVariables';
import shuffle from '../shuffle'
import '../DNAreplication/DNAreplication.css'
import '../lockLandscape.css'
import YouTubePlayer from './PlayVideo'
import Instructions from '../Instructions';



class ProteinStructure extends Component {
  constructor(props){
    super(props);
    this.state = {
      bonds: false,
      processes: false,
      guessedSteps:0,
      missedClicks:0,
      totalClicks:0,
      currentBond:"",
      currentProc:"",
      whatToShow: 'instructions',
      // redirect:false,
      message:"Click on the first step or bond involved in protein folding",
    };

    this.correctOrder =['Primary structure', 'Secondary structure', 'Tertiary structure', 'Quaternary structure',];
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 

  }

  gotOneMatch() {
    this.narrateProcess(this.state.guessedSteps+1)
    this.setState({
      guessedSteps: this.state.guessedSteps+1,
      currentBond:"",
      currentProc:"",
      message: false,
    }, ()=>{
      this.checkIfWon();
      // this.props.postAttempt() // Just for testing MUST DELETE
    })
  }

  componentDidMount () {
    const theBonds = shuffle(bonds);
    const theProcesses = shuffle(processes);
    this.setState({
      bonds: theBonds,
      processes: theProcesses,
    })
  }

  checkIfWon() {
    if (this.state.guessedSteps === this.correctOrder.length) {
        if (this.state.missedClicks === 0) {
            // alert('Congratulations! \nYou won the game with the minimum number of steps!'); 
            this.props.postAttempt()
            // this.setState({redirect:true});
        } else {
          const theBonds = shuffle(bonds);
          const theProcesses = shuffle(processes);
          this.setState({
            bonds: theBonds,
            processes: theProcesses,
            guessedSteps:0,
            missedClicks:0,
            totalClicks:0,
            currentBond:"",
            currentProc:"",
            // redirect:false,
            whatToShow: 'instructions',
            message:"Click on the first step or bond involved in protein folding",
          })
          alert(`You had ${this.state.missedClicks} misses. \nTry again so you can get closer to the minimum number of steps!`)
        }
    }
  }
    
  processClickFnc = (e, index) => { 
    // console.log(e.target)
    if (this.state.whatToShow === 'game') {
      if (this.correctOrder[this.state.guessedSteps] === this.state.processes[index].name) {
        this.rightSound.play()
        this.setState({
          currentProc: this.state.processes[index].name
        }) 
        if (this.state.currentBond) {
          this.gotOneMatch()
        } else {
          this.setState({message:'Select the corresponding bond from above '+ String.fromCharCode(8593)})
        }
      } else {
        this.wrongSound.play()
        this.setState({
          missedClicks: this.state.missedClicks+1
        })
        console.log('missed clicks proc ', this.state.missedClicks)
      }
    }
  }

  bondsClickFnc = (e, index) => {
    // console.log(e.target)
    if (this.state.whatToShow === 'game') {
      if (this.correctOrder[this.state.guessedSteps]===this.state.bonds[index].name){
        this.rightSound.play()
        this.setState({
          currentBond: this.state.bonds[index].name
        })  
        if (this.state.currentProc) {
          this.gotOneMatch()
        } else {
          this.setState({message:String.fromCharCode(8592) +' Select the corresponding effect on the left'})
        }
      } else {
        this.wrongSound.play()
        this.setState({
          missedClicks: this.state.missedClicks+1
        })
        // console.log('missed clicks enz ', this.state.missedClicks)
      }
    }
  }

  showSlides() {
    let displayText = '';
    this.state.message ? displayText= this.state.message : displayText = slides[this.state.guessedSteps].description;
    return (
      <div>
        <p style={{position: 'relative', top: 0, right: 0, color:'#007bff'}} className='mr-3'>{displayText}</p>
        <img className="img-fluid" src={`/images/ProteinStructure/${slides[this.state.guessedSteps].img}`} alt={slides[0].description} />
      </div>
    )
  }

  showBonds() {
    if (this.state.bonds) {
      let oneStyle = {};
    return this.state.bonds.map((bond, index)  => {
        bond.name === this.state.currentBond ? oneStyle = {border: '5px solid #007bff'} : oneStyle = {}
        return (
          <div data-tip="Click on an bond" className="card col-3 enz" style={oneStyle} name={bond.name} key = {index} onClick={(e)=>this.bondsClickFnc(e, index)}>
            <p className="card-text">{bond.bondType}</p>
        </div>
      )})
    }
  }

  showProcesses() {
    if (this.state.processes) {
      let addClass = '';
      return  this.state.processes.map((oneProcess, index)  => {
      oneProcess.name === this.state.currentProc ? addClass = "active list-group-item list-group-item-action" : addClass = "list-group-item list-group-item-action"
        return (
          <p data-tip="Click on a process"  key = {index} className={addClass} onClick={(e)=>this.processClickFnc(e, index)} name={oneProcess.name} >{oneProcess.displayText}</p>

      )})
    }
  }

  narrateProcess (i) {
    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance(slides[i].description);
      window.speechSynthesis.speak(msg);
    }
  }


  toggleForms= (showMe = 'instructions') => {
    // 'instructions' 'video' 'game'
    if (showMe === 'game') {this.narrateProcess(0)}
    this.setState({whatToShow: showMe})
  }

  render(){
    
    return (
      <div className="row activity-container">

      <div className="col-4 list-group myList">
        {this.state.whatToShow=== 'game' && <p className="list-group-item list-group-item-info" onClick={()=>this.toggleForms('video')}><span>help? Watch video</span></p>}
        {this.state.whatToShow=== 'video' && <p className="list-group-item list-group-item-danger" onClick={()=>this.toggleForms('game')}><span>Back to game</span></p>}
        {this.state.missedClicks>0 && <p className="list-group-item list-group-item-warning" >Missed clicks: {this.state.missedClicks}</p>}
        <p className="list-group-item list-group-item-success mb-2" >Guessed steps: {this.state.guessedSteps} out of {this.correctOrder.length}</p>
        {this.showProcesses()}
      </div>

        <div className="col-8">
          <div className="row">
            {!this.state.showVideo && this.showBonds()}
          </div>
          {this.state.whatToShow === 'video' && <YouTubePlayer />}
          {this.state.whatToShow === 'game' && this.showSlides()}
          {this.state.whatToShow === 'instructions' && <Instructions instructions={instructionList} toggleForm={this.toggleForms}/>}
        </div>

        {/* {this.state.redirect && <Redirect to ={`/courses/${this.courseId}`}/>} */}
      </div>
    )
  }
}

export default ProteinStructure;