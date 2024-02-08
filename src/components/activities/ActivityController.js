import React, { Component } from 'react';
import {Redirect} from 'react-router-dom' 
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
import axios from 'axios';
import moment from 'moment-timezone';
// import { activities } from '../activities/ActivityList';
// import './activities.css'
import './lockLandscape.css'

import WonGame from './WonGame';

import DNAreplication from './DNAreplication/DNAreplication';
import DNAreplication2 from './DNAreplication/DNAreplication2';
import ProteinStructure from './ProteinStructure/ProteinStructure';
import SaturatedUnsaturated  from './SaturatedUnsaturated/SaturatedUnsaturated';
import Diffusion from './Diffusion/Diffusion';
import Osmosis from './Osmosis/Osmosis';
import Thermodynamics from './Thermodynamics/Thermodynamics';
import CellularRespiration from './CellularRespiration/CellularRespiration';
// import CellCycle from './CellCyle/CellCycle';
import Meiosis from './Meiosis/Meiosis';
import GeneExpression from './GeneExpression/GeneExpression'
import GeneExpressionEuk from './GeneExpressionEuk/GeneExpressionEuk'
import Mendel from './Mendel/Mendel';
import Recombination from './Recombination/Recombination';


class ActivityController extends Component {
  constructor(props){
    super(props)
    this.state = { 
      loggedInUser: this.props.userInSession,
      whatToShow:this.props.match.params.activity,
      redirect: false,
      error:false,
    };
    this.service = new AuthService();
    this.service2 = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/attempt`, withCredentials: true});
    this.activity = this.props.match.params.activity
    this.assignment = this.props.match.params.assignmentId
    this.courseID= this.props.match.params.courseId
  }

  componentDidMount() {
    // if( this.state.loggedInUser === null ) {
      this.fetchUser()
    // }
    // console.log('the activity ', this.activity, 'the assignment ', this.assignment, 'the course id', this.courseID)
  }

  fetchUser(){
      this.service.loggedin()
      .then(response =>{
        this.setState({ loggedInUser:  response }) 
        this.props.setTheUserInTheAppComponent(response)
      })
      .catch( err =>{
        console.log('error ', err)
        this.setState({ redirect:  true }) 
      })
  }

  postAttempt = () => {
    if (this.props.userInSession.role === 'student' && this.assignment) {
      console.log( 'about to post attempt')
      const now = moment.utc() // timestamp in UTC
      this.service2.post(`/${this.courseID}/${this.assignment}`, {date:now})
      .then( () => {
        setTimeout(() => {
          this.setState({whatToShow: 'scoreSaved'})
        }, 2000);
        
      }).catch( (error) => {
        this.setState({whatToShow: 'error', error:error.response.data.message})
        console.log(error, error.response, error.response.data) 
      })
    } else {
      setTimeout(() => {
        this.setState({whatToShow: 'wonGame'})
      }, 2000);
    }
  }

  renderActivity = () => {
    let message = '';
      switch(this.state.whatToShow) {
        case "DNAreplication":
          return <DNAreplication  postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "DNAreplication2":
          return <DNAreplication2  postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "ProteinStructure":
          return <ProteinStructure  postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "SaturatedUnsaturated":
          return <SaturatedUnsaturated postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Diffusion":
          return <Diffusion postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Osmosis":
          return <Osmosis postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Thermodynamics":
          return <Thermodynamics postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "CellularRespiration":
          return <CellularRespiration postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "CellCycle":
          return <Meiosis activity={'CellCycle'} postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Meiosis":
          return <Meiosis activity={'Meiosis'} postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "GeneExpressionProkaryotes":
          return <GeneExpression postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "GeneExpressionEukaryotes":
          return <GeneExpressionEuk postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Mendel":
          return <Mendel activity={'Mendel1'} postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Mendel2":
          return <Mendel activity={'Mendel2'} postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case "Recombination":
          return <Recombination postAttempt={this.postAttempt}  {...this.props} /> //  {...props} => so we can have 'this.props.history' in Edit.js
        case 'wonGame':
          message = "You won the game! \n But your score won't be saved"
          return <WonGame message={message} />
        case 'scoreSaved':
          message = `Congratulations ${this.props.userInSession.firstname}, you won the game! \n Your score has been saved`
          return <WonGame message={message} />
        case 'error':
          return <p style={{ color: 'red' }}>{this.state.error}</p>
        default:
          return <p>no activity to display</p>
      }
  }

  render(){
    const styleBtn = {
      position: 'fixed', top: 0, right: 0, backgroundColor: 'black', color: 'white', height: '5vh', width: '5vh', border: '1px solid black', borderRadius: '50%' , fontSize:'1.6em', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }
    return(
      <div className='container-fluid'>
        {this.state.redirect && <Redirect to={{ pathname: '/login', state: { from: this.props.location }}} />}
        {this.renderActivity()}
        <Link style={styleBtn} to={`/courses/${this.courseID}`}><span className="fa fa-times"></span></Link>
        <div id='fake-div' name="allow scrolling to hide address bar in iPhones"> </div>
      </div>
    )
  }
}


export default ActivityController;

    // const { params } = this.props.match;
    // this.courseID = params.courseId; ${params.assignmentId}  ${params.courseID}