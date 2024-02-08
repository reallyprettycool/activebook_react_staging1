// user/changePassword.js

import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
// import {Link} from 'react-router-dom' 

class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state = { password: '', confirm: '', error: false, success: false};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.confirm !== this.state.password) {
      this.setState({error: 'Please confirm your password and check that they match'})
    } else {
      const password = this.state.password;
      const confirm = this.state.confirm;
      this.service.password(password, confirm)
      .then( response => {
        console.log("the response-=-=-", response)
          this.setState({
              password: "",
              confirm: "", 
              error:false,
          });
          this.props.showMsg('Password updated')
          this.props.toggleForm()
      })
      .catch( error => {
        console.log('error came in the catch ----',error.response.data.message) 
        this.setState({error: error.response.data.message})
      })
    }
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  
  render(){
    return(
      <div className='container-fluid'>
        <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="row justify-content-end py-1">
            <button className="btn btn-secondary" onClick={()=>this.props.toggleForm()}>Cancel</button>
          </div>
          <div className="row justify-content-center py-1">
            <h1>Change password</h1>
          </div>
          <form onSubmit={this.handleFormSubmit}>
          
          {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}
          <div className="form-group">
              <label>New Password:</label>
              <input className="form-control"  type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input className="form-control" type='password' name="confirm" value={this.state.confirm} onChange={ e => this.handleChange(e)} />
            </div>
    
            <input className="btn btn-primary ml-2" type="submit" value="Submit" />

          </form>  
        
        </div>
        </div>
      </div>
    )
  }


}

export default ChangePassword;