// components/projects/ProjectDetails.js

import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './changePassword';
import AuthService from '../auth/auth-service';

class Profile extends Component {
  constructor(props){
      super(props);
      this.state = {
        loggedInUser: this.props.userInSession,
        showEditForm: false, 
        showPasswordForm: false, 
        message: false,
      };
      this.service = new AuthService();
  }

  componentWillMount(){
    this.fetchUser();
}

// componentWillReceiveProps(nextProps) {
//   this.setState({ loggedInUser: nextProps["userInSession"]},
//   ()=>{
//     console.log(this.state)
//   })
// }

  fetchUser(){
    // if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        })
        // console.log('we got the user!!!!!', response) 
      })
      .catch( err =>{
        console.log('error ', err)
        this.props.setTheUserInTheAppComponent(null)
        this.setState({
          loggedInUser:  false
        }) 
      })
    // }
  }

  toggleEditForm = () => {
    this.setState({showEditForm: !this.state.showEditForm})
  }

  togglePasswordForm = () => {
    this.setState({showPasswordForm: !this.state.showPasswordForm})
  }

  showMessage = (theMessage) => {
    this.setState({message: theMessage})
  }

  updateUser = (newUser) => {
    this.setState({ loggedInUser:  newUser})
    this.fetchUser()
    this.props.setTheUserInTheAppComponent(newUser)
  }

 renderProfile = () => {
   return (
     <div>
        <div class="row justify-content-center">
          <h1>{this.state.loggedInUser.firstname}'s profile </h1>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 col-sm-10 mt-2">              
              <p><b>First name: </b>{this.state.loggedInUser.firstname}</p>
              <p><b>Last name: </b>{this.state.loggedInUser.lastname}</p>
              {this.state.loggedInUser.institution ? <p><b>Institution: </b>{this.state.loggedInUser.institution}</p> : <p></p>}
              {this.state.loggedInUser.title ? <p><b>Title: </b>{this.state.loggedInUser.title}</p> : <p></p>}                
              <button className="btn btn-primary mr-4" onClick = {()=> this.toggleEditForm()}>Edit profile</button>
              <button className="btn btn-primary" onClick = {()=> this.togglePasswordForm()}>Change password</button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div class="container mt-1">
        {this.state.message && <p style={{ color: 'blue' }}>{this.state.message}</p>}
        {this.state.showEditForm && <EditProfile theUser={this.props.userInSession} updateUser={this.updateUser} toggleForm={()=>this.toggleEditForm()} showMsg={this.showMessage}/>}
        {this.state.showPasswordForm && <ChangePassword theUser={this.props.userInSession} updateUser={this.updateUser} toggleForm={()=>this.togglePasswordForm()} showMsg={this.showMessage}/>}
        {!this.state.showEditForm && !this.state.showPasswordForm && this.renderProfile()}

      </div>
    )
  }
}

export default Profile;