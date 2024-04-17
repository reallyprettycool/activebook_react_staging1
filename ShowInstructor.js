import React, { Component } from "react";
import axios from "axios";

class InstructorList extends Component {
  constructor(props) {
    super(props);
    console.log("props ", props.userInSession.email);
    this.state = {
      instructors: this.props.theCourse.instructors,
      filtered: this.props.theCourse.instructors,
      searchValue: "",
      userInSessionEmail: this.props.userInSession.email,
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/courses`,
      withCredentials: true,
    });
  }

  componentDidMount() {
    this.getInstructors();
    this.sortInstructors("lastname");
  }

  getInstructors = () => {
    this.service
      .get(`/${this.props.theCourse._id}`)
      .then((responseFromApi) => {
        this.setState(
          {
            instructors: responseFromApi.data.instructors,
            filtered: responseFromApi.data.instructors,
          },
          () => this.sortInstructors("lastname")
        );
        console.log("the instructors .... ", responseFromApi.data.instructors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteInstructor = (instructorEmail) => {
    this.service
      .put(`remove-instructor/${this.props.theCourse._id}`, { instructorEmail })
      .then((responseFromApi) => {
        console.log("instructor removed .... ", responseFromApi);
        this.getInstructors();
        this.props.getCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  searchFunction = (searchTerm) => {
    let filteredList = [...this.state.instructors];
    filteredList = filteredList.filter((oneInstructor) => {
      return (
        oneInstructor.firstname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        oneInstructor.lastname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        oneInstructor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    this.setState({ filtered: filteredList });
  };

  showSearch() {
    return (
      <div className="form-group col-lg-8 col-md-12 my-2 d-flex justify-content-around">
        <label>Search</label>
        <div className="control">
          <input
            onChange={(e) => this.searchInput(e)}
            value={this.state.searchValue}
            type="text"
            className="form-control"
          />
        </div>
      </div>
    );
  }

  searchInput = (e) => {
    this.setState({ searchValue: e.target.value });
    this.searchFunction(e.target.value);
  };

  sortInstructorsBy(event) {
    const sortBy = event.target.id;
    this.sortInstructors(sortBy);
  }

  sortInstructors(sortBy) {
    if (this.state.filtered) {
      const sortedList = this.state.filtered.slice();
      sortedList.sort((a, b) => {
        const x = a[sortBy].toLowerCase();
        const y = b[sortBy].toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      // console.log(sortedList)
      this.setState({
        filtered: sortedList,
      });
    }
  }

  showInstructors() {
    if (this.state.filtered) {
      console.log("this.state.filtered ", this.state.filtered);
      return this.state.filtered.map((oneInstructor, index) => {
        return (
          <tr key={index}>
            <td>{oneInstructor.firstname}</td>
            <td>{oneInstructor.lastname}</td>
            <td>{oneInstructor.email}</td>
            <td>
              {this.state.userInSessionEmail != oneInstructor.email ? (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete this instructor: ${oneInstructor.firstname} ${oneInstructor.lastname}?`
                      )
                    )
                      this.deleteInstructor(oneInstructor.email);
                  }}
                >
                  <span className="fa fa-times"></span>
                </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.theCourse.courseName}</h2>
        {this.showSearch()}
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">
                First name{" "}
                <span
                  className="fa fa-sort-down"
                  id="firstname"
                  onClick={(e) => this.sortInstructorsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Last Name{" "}
                <span
                  className="fa fa-sort-down"
                  id="lastname"
                  onClick={(e) => this.sortInstructorsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Email{" "}
                <span
                  className="fa fa-sort-down"
                  id="email"
                  onClick={(e) => this.sortInstructorsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Remove{" "}
                <span
                  className="fa fa-sort-down"
                  id="email"
                  onClick={(e) => this.sortInstructorsBy(e)}
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>{this.showInstructors()}</tbody>
        </table>
      </div>
    );
  }
}

export default InstructorList;
