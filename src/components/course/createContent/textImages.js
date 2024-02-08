import React, { Component } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

class TextImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base64Image:
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      title: "",
      description: "",
      spinner: false,
      extensions: "",
      namefile: "",
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/activities`,
      withCredentials: true,
    });
  }

  handleEmitValue = () => {
    const title = "createdActivities";

    this.props.onValueEmitted(title);
  };

  handleSave = async () => {
    const { title, description, base64Image, extensions, namefile } =
      this.state;
    const postData = {
      title,
      description,
      base64Image,
      extensions,
      namefile,
    };
    await this.setState({ spinner: true });
    this.service
      .post("/textImages", postData, { withCredentials: true })
      .then(async (response) => {
        this.handleEmitValue();
        await this.setState({ spinner: false });
        console.log("Response from POST:", response.data);
      })
      .catch(async (err) => {
        await this.setState({ spinner: false });
        console.log("response post");
        this.setState({ error: err.response.data.message });
      });
  };
  handleInputTitleChange = async (event) => {
    await this.setState({ title: event.target.value });
  };
  handleInputDescriptionChange = async (event) => {
    await this.setState({ description: event.target.value });
  };
  handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("file ", file);
    await this.setState({ extensions: file.type, namefile: file.name });

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result;
        await this.setState({ base64Image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };
  render() {
    return (
      <div className="content-activity shadow">
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

        <div>
          <label className="title-activity">Title:</label>
          <input
            className="input-activity"
            onChange={this.handleInputTitleChange}
          ></input>
        </div>
        <div>
          <label className="title-activity">Description:</label>
          <textarea
            className="input-activity"
            onChange={this.handleInputDescriptionChange}
          ></textarea>
        </div>
        <div>
          <label className="title-activity">Image:</label>
          <img
            className="shadow image-activity"
            style={{ borderRadius: "10px", marginTop: "5px" }}
            src={this.state.base64Image}
          ></img>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleFileChange}
        ></input>
        <div style={{ textAlign: "end" }}>
          <button className="button-activity" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default TextImages;
