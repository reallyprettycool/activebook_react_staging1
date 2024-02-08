import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
// import {Link} from 'react-router-dom' 

class Forgot extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', error: false};
    this.service = new AuthService();
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email.toLowerCase();
  
    this.service.forgot(email)
    .then( response => {
        this.setState({
            email: "", 
            error: response,
        });
        console.log("the response-=-=-", response)
          this.setState({error: response})
    }) 
    .catch(error => {
      if (error && error.response && error.response.data && error.response.data.message ) {
       this.setState({
          email: "",
          error: error.response.data,
        });
       console.log('the error ', error.response.data)
      } 
     });
  }

  render(){
    return(
      <div>
      <h2>Please enter your email address to send your password recovery link</h2>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label for="email">Email address:</label>
            <input value={this.state.email} onChange={ e => this.handleChange(e)} className="form-control" type="email" name="email" required placeholder="Enter email address" />
          </div>
          {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error.message}</p>}
          <button className="btn btn-primary">Email me a recovery link</button>

        </form>
      </div>
    )
  }
}

export default Forgot;