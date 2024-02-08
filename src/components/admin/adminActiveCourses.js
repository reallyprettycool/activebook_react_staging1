import React, { Component } from "react";
import "../../App.css";
import AuthService from "../auth/auth-service";
import axios from "axios";
class AdminActiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userInSession,
      redirect: false,
      pageSize: 10,
      page: 1,
      searchItem: "",
      searchValue: "",
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
        this.getAllCourses();
        console.log("getAllCourses", response);
      })
      .catch((err) => {
        this.setState({ redirect: true });
      });
  }
  componentDidMount() {
    this.fetchUser();
  }
  getAllCourses = () => {
    this.service
      .get("/admin/activeCourses", {
        params: {
          page: this.state.page,
          pageSize: this.state.pageSize,
          filterField: this.state.searchItem,
          filterValue: this.state.searchValue,
        },
      })
      .then((responseFromApi) => {
        console.log("the response ", responseFromApi.data);
        this.setState({
          users: responseFromApi.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showCourse() {
    if (this.state.users) {
      return this.state.users.map((oneUser, index) => {
        return (
          <tr key={index}>
            <td>{oneUser.courseName}</td>
            <td>{oneUser.description}</td>
            <td>{oneUser.startDate}</td>
            <td>{oneUser.endDate}</td>
          </tr>
        );
      });
    }
  }
  deleteStudent = (studentEmail) => {};

  showSearch() {
    return (
      <div className="form-group col-lg-8 col-md-12 my-2 d-flex justify-content-around">
        <div class="dropdown col-6">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Search Item: {this.state.searchItem}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("courseName");
              }}
            >
              Name
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("description");
              }}
            >
              Description
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("startDate");
              }}
            >
              Start Date
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("endDate");
              }}
            >
              End Date
            </button>
          </div>
        </div>
        <div className="control" style={{ display: "flex" }}>
          <input
            onChange={(e) => this.searchInput(e)}
            value={this.state.searchValue}
            type="text"
            className="form-control"
          />
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.search();
            }}
          >
            <span className="fa fa-search"></span>
          </button>
        </div>
      </div>
    );
  }

  searchInput = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  pageItems = async (e) => {
    await this.setState({ pageSize: e });
    this.getAllCourses();
  };

  search = async () => {
    this.getAllCourses();
  };

  pageNumber = async (e) => {
    await this.setState({ page: e });
    this.getAllCourses();
  };
  pageNext = async (e) => {
    await this.setState({ page: this.state.page + e });
    this.getAllCourses();
  };
  pagePrevious = async (e) => {
    if (this.state.page > 1) {
      await this.setState({ page: this.state.page - e });
      this.getAllCourses();
    }
  };

  itemSearch = async (e) => {
    await this.setState({ searchItem: e });
  };

  render() {
    return (
      <div>
        {this.showSearch()}
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">
                Name{" "}
                <span
                  className="fa fa-sort-down"
                  id="firstname"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Description{" "}
                <span
                  className="fa fa-sort-down"
                  id="lastname"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Start Date{" "}
                <span
                  className="fa fa-sort-down"
                  id="email"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                End Date{" "}
                <span
                  className="fa fa-sort-down"
                  id="role"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>{this.showCourse()}</tbody>
        </table>
        <div className="row">
          <nav
            className="col-6"
            aria-label="Page navigation example"
            style={{ backgroundColor: "#ffffff" }}
          >
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => {
                    this.pagePrevious(1);
                  }}
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => {
                    this.pageNumber(1);
                  }}
                >
                  1
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => {
                    this.pageNumber(2);
                  }}
                >
                  2
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => {
                    this.pageNumber(3);
                  }}
                >
                  3
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  onClick={() => {
                    this.pageNext(1);
                  }}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div class="dropdown col-6">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Items per page: {this.state.pageSize}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button
                class="dropdown-item"
                type="button"
                onClick={() => {
                  this.pageItems(10);
                }}
              >
                10
              </button>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => {
                  this.pageItems(20);
                }}
              >
                20
              </button>
              <button
                class="dropdown-item"
                type="button"
                onClick={() => {
                  this.pageItems(50);
                }}
              >
                50
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminActiveCourses;
