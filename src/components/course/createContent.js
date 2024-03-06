import React, { Component } from "react";
import H5P from "./createContent/H5P";
import MultipleChoice from "./createContent/MultipleChoice";
import TextImages from "./createContent/textImages";
import OtherActivities from "./createContent/OtherActivities";
import CreatedActivities from "./createContent/CreatedActivities";
import DragAndDropCreation from "./createContent/dragAndDrop/DragAndDropCreation";
import axios from "axios";
class CreateContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      whatToShow: "createdActivities",
      editThisActivity: null,
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/activities`,
      withCredentials: true,
    });
  }

  showItem = async (e) => {
    console.log(e);
    if(e !== this.state.whatToShow) {
        await this.setState({ editThisActivity: null });
    }
    await this.setState({ whatToShow: e });
  };

  // Used for created activities.
  getActivityInfo = async (then) => {
    return this.service.get("/all-created/" + this.props.theCourse._id)
        .then((response) =>{then(response)})
        .catch((err) => {console.log(err)});
  }

  // Returns a singular activity
  getActivity = async (activityId, then) => {
    return this.service.get("/" + activityId)
        .then((response) => then(response))
        .catch((err) => console.log(err))
  }

  saveActivity = async (activity, then) => {
    let newActivity
    // If the ID exists, then we are updating the activity
    if (activity._id) {
      newActivity = {
        ...activity,
        courseId: this.props.theCourse._id,
      }
      return this.service.put("/" + activity._id, newActivity)
          .then((response) => then(response))
    } else {
      // If the ID does not exist, then we are creating a new activity
        newActivity = {
            ...activity,
            courseId: this.props.theCourse._id,
            activityType: this.state.whatToShow,
        }
        return this.service.post("/create", newActivity)
            .then((response) => then(response))
    }
  }

  editThisActivity = (activity) => {
    this.setState({
      ...this.state,
      editThisActivity: activity,
      whatToShow: activity.activityType
    })
  }


  renderForms = () => {
    switch (this.state.whatToShow) {
      case "multipleChoice":
        return <MultipleChoice />;
      case "textImages":
        return <TextImages onValueEmitted={this.showItem} />;
      case "h5p":
        return <H5P />;
      case "otherActivities":
        return <OtherActivities />;
      case "dragAndDrop":
        return <DragAndDropCreation
                  onSave={this.saveActivity}
                  editActivity={this.state.editThisActivity}/>;
      default:
        return <CreatedActivities
            getActivityInfo={this.getActivityInfo}
            getActivity={this.getActivity}
            showItem={this.showItem}
            setEdit={this.editThisActivity}
            {...this.props}/> // So that we can redirect to the activity page with edit
    }
  };

  tabList = [
    { name: "Created Activities", value: "createdActivities" },
    { name: "Text And Images", value: "textImages" },
    { name: "Multiple Choice", value: "multipleChoice" },
    { name: "Drag and Drop", value: "dragAndDrop" },
    { name: "H5P", value: "h5p" },
    { name: "Other Activities", value: "otherActivities" },
  ]

  render() {
    return (
      <div>
        <nav
          className="col-6 bg-white"
          aria-label="Page navigation example">
          <ul className="pagination">
              {
                this.tabList.map((tab, index) => {
                    return (
                        <li key={index} className="page-item">
                        <a
                            className="page-link"
                            onClick={() => this.showItem(tab.value)}
                        >
                            {tab.name}
                        </a>
                        </li>
                    )
                    })
              }
          </ul>
        </nav>
        {this.renderForms()}
      </div>
    );
  }
}

export default CreateContent;
