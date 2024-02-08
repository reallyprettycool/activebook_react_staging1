import React, { Component } from 'react';
// import axios from 'axios';
// import {Redirect} from 'react-router-dom' 
import { slides, enzymes, processes, instructionList} from './DNAreplicationVariables';
import shuffle from '../shuffle'
import './DNAreplication.css'
import '../lockLandscape.css'
import YouTubePlayer from './PlayVideo'
import Instructions from '../Instructions';
// import moment from 'moment-timezone';


class DNAreplication extends Component {
  constructor(props){
    super(props);
    this.state = {
      enzymes:false,
      processes: false,
      guessedSteps:0,
      missedClicks:0,
      totalClicks:0,
      currentEnz:"",
      currentProc:"",
      whatToShow: 'instructions',
      // redirect:false,
      message:"Click on the first step or enzyme involved in DNA replication",
    };

    this.correctOrder =['helicase', 'primase', 'DNA polymerase 3', 'helicase', 'primase', 'DNA polymerase 3', 'DNA polymerase 1', 'ligase',];
    this.wrongSound = new Audio('/audio/Cartoon_Boing.m4a'); 
    this.rightSound = new Audio('/audio/correct_sound.m4a'); 

    this.courseId = '';
    // this.service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/attempt`, withCredentials: true});

  }

  gotOneMatch() {
    this.narrateProcess(this.state.guessedSteps+1)
    this.setState({
      guessedSteps: this.state.guessedSteps+1,
      currentEnz:"",
      currentProc:"",
      message: false,
    }, ()=>{
      this.checkIfWon();
      // this.props.postAttempt() // Just for testing MUST DELETE
    })
  }

  componentDidMount () {
    const theEnzymes = shuffle(enzymes);
    const theProcesses = shuffle(processes);
    this.setState({
      enzymes: theEnzymes,
      processes: theProcesses,
    })
  }

  checkIfWon() {
    if (this.state.guessedSteps === this.correctOrder.length) {
        if (this.state.missedClicks === 0) {
            this.props.postAttempt()
            // this.setState({redirect:true});
        } else {
          const theEnzymes = shuffle(enzymes);
          const theProcesses = shuffle(processes);
          this.setState({
            enzymes: theEnzymes,
            processes: theProcesses,
            guessedSteps:0,
            missedClicks:0,
            totalClicks:0,
            currentEnz:"",
            currentProc:"",
            // redirect:false,
            whatToShow: 'instructions',
            message:"Click on the first step or enzyme involved in DNA replication",
          })
          alert(`You had ${this.state.missedClicks} misses. \nTry again so you can get closer to the minimum number of steps!`)
        }
    }
  }

  // postAttempt = () => {
  //   const now = moment.utc() // timestamp in UTC
  //   const { params } = this.props.match;
  //   this.courseId = params.courseId;
  //   this.service.post(`/${params.assignmentId}/${params.courseId}`, {date:now})
  //   .then( () => {
  //   }).catch( error => console.log(error, error.response, error.response.data) )
  // }
    
  processClickFnc = (e, index) => { 
    // console.log(e.target)
    if (this.state.whatToShow === 'game') {
      if (this.correctOrder[this.state.guessedSteps]===this.state.processes[index].name) {
        this.rightSound.play()
        this.setState({
          currentProc: this.state.processes[index].name
        }) 
        if (this.state.currentEnz) {
          this.gotOneMatch()
        } else {
          this.setState({message:'Select the corresponding enzyme from above '+ String.fromCharCode(8593)})
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

  enzymeClickFnc = (e, index) => {
    // console.log(e.target)
    if (this.state.whatToShow === 'game') {
      if (this.correctOrder[this.state.guessedSteps]===this.state.enzymes[index].name){
        this.rightSound.play()
        this.setState({
          currentEnz: this.state.enzymes[index].name
        })  
        if (this.state.currentProc) {
          this.gotOneMatch()
        } else {
          this.setState({message:String.fromCharCode(8592) +' Select the corresponding action on the left'})
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
        <img className="img-fluid" src={`/images/DNAreplication/${slides[this.state.guessedSteps].img}`} alt={slides[0].description} />
      </div>
    )
  }

  showEnzymes() {
    if (this.state.enzymes) {
      let oneStyle = {};
      return this.state.enzymes.map((enzyme, index)  => {
        enzyme.name === this.state.currentEnz ? oneStyle = {border: '5px solid #007bff'} : oneStyle = {}
        return (
          <div data-tip="Click on an enzyme" className="card p-2 enz" style={oneStyle} name={enzyme.name} key = {index} onClick={(e)=>this.enzymeClickFnc(e, index)}>
            <img className="card-img-top" src={`/images/DNAreplication/${enzyme.img}`} alt={enzyme.displayText}/>
            <p className="card-text">{enzyme.displayText}</p>
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

        <div className="col-8 px-1">
          <div className="row">
            {!this.state.showVideo && this.showEnzymes()}
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

export default DNAreplication;