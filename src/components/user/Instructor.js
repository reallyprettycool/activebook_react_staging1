// user/Signup.js

import React, { Component } from "react";
import AuthService from "../auth/auth-service";
import { Link } from "react-router-dom";

class Instructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirm: "",
      institution: "",
      title: "",
      error: false,
    };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const regex1 = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$");
    if (!this.state.email || !regex1.test(this.state.email)) {
      this.setState({ error: "Please enter your email address" });
    } else if (!this.state.firstname || !this.state.lastname) {
      this.setState({ error: "Please enter your first and last name" });
    } else if (!this.state.institution || !this.state.title) {
      this.setState({ error: "Please enter your institution and title" });
    } else if (this.state.confirm !== this.state.password) {
      this.setState({
        error: "Please confirm your password and check that they match",
      });
    } else {
      const email = this.state.email.toLowerCase();
      const password = this.state.password;
      const firstname = this.state.firstname;
      const lastname = this.state.lastname;
      const confirm = this.state.confirm;
      const institution = this.state.institution;
      const title = this.state.title;
      this.service
        .instructorSignup(
          email,
          password,
          confirm,
          firstname,
          lastname,
          institution,
          title
        )
        .then((response) => {
          this.setState({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            confirm: "",
            institution: "",
            title: "",
            error: false,
          });
          console.log("the user object 0-0-0", response);
          if ("message" in response) {
            this.setState({ error: response });
          } else {
            this.props.setTheUserInTheAppComponent(response);
            this.props.history.push("/courses"); // redirect must pass the props!!!
          }
        })
        .catch((err) => {
          this.setState({ error: err.response.data.message });
        });
    } // end of else statement
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: false });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 d-flex justify-content-end">
          <p>
            Are you a student?{" "}
            <Link className="nav-item nav-link" to="/signup">
              Go back to student sign up
            </Link>
          </p>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h1>Request instructor account</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                className="form-control"
                type="text"
                name="firstname"
                value={this.state.firstname}
                required
                placeholder="First name"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                className="form-control"
                type="text"
                name="lastname"
                value={this.state.lastname}
                required
                placeholder="Last name"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="institution">Institution</label>
              <input
                className="form-control"
                type="text"
                name="institution"
                value={this.state.institution}
                required
                placeholder="School or Institution"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.title}
                required
                placeholder="Your title"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                required
                placeholder="email address"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                required
                placeholder="Password"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm password</label>
              <input
                className="form-control"
                type="password"
                name="confirm"
                value={this.state.confirm}
                required
                placeholder="Confirm password"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            {this.state.error && (
              <p style={{ color: "red" }}>{this.state.error.message}</p>
            )}
            <button className="btn btn-primary">Submit</button>
          </form>

          <p>
            Already have account?
            <Link to={"/"}> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Instructor;
