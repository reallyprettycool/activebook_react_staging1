import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';



class AddCourse extends Component {
  constructor(props){
      super(props);
      this.state = { courseCode: ""};
      this.service = axios.create({ baseURL: process.env.REACT_APP_BASE_URL+'/courses', withCredentials: true});

  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    // const {title, description} = this.state;
    const courseCode = this.state.courseCode;
    this.service.post("/addCourse", {courseCode})
    .then( () => {
        this.props.getData();
        this.props.toggleForm();
        this.setState({courseCode: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
    //   ^ this is just fancy syntax for the 2 lines below
    //   const name = event.target.name;
    //   const value = event.target.value;
      this.setState({[name]: value});
  }

  render(){
    return(
    <div className="container mt-2">
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary" onClick={()=>this.props.toggleForm()}>Cancel</button>
      </div>

      <h2>Register using the code provided by your instructor</h2>
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label for="courseCode">Enter the 8-digit course code provided by your instructor</label>
          <input className="form-control"  value={this.state.courseCode} onChange={ e => this.handleChange(e)} type="text" name="courseCode" required placeholder="Enter 8 digit course code"/>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
    )
  }
}

export default AddCourse;