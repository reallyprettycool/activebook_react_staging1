import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";
import CreateCourse from "./CreateCourse";
import AuthService from "../auth/auth-service";
import AdminOptions from "../admin/adminOptions";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: this.props.courseList,
      addCourse: false,
      createCourse: false,
      loggedInUser: this.props.userInSession,
      redirect: false,
    };
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });
    this.serviceAuth = new AuthService();
  }

  fetchUser() {
    this.serviceAuth
      .loggedin()
      .then((response) => {
        this.setState({ loggedInUser: response, redirect: false });
        this.props.setTheUserInTheAppComponent(response);
        this.getAllCourses();
      })
      .catch((err) => {
        // console.log ('error ', err)
        // console.log('catch in Courses fetch user')
        this.setState({ redirect: true });
        this.props.setTheUserInTheAppComponent(null);
      });
  }

  // you need to include credentials if you are using req.user in Express
  getAllCourses = () => {
    this.service
      .get("/courses")
      .then((responseFromApi) => {
        // console.log('the response ', responseFromApi.data)
        this.setState({
          courseList: responseFromApi.data,
        });
        this.props.setCourseList(responseFromApi.data); // set course list in the APP comp state
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    // console.log ('the props....', this.props.courseList)
    this.fetchUser();
  }

  toggleAdd() {
    this.setState({ addCourse: !this.state.addCourse });
  }

  toggleCreate() {
    this.setState({ createCourse: !this.state.createCourse });
  }

  showCourses() {
    if (this.state.courseList && this.state.courseList.length > 0) {
      return this.state.courseList.map((course, index) => {
        return (
          <div
            className="card col-lg-3 col-md-5 col-sm-10 mr-2 mt-2"
            key={index}
          >
            <img
              className="card-img-top"
              src={course.courseImage}
              alt="course icon"
            />
            <h5 className="card-title">{course.courseName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Instructor: {course.instructors[0].firstname}{" "}
              {course.instructors[0].lastname}
            </h6>
            <p className="card-text">Availability dates:</p>
            <p className="card-text">
              {course.startDate} to {course.endDate}
            </p>
            <Link to={`/courses/${course._id}`}>
              <h3>See details</h3>
            </Link>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="container mt-2">
        {this.state.redirect && (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        )}
        <h1>Dashboard</h1>
        <div className="d-flex justify-content-end mb-2">
          {this.props.userInSession.role === "student" &&
            !this.state.addCourse && (
              <button
                className="btn btn-primary"
                onClick={() => this.toggleAdd()}
              >
                <span className="fa fa-plus"></span> Add course
              </button>
            )}
          {this.state.addCourse && (
            <AddCourse
              getData={() => this.getAllCourses()}
              toggleForm={() => this.toggleAdd()}
            />
          )}

          {this.props.userInSession.role === "instructor" &&
            !this.state.createCourse && (
              <button
                className="btn btn-primary"
                onClick={() => this.toggleCreate()}
              >
                <span className="fa fa-plus"></span> Create course
              </button>
            )}
          {this.state.createCourse && (
            <CreateCourse
              getData={() => this.getAllCourses()}
              toggleForm={() => this.toggleCreate()}
            />
          )}

          {this.props.userInSession.role === "admin" ? (
            <AdminOptions userInSession={this.state.loggedInUser} />
          ) : (
            ""
          )}
        </div>
        <div className="row">{this.showCourses()}</div>
      </div>
    );
  }
}

export default Courses;
