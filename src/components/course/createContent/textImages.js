import React, { Component } from "react";
import axios from "axios";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
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
      information: "",
    };
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/activities`,
      withCredentials: true,
    });
  }

  onChangeValue = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  ondescription = async (value) => {
    await this.setState({ description: value });
  };
  oninformation = async (value) => {
    await this.setState({ information: value });
  };

  addDetails = async (event) => {
    try {
      await this.setState({ spinner: true });

      event.preventDefault();
      event.persist();
      if (this.state.description.length < 50) {
        await this.setState({
          isError: "Required, Add description minimum length 50 characters",
        });
        return;
      }
      axios
        .post(`http://localhost:8080/addArticle`, {
          title: this.state.title,
          description: this.state.description,
          information: this.state.information,
        })
        .then(async (res) => {
          this.handleEmitValue();
          await this.setState({ spinner: false });
        });
    } catch (error) {
      await this.setState({ spinner: false });
      console.log("response post");
      this.setState({ error: error.response.data.message });
    }
  };
  //==================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  componentDidMount() {
    const quill = new Quill("#editor", {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      },
      theme: "snow",
    });

    return () => {
      quill.disable();
      quill.container.remove();
    };
  }

  handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Aquí debes enviar el archivo al servidor para su procesamiento y obtener la URL de la imagen cargada
      // const imageUrl = await uploadImageToServer(formData);
      const imageUrl = "";

      // Inserta la imagen en el editor
      // const range = this.editorRef.current.getEditor().getSelection(true);
      //   this.editorRef.current
      //     .getEditor()
      //     .insertEmbed(range.index, "image", imageUrl);
    };
  };
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
      // <div className="content-activity shadow">
      //   {this.state.spinner && (
      //     <div className="spinner">
      //       <div className="spinner-container">
      //         <RingLoader
      //           color="#36D7B7"
      //           loading={this.state.spinner}
      //           size={200}
      //         />
      //       </div>
      //     </div>
      //   )}

      //   <div>
      //     <label className="title-activity">Title:</label>
      //     <input
      //       className="input-activity"
      //       onChange={this.handleInputTitleChange}
      //     ></input>
      //   </div>
      //   <div>
      //     <label className="title-activity">Description:</label>
      //     <textarea
      //       className="input-activity"
      //       onChange={this.handleInputDescriptionChange}
      //     ></textarea>
      //   </div>
      //   <div>
      //     <label className="title-activity">Image:</label>
      //     <img
      //       className="shadow image-activity"
      //       style={{ borderRadius: "10px", marginTop: "5px" }}
      //       src={this.state.base64Image}
      //     ></img>
      //   </div>
      //   <input
      //     type="file"
      //     accept="image/*"
      //     onChange={this.handleFileChange}
      //   ></input>
      //   <div id="editor">
      //     <p>Hello World!</p>
      //     <p>
      //       Some initial <strong>bold</strong> text
      //     </p>
      //     <p>
      //       <br />
      //     </p>
      //   </div>
      //   <div style={{ textAlign: "end" }}>
      //     <button className="button-activity" onClick={this.handleSave}>
      //       Save
      //     </button>
      //   </div>
      // </div>
      <div className="App">
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
        <div className="container">
          <div className="row">
            <form onSubmit={this.addDetails} className="update__forms">
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="font-weight-bold">
                    {" "}
                    Title <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChangeValue}
                    className="form-control"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Description <span className="required"> * </span>{" "}
                  </label>
                  <EditorToolbar toolbarId={"t1"} />
                  <ReactQuill
                    theme="snow"
                    value={this.state.description}
                    onChange={this.ondescription}
                    placeholder={"Write something awesome..."}
                    modules={modules("t1")}
                    formats={formats}
                  />
                </div>

                <br />
                {this.state.isError !== null && (
                  <div className="errors"> {this.state.isError} </div>
                )}
                <div className="form-group col-sm-12 text-right">
                  <button type="submit" className="button-activity">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TextImages;
