import React, { Component } from "react";
import { RingLoader } from "react-spinners";
import PreviewActivityModal from "../../utils/previewActivty/PreviewActivityModal";
import DragAndDropActivity from "../../activities/created/dragAndDrop/DragAndDropActivity";

/**
 * This component is used to display all activities created for a course.
 * It is used in the CreateContent component.
 *
 * @param {function} showItem - This function changes the section of the CreateContent component being shown.
 * @param {function} getActivityInfo - This function returns a list of all activities.
 * @param {function} getActivity - This function returns a single activity.
 * @param {function} setEdit - This function sets the activity wishing to be edited on the CreateContent component.
 *
 * @returns {JSX} - Returns a table of all activities created for a course.
 * @author Franklin Neves Filho
 */

class CreatedActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activityInfo: [],
        loggedInUser: props.userInSession,
        redirect: false,
        spinner: false,
        displayPreview: false,
        getPreviewActivity: null
    };

    this.showItem = props.showItem;
    this.getActivity = props.getActivity;
    this.getActivityInfo = props.getActivityInfo;
    this.setEdit = props.setEdit;
    this.deleteActivity = props.deleteActivity;
  }

  onPreview = (activityId) => {
      this.getActivity(activityId, (response) => {
          this.setState({
                displayPreview: true,
                previewActivity: response.data
          });
      });
  }

  getPreviewActivity = () => {
      let activityComponent;
      const activity = this.state.previewActivity;

      switch(activity.activityType) {
            case "dragAndDrop":
                activityComponent = <DragAndDropActivity activity={activity} />;
                break;
            default:
                activityComponent = <div>Activity type not found</div>;
      }

      return activityComponent;
  }

  previewOnClose = () => {
        this.setState({displayPreview: false});
  }

  onEdit = (activityId) => {
    this.getActivity(activityId, (response) => {
        this.setEdit(response.data);
    });
  }

  onDelete = (activityId) => {
        this.deleteActivity(activityId, (response) => {
            console.log(response.data);
            this.getActivityInfo((response) => {
                this.setState({
                    activityInfo: response.data
                });
            });
        });

  }

  dropdownStyle = {
      minWidth: 'unset',
      width: 'auto',
      textAlign: 'center',
      padding: '0',
      margin: '0',
      marginTop: '0.5rem'
  }

  actionButtons = (activityId) => {
      return (
          <div className="dropdown rounded align-items-center justify-content-center">
              <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Actions
              </button>
              <div className="dropdown-menu dropdown-menu-right border shadow-lg"
                     style={this.dropdownStyle}
                   aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item mb-1 rounded-top bg-primary"
                     onClick={()=> this.onEdit(activityId)}>Edit</button>
                  <button className="dropdown-item mt-1 rounded-bottom bg-info"
                     onClick={()=> this.onPreview(activityId)}>Preview</button>
              </div>
          </div>
      )
  }

    // This function renders a table of all activities created for this course
    showActivities() {
        if (this.state.activityInfo) {
            return (
                <div className={'container-fluid'}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope={'col'}>Activity Type</th>
                            <th scope={"col-1"}></th>
                            <th scope={"col-1"}>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.activityInfo.map((activity) => {
                                return (
                                    <tr key={activity._id}>
                                        <td>{activity.title}</td>
                                        <td>{activity.description}</td>
                                        <td>{activity.activityType}</td>
                                        <td className={'col-1'}>{this.actionButtons(activity._id)}</td>
                                        <td className={'col-1'}>
                                            <button className={'btn btn-md btn-outline-danger rounded-circle'}
                                                    onClick={()=>this.onDelete(activity._id)}>X</button>
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
    this.getActivityInfo((response) => {
        this.setState({
          activityInfo: response.data,
          spinner: false
        });
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
          {
              this.state.displayPreview && (
                  <PreviewActivityModal onClose={this.previewOnClose}>
                      {this.getPreviewActivity()}
                  </PreviewActivityModal>
              )
          }
      </div>
    );
  }
}

export default CreatedActivities;
