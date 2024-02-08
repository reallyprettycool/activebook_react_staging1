import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from './auth/auth-service';
import '../App.css';
import {Redirect} from 'react-router-dom' 


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: this.props.userInSession, redirect: false};
    this.service = new AuthService();

  }
  
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ loggedInUser: nextProps["userInSession"]},
  //   // ()=>{ console.log(this.state)}
  //   )
  // }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userInSession !== prevProps.userInSession) {
      // console.log('change props ', this.props.userInSession)
      this.setState({loggedInUser: this.props.userInSession})
    }
  }

  componentDidMount() {
    if( this.state.loggedInUser === null ) {
      this.fetchUser()
    }
  }

  fetchUser(){
      this.service.loggedin()
      .then(response =>{
        // console.log('fetch user success NavBar ', response)
        this.setState({ loggedInUser:  response, redirect: false }) 
        this.props.setTheUserInTheAppComponent(response)
      })
      .catch( err =>{
        // console.log('fetch user err NavBar ', err)
        this.props.setTheUserInTheAppComponent(null)
        this.setState({ loggedInUser: null}) 
      })
  }


  logout = () =>{
    this.service.logout()
    .then(()=>{
      // clear all the props in the APP component:
      this.props.setTheUserInTheAppComponent(null);
      this.props.setCourseList(null);
      this.props.setOneCourse(null);
      this.setState({redirect: true, loggedInUser: null }) // redirect !!! 
      // console.log('redirect from navbar');
    })
  }

  linkHandler = () => {
    // console.log('user =-=-=-=-=-=', this.state.loggedInUser)
    if(this.state.loggedInUser){
      return (
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" activeClassName="active" to='/courses'>Courses</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to={`/profile/${this.state.loggedInUser._id}`}>{this.state.loggedInUser.firstname}'s profile</NavLink>
          <li className="nav-item nav-link" onClick={()=>this.logout()}>Log Out</li>
          {/* {this.state.redirect && <Redirect to ='/login'/>}   */}
        </div>
      );
    } else {
      return (
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" activeClassName="active" to='/login'>Log in</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to='/signup'>Signup</NavLink>
        </div>
        );
    }
  }
    
  render(){
    // console.log('log in user navBar ', (this.state.loggedInUser))
    // console.log('redirect in NavBar? ', this.state.redirect)
      return (
        <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid" >
          <p className="navbar-brand" href="/login"><img alt="frog icon" style={{height: '18px'}} src="/frog-solid.svg"></img> Biology DemoEd</p>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              {this.linkHandler()}
              {this.state.redirect && <Redirect to ='/login'/>}  
          </div>
        </div>
        </nav>
        
      )
      }
  }
  export default Navbar;