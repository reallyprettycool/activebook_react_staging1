import React, { Component } from "react";
import axios from "axios";

class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailList: "",
      updatedList: false,
      missing: false,
      error: false,
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/courses`,
      withCredentials: true,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const courseID = this.props.theCourse._id;
    let listOfEmails = this.state.emailList;
    if (
      listOfEmails.includes(",") ||
      listOfEmails.includes(" ") ||
      listOfEmails.includes(";")
    ) {
      const separators = [" ,", " ;", ",", ";", " "];
      listOfEmails = listOfEmails.split(new RegExp(separators.join("|"), "g"));
    } else {
      listOfEmails = listOfEmails.split();
    }
    listOfEmails = listOfEmails.filter(
      (oneEmail) => oneEmail && oneEmail.length > 1
    );
    listOfEmails = listOfEmails.map((oneEmail) => oneEmail.toLowerCase());
    console.log("email list: ", listOfEmails);
    this.service
      .post(`/add-students/${courseID}`, { listOfEmails })
      .then((response) => {
        console.log("the response....:", response);
        this.props.getCourse(); // updates course in APP and Course Details state
        // this.props.toggleForm();
        let updatedList = [];
        let missingEmails = [];
        if (response.data.updatedList && response.data.updatedList.length > 0) {
          updatedList = response.data.updatedList;
        }
        if (response.data.missingList && response.data.missingList.length > 0) {
          missingEmails = response.data.missingList;
        }
        console.log(updatedList, missingEmails);
        this.setState({
          emailList: [],
          updatedList: updatedList,
          missing: missingEmails,
          error: "",
        });
      })
      .catch((err) => {
        console.log("the error ", err);

        this.setState({
          error: err.response.data.message,
          missing: false,
          updatedList: false,
        });
      });
  };

  postList = () => {
    if (this.state.updatedList.length > 0) {
      return (
        <p
          className="row py-2"
          style={{ backgroundColor: "green", color: "white" }}
        >
          <strong>Students added to course: </strong>
          {this.state.updatedList.map((oneEmail, index) => {
            return (
              <span key={index}>
                {" "}
                {"\u00A0"} {oneEmail},{" "}
              </span>
            );
          })}
        </p>
      );
    }
  };

  postMissing = () => {
    if (this.state.missing.length > 0) {
      return (
        <p
          className="row py-2"
          style={{ backgroundColor: "yellow", color: "black" }}
        >
          <strong>
            The following emails didn't match any student account:
          </strong>
          {this.state.missing.map((oneEmail, index) => {
            return (
              <span key={index}>
                {" "}
                {"\u00A0"} {oneEmail},
              </span>
            );
          })}
          {"\u00A0"} These students will be added after they create a student account.
        </p>
      );
    }
  };

  handleChange = (event) => {
    // event.preventDefault()
    const { name, value } = event.target;
    //   ^ this is just fancy syntax for the 2 lines below
    //   const name = event.target.name;
    //   const value = event.target.value;
    // const theList = value.split(',').join(', ')
    // this.setState( prevState => ({ newUser :
    //   {...prevState.emailList, name: value
    //   }
    // }))
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container mt-2">
        <h2>{this.props.theCourse.courseName}</h2>
        {this.state.updatedList && this.postList()}
        {this.state.missing && this.postMissing()}
        <h3>Add students using their email account</h3>
        <p>
          Students with an active student account will be added immediately,
          students without an account will be added when they create an account
          using the email you provide here.
        </p>

        {this.state.error && (
          <p
            className="row py-2"
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: 600,
              paddingLeft: "5px",
            }}
          >
            {this.state.error}
          </p>
        )}

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="emailList">Enter students' email:</label>
            <input
              value={this.state.emailList}
              onChange={(e) => this.handleChange(e)}
              className="form-control"
              required
              name="emailList"
              placeholder="Use commas to separate student emails."
            />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddStudents;
