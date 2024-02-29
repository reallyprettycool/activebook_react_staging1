import React, { Component } from "react";
import { RingLoader } from "react-spinners";

class CreatedActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loggedInUser: props.userInSession,
      redirect: false,
      spinner: false,
    };

    this.getActivities = props.getActivities;

  }

  onPreview = (activityId) => {
    //check for activity type and render the appropriate component
  }

  // This function renders a table of all activities created for this course
  showActivities() {
    if (this.state.activities) {
      return (
          <div className={'container-fluid'}>
            <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope={"col-2"}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.activities.map((activity) => {
                    return (
                      <tr key={activity._id}>
                        <td>{activity.title}</td>
                        <td>{activity.description}</td>
                        <td>
                          <button className="btn btn-primary m-1">Edit</button>
                          <button className="btn btn-info m-1" onClick={this.onPreview(activity._id)}>Preview</button>
                          <button className="btn btn-danger m-1" >Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
            </table>
          </div>
      )
    }
  }

  componentDidMount() {
    this.setState({spinner: true})
    this.getActivities((response) => {
        this.setState({
          activities: response.data,
          spinner: false
        });
        // console.log("the response ", response.data);
    });
  }
  render() {
    return (
      <div className="container-xs text-center mr-md-5 p-2 border">
        <h2>Created Activities</h2>
        <div className="d-flex justify-content-center">
          {this.showActivities()}
          {this.state.spinner && (
              <div className="spinner">
                <div className="spinner-container">
                  <RingLoader
                      color="#36D7B7"
                      loading={this.state.spinner}
                      size={200}
                  />
                </div>
              </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreatedActivities;
