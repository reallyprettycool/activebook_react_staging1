import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthService from "../auth/auth-service";
import EditCourse from "./EditCourse";
import AddStudents from "./AddStudents";
import ShowStudents from "./ShowStudents";
import ShowInstructor from "./ShowInstructor";
import CreateContent from "./createContent";
import AddAssignments from "../assignments/AddAssignment";
import ShowAssignments from "../assignments/ShowAssigments";
import EditAssignments from "../assignments/EditAssignment";
import AddInstructors from "../course/AddInstructors";
import ShowGrades from "../assignments/ShowGrades";
import Modules from "./module/Modules";

// been getting error 304 Not Modified when trying to reload this page.

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theCourse: this.props.oneCourse,
      editCourse: false,
      addStudents: false,
      whatToShow: "showCourse", // Should be "showCourse" for production
      theAssignment: {},
      loggedInUser: this.props.userInSession,
      redirect: false,
    };

    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    this.authService = new AuthService();
    this.courseActions = [
      {
        id: "editCourse",
        fafaClass: "fa fa-edit",
        text: "Edit this course"
      },
      {
        id: "modules",
        fafaClass: "fa fa-folder",
        text: "Modules",
      },
      {
        id: "addAssignments",
        fafaClass: "fa fa-folder",
        text: "Add assignments",
      },
      { id: "addStudents", fafaClass: "fa fa-user-plus", text: "Add students" },
      {
        id: "addStudents",
        fafaClass: "fa fa-user-plus",
        text: "Add students"
      },
      {
        id: "showStudents",
        fafaClass: "fa fa-address-card",
        text: "View students",
      },
      {
        id: "showAssignments",
        fafaClass: "fa fa-list-ul",
        text: "View assignments",
      },
      { id: "showGrades", fafaClass: "fa fa-check", text: "View grades" },
      {
        id: "manageInstructors",
        fafaClass: "fa fa-plus-square",
        text: "Add Instructors",
      },
      {
        id: "showInstructors",
        fafaClass: "fa fa-graduation-cap",
        text: "View Instructors",
      },
      {
        id: "createContent",
        fafaClass: "fa fa-pencil-square-o",
        text: "Create Content",
      },
    ];
  }

  getOneCourse = () => {
    // if( this.state.loggedInUser === null ) {
    //   this.fetchUser()
    // } else {
    // console.log('the user: ', this.state.loggedInUser.firstname)
    console.log("getting course");
    const { params } = this.props.match;
    this.service
      .get(`/courses/${params.id}`)
      .then((responseFromApi) => {
        this.setState({
          theCourse: responseFromApi.data,
        });
        this.props.setOneCourse(responseFromApi.data); // set the course in the APP comp state
        // console.log('late policy ', responseFromApi.data.assignments[0].latePolicy)
      })
      .catch((err) => {
        console.log("get course error ", err);
        // console.log('response headers: ',err.response.headers);
      });

    console.log('the course: ', this.state.theCourse)
    // }
  };

  componentDidMount() {
    // const {params} = this.props.match;
    // console.log('Props have the user? ', this.props.userInSession.firstname)
    // console.log('Props have a course? ', this.props.oneCourse)
    // if( this.props.userInSession === null ) {
    this.fetchUser();
    // } else if (!this.props.oneCourse || this.props.oneCourse._id !== params){
    //   this.getOneCourse()
    // }

  }

  fetchUser() {
    // console.log('fetching user')
    this.authService
      .loggedin()
      .then((response) => {
        this.setState({ loggedInUser: response, redirect: false });
        this.props.setTheUserInTheAppComponent(response);
        // console.log ('fetch user success ', response)
        this.getOneCourse();
      })
      .catch((err) => {
        console.log("error ", err);
        this.setState({ redirect: true });
        this.props.setTheUserInTheAppComponent(null);
      });
  }

  toggleForms = (e) => {
    this.setState({ whatToShow: e.target.id });
  };

  toggleFormsFromComponent = (showMe = "showCourse") => {
    this.setState({ whatToShow: showMe });
  };

  // setAttempts = (attemptArray) => {
  //   this.setState({theAttempts: attemptArray})
  // }

  renderForms = () => {
    if (
      this.state.theCourse &&
      this.state.loggedInUser &&
      this.state.loggedInUser.role === "instructor"
    ) {
      switch (this.state.whatToShow) {
        case "showCourse":
          return this.showCourse();
        case "editCourse":
          return (
            <EditCourse
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "addStudents":
          return (
            <AddStudents
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "showStudents":
          return (
            <ShowStudents
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "modules":
            return (
                <Modules
                    theCourse={this.state.theCourse}
                    getCourse={this.getOneCourse}
                    toggleForm={this.toggleFormsFromComponent}
                    {...this.props}
                />
            )
        case "addAssignments":
          return (
            <AddAssignments
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "showInstructors":
          return (
            <ShowInstructor
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "manageInstructors":
          return (
            <AddInstructors
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "editAssignments":
          return (
            <EditAssignments
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              theAssignment={this.state.theAssignment}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        case "createContent":
          return <CreateContent
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
          />;
        case "showAssignments":
          return this.showAssignments();
        case "showGrades":
          return (
            <ShowGrades
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          ); //  {...props} => so we can have 'this.props.history' in Edit.js
        default:
          return this.showCourse();
      }
    } else {
      return this.showCourse();
    }
  };

  setAssignment = (assigmentID) => {
    const thisAssignment = this.state.theCourse.assignments.filter(
      (oneAssigment) => {
        return oneAssigment._id === assigmentID;
      }
    );
    // console.log(thisAssignment)
    this.setState({ theAssignment: thisAssignment }, () => {
      this.toggleFormsFromComponent("editAssignments"); // callback function
    });
  };

  showAssignments() {
    if (this.state.theCourse) {
      if (this.state.theCourse.assignments) {
        return (
          <ShowAssignments
            theCourse={this.state.theCourse}
            whichAssignment={this.setAssignment}
            toggleForm={this.toggleFormsFromComponent}
            userInSession={this.state.loggedInUser}
            getCourse={this.getOneCourse}
            {...this.props}
          />
        ); //  {...props} => so we can have 'this.props.history' in Edit.js
      } else {
        return <h3>This course doesn't have any assigments yet</h3>;
      }
    }
  }

  // DELETE Course:
  deleteCourse = () => {
    const { params } = this.props.match;
    this.service
      .delete(`/courses/${params.id}`)
      .then(() => {
        this.service
          .get("/courses")
          .then((responseFromApi) => {
            // console.log('the response ', responseFromApi.data)
            this.setState({
              courseList: responseFromApi.data,
            });
            this.props.setCourseList(responseFromApi.data); // set course list in the APP comp state
            this.props.history.push("/courses"); // !!!
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  showCourse() {
    if (this.state.theCourse) {
      return (
        <div className="card mt-4 flex-row flex-wrap">
          <div className="card-header col-lg-5 col-md-4 col-sm-12">
            <img
              className="card-img-top imgForm"
              src={this.state.theCourse.courseImage}
              alt="course logo"
            />
          </div>
          <div className="card-body pt-2 col-lg-7 col-md-8 col-sm-12">
            <h5 className="card-title">{this.state.theCourse.courseName}</h5>
            {this.state.loggedInUser.role === "student" && (
              <h6 className="card-subtitle mb-2 text-muted">
                Instructor: {this.state.theCourse.instructors[0].firstname}{" "}
                {this.state.theCourse.instructors[0].lastname}
              </h6>
            )}
            <p className="card-text">{this.state.theCourse.description}</p>
            <p className="card-text">
              Availability dates: {this.state.theCourse.startDate} to{" "}
              {this.state.theCourse.endDate}
            </p>
            {this.state.loggedInUser.role === "instructor" && (
              <p className="card-text">
                Course number: <b>{this.state.theCourse.courseCode}</b> send
                this code to students so they can self-enroll in this course
              </p>
            )}
          </div>
        </div>
      );
    }
  }

  showCourseActions() {
    let addClass = "";
    if (
      this.state.theCourse &&
      this.state.loggedInUser &&
      this.state.loggedInUser.role === "instructor"
    ) {
      return (
        <div className="list-group">
          {/* <Link className="list-group-item list-group-item-action" to={`/courses/${this.state.theCourse._id}/assignments`}><span className="fa fa-folder"></span> Add assignments</Link> */}
          {this.courseActions.map((oneAction, index) => {
            oneAction.id === this.state.whatToShow
              ? (addClass = "active list-group-item list-group-item-action")
              : (addClass = "list-group-item list-group-item-action");
            return (
              <p
                key={index}
                className={addClass}
                onClick={(e) => this.toggleForms(e)}
                id={oneAction.id}
              >
                <span className={oneAction.fafaClass}></span> {oneAction.text}
              </p>
            );
          })}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this course? \n\n This will delete all student data \n\n This action cannot be undone"
                )
              )
                this.deleteCourse();
            }}
            className="list-group-item list-group-item-action"
          >
            <span className="fa fa-trash"></span> Delete this course
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        )}
        <div className="container-fluid mt-2">
          <div className=" row d-flex justify-content-end mb-2">
            <Link className="btn btn-secondary mr-2" to="/courses">
              <span className="fa fa-angle-left"></span> Back to courses
            </Link>
            {this.state.whatToShow !== "showCourse" && (
              <button
                className="btn btn-secondary mr-2"
                onClick={() => this.toggleFormsFromComponent()}
              >
                <span className="fa fa-times"></span> Cancel
              </button>
            )}
          </div>

          <div className="row justify-content-between">
            <div className="col-lg-3 col-md-4 col-sm-12 pt-4">
              {this.state.loggedInUser &&
              this.state.loggedInUser.role === "instructor"
                ? this.showCourseActions()
                : this.showCourse()}
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 ">
              {this.state.loggedInUser &&
              this.state.loggedInUser.role === "instructor"
                ? this.renderForms()
                : this.showAssignments()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetails;
