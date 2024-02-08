import React, { Component } from "react";
import "../../App.css";
import AuthService from "../auth/auth-service";
import axios from "axios";

class AdminUsers extends Component {
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
        this.getAllAdminUser();
        console.log("getAllAdminUser", response);
      })
      .catch((err) => {
        this.setState({ redirect: true });
      });
  }
  componentDidMount() {
    this.fetchUser();
  }
  getAllAdminUser = () => {
    this.service
      .get("/admin/user", {
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
        this.props.setCourseList(responseFromApi.data); // set course list in the APP comp state
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showUser() {
    if (this.state.users) {
      return this.state.users.map((oneUser, index) => {
        return (
          <tr key={index}>
            <td>{oneUser.firstname}</td>
            <td>{oneUser.lastname}</td>
            <td>{oneUser.email}</td>
            <td>{oneUser.role}</td>
            <td>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete this student: ${oneUser.firstname} ${oneUser.lastname}?`
                    )
                  )
                    this.deleteStudent(oneUser.email);
                }}
              >
                <span className="fa fa-times"></span>
              </button>
            </td>
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
                this.itemSearch("firstname");
              }}
            >
              First Name
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("lastname");
              }}
            >
              Last Name
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("email");
              }}
            >
              Email
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                this.itemSearch("role");
              }}
            >
              Role
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
    this.getAllAdminUser();
  };
  search = async () => {
    this.getAllAdminUser();
  };

  pageNumber = async (e) => {
    await this.setState({ page: e });
    this.getAllAdminUser();
  };
  pageNext = async (e) => {
    await this.setState({ page: this.state.page + e });
    this.getAllAdminUser();
  };
  pagePrevious = async (e) => {
    if (this.state.page > 1) {
      await this.setState({ page: this.state.page - e });
      this.getAllAdminUser();
    }
  };

  itemSearch = async (e) => {
    await this.setState({ searchItem: e });
  };

  render() {
    return (
      <div>
        {this.showSearch()}
        <button className="btn btn-primary mb-2">Create User</button>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">
                First Name{" "}
                <span
                  className="fa fa-sort-down"
                  id="firstname"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Last Name{" "}
                <span
                  className="fa fa-sort-down"
                  id="lastname"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Email{" "}
                <span
                  className="fa fa-sort-down"
                  id="email"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Role{" "}
                <span
                  className="fa fa-sort-down"
                  id="role"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
              <th scope="col">
                Remove{" "}
                <span
                  className="fa fa-sort-down"
                  id="remove"
                  onClick={(e) => this.sortStudentsBy(e)}
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>{this.showUser()}</tbody>
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

export default AdminUsers;
