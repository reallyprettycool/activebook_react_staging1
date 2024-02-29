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
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/activities`,
      withCredentials: true,
    });
  }

  handleChildValue = async (value) => {
    console.log("value ", value);
    await this.setState({ whatToShow: value });
  };

  showItem = async (e) => {
    console.log(e);
    await this.setState({ whatToShow: e });
  };

    getAllActivities = async (then) => {
      return this.service.get("/titles-descriptions/" + this.props.theCourse._id)
          .then((response) =>{then(response)})
          .catch((err) => {console.log(err)});
    }

  renderForms = () => {
    switch (this.state.whatToShow) {
      case "multipleChoice":
        return <MultipleChoice />;
      case "textImages":
        return <TextImages onValueEmitted={this.handleChildValue} />;
      case "h5p":
        return <H5P />;
      case "otherActivities":
        return <OtherActivities />;
      case "createdActivities":
        return <CreatedActivities  getActivities={this.getAllActivities}/>;
      case "dragAndDrop":
        return <DragAndDropCreation />;
      default:
        return <CreatedActivities getActivitie={this.getAllActivities}/>;
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
          className="col-6"
          aria-label="Page navigation example"
          style={{ backgroundColor: "#ffffff" }}>
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
