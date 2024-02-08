// user/Reset.js

import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import {Redirect} from 'react-router-dom' 

// import {Link} from 'react-router-dom' 

class Reset extends Component {
  constructor(props){
    super(props);
    this.state = { password: '', confirm: '', redirect: false, error: false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.confirm !== this.state.password) {
      this.setState({error: 'Please confirm your password and check that they match'})
    } else {
      const password = this.state.password;
      const confirm = this.state.confirm;
      const token = this.props.match.params.token
      this.service.reset(password, confirm, token)
      .then( response => {
        console.log("the response-=-=-", response)
        this.setState({
          password: "",
          confirm: "", 
          error:false,
          redirect: true,
      });
        // make sure that the response is the user, not an error
        if ('email' in response) {
          this.props.setTheUserInTheAppComponent(response)
          this.props.history.push('/courses'); // redirect !!!
        } else {
          this.setState({
            password: "",
            confirm: "", 
            error: response.data.message
          })
        }    
      })
      .catch(error => {
       if (error && error.response && error.response.data && error.response.data.message ) {
        this.setState({error: error.response.data.message})
        console.log('the error ', error.response.data.message)
       } 
      });
    }
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  
  render(){
    return(
      <div className='container-fluid'>
      {this.state.redirect && <Redirect to ='/courses'/>}  
      <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <div className="row justify-content-center py-1">
            <h1>Reset password</h1>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>New Password:</label>
            <input className="form-control" type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input className="form-control" type='password' name="confirm" value={this.state.confirm} onChange={ e => this.handleChange(e)} />
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" />

            {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}
        </form>
  
      </div> 
      </div> 
      </div>
    )
  }


}

export default Reset;