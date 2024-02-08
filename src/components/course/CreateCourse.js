import React, { Component } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import "../../App.css";
import moment from "moment-timezone";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      description: "",
      startDate: "",
      endDate: "",
      existingCourse: "", // New field for copying previous course
      courseImage: "",
      error: false,
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/courses`,
      withCredentials: true,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      courseName,
      description,
      startDate,
      endDate,
      existingCourse,
      courseImage,
    } = this.state;
    const timezone = moment.tz.guess();
    console.log("timezone ", timezone);
    console.log("moment end date ", moment(endDate));
    if (moment(endDate).isBefore(startDate)) {
      this.setState({ error: "The start date must be prior to the end date" });
    } else {
      const postData = {
        courseName,
        description,
        startDate,
        endDate,
        existingCourse,
        courseImage,
        timezone,
      };

      postData.courseName = courseName;

      // you need to include credentials if you are using req.user in Express ------------------------------------------- `|´
      this.service
        .post("/create", postData, { withCredentials: true })
        .then(() => {
          this.props.getData(); // request all course data from Courses.js
          this.setState({
            courseName: "",
            description: "",
            startDate: "",
            endDate: "",
            existingCourse: "",
            courseImage: "",
          });
          this.props.toggleForm();
        })
        .catch((err) => {
          this.setState({ error: err.response.data.message });
        });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target; // this is just fancy syntax for  const name = event.target.name; const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container mt-2 mb-5">
        <div className="d-flex justify-content-end mb-2">
          {/* <Link className="btn btn-secondary" to='/courses'><span className="fa fa-angle-left"></span>Back to courses</Link> */}
          <button
            className="btn btn-secondary"
            onClick={() => this.props.toggleForm()}
          >
            Cancel
          </button>
        </div>

        <h2>Create new course</h2>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}

          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              className="form-control"
              value={this.state.courseName}
              onChange={(e) => this.handleChange(e)}
              type="text"
              name="courseName"
              required
              placeholder="Course name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Course Description</label>
            <input
              className="form-control"
              type="textarea"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
              name="description"
              required
              placeholder="Course description"
              rows="3"
              maxLength="150"
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="startDate">Start Date</label>
              <input
                className="form-control"
                value={this.state.startDate}
                onChange={(e) => this.handleChange(e)}
                type="date"
                name="startDate"
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="endDate">End Date</label>
              <input
                className="form-control"
                type="date"
                value={this.state.endDate}
                onChange={(e) => this.handleChange(e)}
                name="endDate"
                required
              />
            </div>
          </div>

          {/*  created new text field using create course button. field asks for previous course number */}
          <div className="form-group">
            <label htmlFor="existingCourse">Copy Previous Course</label>
            <input
              className="form-control"
              type="text"
              value={this.state.existingCourse}
              onChange={(e) => this.handleChange(e)}
              name="existingCourse"
              placeholder="If you want to copy a course from a previous semester you can enter its code here"
            />
          </div>

          <p>Select course image:</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              onChange={(e) => this.handleChange(e)}
              name="courseImage"
              value="/images/biology-1.jpg"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              {" "}
              <img
                className="imgForm"
                src="/images/biology-1.jpg"
                alt="neuron"
              />{" "}
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              onChange={(e) => this.handleChange(e)}
              name="courseImage"
              value="/images/biology-2.jpg"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              {" "}
              <img
                className="imgForm"
                src="/images/biology-2.jpg"
                alt="bacteria cells"
              />{" "}
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              onChange={(e) => this.handleChange(e)}
              name="courseImage"
              value="/images/Biology-3.jpg"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              {" "}
              <img
                className="imgForm"
                src="/images/Biology-3.jpg"
                alt="frog and leaf"
              />{" "}
            </label>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddCourse;
