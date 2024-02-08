import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AdminUsers from "./adminUsers";
import AdminInstructor from "./adminInstructor";
import AdminActiveCourses from "./adminActiveCourses";
// been getting error 304 Not Modified when trying to reload this page.

class AdminOptions extends Component {
  courseActions;
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userInSession,
      whatToShow: "users",
      redirect: false,
    };
    this.courseActions = [
      {
        id: "users",
        fafaClass: "fa fa-edit",
        text: "Users",
      },
      {
        id: "instructors",
        fafaClass: "fa fa-folder",
        text: "Instructors",
      },
      {
        id: "course",
        fafaClass: "fa fa-book",
        text: "Active Courses",
      },
    ];
  }
  renderForms = () => {
    if (this.state.loggedInUser && this.state.loggedInUser.role === "admin") {
      console.log("this.state.whatToShow ", this.state.whatToShow);
      switch (this.state.whatToShow) {
        case "users":
          return (
            <AdminUsers
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          );
        case "instructors":
          return (
            <AdminInstructor
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          );
        case "course":
          return (
            <AdminActiveCourses
              theCourse={this.state.theCourse}
              getCourse={this.getOneCourse}
              toggleForm={this.toggleFormsFromComponent}
              {...this.props}
            />
          );
      }
    }
  };
  showAdminActions() {
    let addClass = "";
    if (this.state.loggedInUser && this.state.loggedInUser.role === "admin") {
      return (
        <div className="list-group button-whith">
          {/* <Link className="list-group-item list-group-item-action" to={`/courses/${this.state.theCourse._id}/assignments`}><span className="fa fa-folder"></span> Add assignments</Link> */}
          {this.courseActions.map((oneAction, index) => {
            false
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
        </div>
      );
    }
  }
  toggleForms = (e) => {
    this.setState({ whatToShow: e.target.id });
  };
  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        )}
        <div className="mt-2">
          <div className="admin-container">
            <div className="">{this.showAdminActions()}</div>
            <div className="action-user">{this.renderForms()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminOptions;
