// auth/Signup.js

import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import {Link} from 'react-router-dom' ;
import {Redirect} from 'react-router-dom' ;



class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', error: false, redirectToReferrer: false };
    this.service = new AuthService();
  }

  // redirects when user opens app in new window but is logged in on previous window  
  componentDidUpdate(prevProps) {
    if (this.props.userInSession !== prevProps.userInSession && this.props.userInSession !== null) {
      if (this.props.location.state) {
        this.setState({redirectToReferrer: true})
        console.log('setting redirect in Log in l 31');
      } else {
        this.props.history.push('/courses'); // redirect !!! 
      }
    } else if (this.props.userInSession !== prevProps.userInSession && this.props.userInSession === null) {
      this.setState({redirectToReferrer: false})
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({error: 'Please enter email and password'})
    } else {
      const email = this.state.email.toLowerCase();
      const password = this.state.password;
      
      this.service.login(email, password)
      .then( response => {
          console.log('login response', response)
          this.setState({
              email: "", 
              password: "",
              error:false,
          });
          this.props.setTheUserInTheAppComponent(response)
          if (this.props.location.state) {
            this.setState({redirectToReferrer: true})
          } else {
            this.props.history.push('/courses'); // redirect !!! 
          }

      })
      .catch( err => {
        this.setState({error:err.response.data.error})
        console.log('login error ----',err.response)
      }) 
    }
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value, error: false});
  }
      
  
  render(){
    if (this.props.location.state && this.state.redirectToReferrer && this.props.userInSession !== null) {
      const { from } = this.props.location.state
      console.log('redirecting log in')
      return <Redirect to={from} />
    }
    return(
      <div className="row justify-content-center">
       <div className="col-lg-6 col-md-8 col-sm-12">
        
        <form onSubmit={this.handleFormSubmit}>

          <div className="form-group">
            <label>email:</label>
            <input className="form-control" type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input className="form-control" type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>

            {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}
            <input className="btn btn-primary" type="submit" value="Log in" />

        </form>
  
       
        <div className="mt-2">
        <p className="account-message">Don't have an account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
        <p className="account-message">
          Forgot your password? <Link to={"/forgot"}> Recover password</Link>
        </p>
      </div>
      </div>
      </div>
    )
  }


}

export default Login;