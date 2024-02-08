import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import Forgot from "./components/user/Forgot";
import Reset from "./components/user/Reset";
import Profile from "./components/user/Profile";
import Instructor from "./components/user/Instructor";
import AuthService from "./components/auth/auth-service";
import Courses from "./components/course/Courses";
import CourseDetails from "./components/course/CourseDetails";
import AddAssignments from "./components/assignments/AddAssignment";
import ActivityController from "./components/activities/ActivityController";
import LandingPage from "./components/LandingPage";

/* packages installed:
$ npm install -g project-mgnt-client
$ npm install --save react-router-dom
$ npm install bootstrap --save
$ npm install --save query-string
$ npm install cors --save
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      myCourseList: null,
      myOneCourse: null,
    };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.fetchUser();
  }

  // componentDidUpdate () {
  //   this.fetchUser();
  // }

  setUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  setCourseList = (myCourseList) => {
    this.setState({ myCourseList });
  };

  setOneCourse = (myOneCourse) => {
    this.setState({ myOneCourse });
  };

  fetchUser() {
    console.log("fetch user in APP");
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: null,
          });
        });
    }
  }

  switchRoutes() {
    return (
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              {...props}
              setTheUserInTheAppComponent={this.setUser}
              userInSession={this.state.loggedInUser}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <Signup {...props} setTheUserInTheAppComponent={this.setUser} />
          )}
        />
        <Route
          exact
          path="/instructor"
          render={(props) => (
            <Instructor {...props} setTheUserInTheAppComponent={this.setUser} />
          )}
        />
        <Route exact path="/forgot" component={Forgot} />
        <Route
          path="/reset/:token"
          component={Reset}
          setTheUserInTheAppComponent={this.setUser}
        />
        <Route
          path="/profile/:id"
          render={(props) =>
            this.state.loggedInUser ? (
              <Profile
                {...props}
                userInSession={this.state.loggedInUser}
                setTheUserInTheAppComponent={this.setUser}
              />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          exact
          path="/courses"
          render={(props) =>
            this.state.loggedInUser ? (
              <Courses
                {...props}
                userInSession={this.state.loggedInUser}
                setCourseList={this.setCourseList}
                courseList={this.state.myCourseList}
                setTheUserInTheAppComponent={this.setUser}
              />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          exact
          path="/courses/:id"
          render={(props) =>
            this.state.loggedInUser ? (
              <CourseDetails
                {...props}
                userInSession={this.state.loggedInUser}
                setCourseList={this.setCourseList}
                setOneCourse={this.setOneCourse}
                oneCourse={this.state.myOneCourse}
                setTheUserInTheAppComponent={this.setUser}
              />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          exact
          path="/courses/:courseId/assignments"
          render={(props) =>
            this.state.loggedInUser ? (
              <AddAssignments
                {...props}
                userInSession={this.state.loggedInUser}
              />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          exact
          path="/assignments/:activity/:courseId/:assignmentId"
          render={(props) => (
            <ActivityController
              {...props}
              userInSession={this.state.loggedInUser}
              setTheUserInTheAppComponent={this.setUser}
            />
          )}
        />
        <Route
          exact
          path="/assignments/:activity/:courseId"
          render={(props) => (
            <ActivityController
              {...props}
              userInSession={this.state.loggedInUser}
              setTheUserInTheAppComponent={this.setUser}
            />
          )}
        />
        <Route
          path="/assignments"
          render={(props) => (
            <ActivityController
              {...props}
              userInSession={this.state.loggedInUser}
              setTheUserInTheAppComponent={this.setUser}
            />
          )}
        />
        <Route path="/" component={LandingPage} />
      </Switch>
    );
  }

  // need to pass on {...props} if you want to use browser history to redirect: this.props.history.goBack() OR this.props.history.push('/courses')
  render() {
    // this.fetchUser();
    return (
      <div className="App">
        <Route
          path={new RegExp("^(?!.*(/assignments/)).*$")}
          render={(props) => (
            <Navbar
              {...props}
              setTheUserInTheAppComponent={this.setUser}
              userInSession={this.state.loggedInUser}
              setCourseList={this.setCourseList}
              setOneCourse={this.setOneCourse}
            />
          )}
        />
        {
          /* { this.state.loggedInUser === null ?
          setTimeout(() => {
            this.switchRoutes();
          }, 80)
          : */
          this.switchRoutes()
        }
      </div>
    );
  }
}

export default App;

{
  /*  <Route exact path="/assignments/DNAreplication" render={(props) =>  (this.state.loggedInUser ? 
 <DNAreplication {...props} userInSession={this.state.loggedInUser}/> :
<Redirect to={{ pathname: '/login', state: { from: props.location }}} />)}/> */
}
