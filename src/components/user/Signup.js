// user/Signup.js

import React, { Component } from "react";
import AuthService from "../auth/auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      pantherID: "",
      confirm: "",
      confirmEmail: "",
      error: false,
    };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const regex1 = new RegExp(
      "^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]{2,}(?:.[A-Za-z]+)?$"
    );
    if (!this.state.email || !regex1.test(this.state.email)) {
      this.setState({ error: "Please enter a valid email address" });
    } else if (this.state.email.indexOf(".edu") < 0) {
      this.setState({ error: "Please use a valid student email with .edu" });
    } else if (!this.state.firstname || !this.state.lastname) {
      this.setState({ error: "Please enter your first and last name" });
    } else if (!this.state.pantherID) {
      this.setState({ error: "Please enter your student ID" });
    } else if (this.state.confirm !== this.state.password) {
      this.setState({
        error: "Please confirm your password and check that they match",
      });
    } else if (
      this.state.confirmEmail.toLowerCase() !== this.state.email.toLowerCase()
    ) {
      this.setState({
        error: "Please confirm your email and check that they match",
      });
    } else {
      const email = this.state.email.toLowerCase();
      const password = this.state.password;
      const firstname = this.state.firstname;
      const lastname = this.state.lastname;
      const pantherID = this.state.pantherID;
      const confirm = this.state.confirm;
      this.service
        .signup(email, password, confirm, firstname, lastname, pantherID)
        .then((response) => {
          this.setState({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            pantherID: "",
            confirm: "",
            confirmEmail: "",
            error: false,
          });
          console.log("the user object 0-0-0", response);
          console.log("the base URL...", this.service.BASE_URL);
          if ("message" in response) {
            // console.log('error came in the response..', response.data)
            this.setState({ error: response.data.message });
          } else {
            this.props.setTheUserInTheAppComponent(response);
            this.props.history.push("/courses"); // redirect !!!
          }
        })
        .catch((err) => {
          // console.log('error came in the CATCH..', err.response.data)
          this.setState({ error: err.response.data.message });
        });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: false });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div class="col-12 d-flex justify-content-end">
          <p>
            Are you the course instructor?{" "}
            <Link className="nav-item nav-link" to="/instructor">
              Request instructor account
            </Link>
          </p>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h1>Sign up for student account</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label for="firstname">First name</label>
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
              <label for="lastname">Last name</label>
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
              <label for="email">Email address:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                required
                placeholder="email address @fiu.edu"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="email">Confirm email address:</label>
              <input
                className="form-control"
                type="email"
                name="confirmEmail"
                value={this.state.confirmEmail}
                required
                placeholder="retype email address"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="pantherID">Student ID:</label>
              <input
                className="form-control"
                type="text"
                name="pantherID"
                value={this.state.pantherID}
                required
                placeholder="Panther ID"
                onChange={(e) => this.handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="password">Password</label>
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
              <label for="confirm">Confirm password</label>
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
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}
            <button className="btn btn-primary">Submit</button>
          </form>

          <p>
            Already have account?
            <Link to={"/login"}> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
