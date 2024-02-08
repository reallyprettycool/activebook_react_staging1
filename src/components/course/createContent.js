import React, { Component } from "react";
import axios from "axios";
import H5P from "./createContent/H5P";
import MultipleChoice from "./createContent/MultipleChoice";
import TextImages from "./createContent/textImages";
import OtherActivities from "./createContent/OtherActivities";
import CreatedActivities from "./createContent/CreatedActivities";
class CreateContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      whatToShow: "",
    };
  }

  handleChildValue = async (value) => {
    console.log("value ", value);
    await this.setState({ whatToShow: value });
  };

  showItem = async (e) => {
    console.log(e);
    await this.setState({ whatToShow: e });
  };
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
        return <CreatedActivities />;
      default:
        return <CreatedActivities />;
    }
  };
  render() {
    return (
      <div>
        <nav
          className="col-6"
          aria-label="Page navigation example"
          style={{ backgroundColor: "#ffffff" }}
        >
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.showItem("createdActivities")}
              >
                Created Activities
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.showItem("textImages")}
              >
                Text And Images
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.showItem("multipleChoice")}
              >
                Multiple Choice
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => this.showItem("h5p")}>
                H5P
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.showItem("otherActivities")}
              >
                Other Activities
              </a>
            </li>
          </ul>
        </nav>
        {this.renderForms()}
      </div>
    );
  }
}

export default CreateContent;
