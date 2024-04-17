import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import '../../App.css';
import moment from 'moment-timezone';



class EditCourse extends Component {
  constructor(props){
    super(props);
    this.state = { 
      courseName: this.props.theCourse.courseName, 
      description: this.props.theCourse.description, 
      startDate:this.props.theCourse.startDate, 
      endDate:this.props.theCourse.endDate, 
      courseImage:this.props.theCourse.courseImage,
     };
    // you need to include credentials if you are using req.user in Express --------------------- `|´
    this.service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/courses`, withCredentials: true});
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {courseName, description, startDate, endDate, courseImage} = this.state;
    if (moment(endDate).isBefore(startDate)) {
      this.setState({error: 'The start date must be prior to the end date' })
    } else {
      this.service.put(`/update/${this.props.theCourse._id}`, {courseName, description, startDate, endDate, courseImage})
      .then( () => {
        this.props.getCourse(); // updates course in APP and course details
        this.props.toggleForm()
      })
      .catch( err => {
        this.setState({error:err.response.data.message})
      })
    } 
  }

  handleChange = (event) => {  
      const {name, value} = event.target; // this is just fancy syntax for  const name = event.target.name; const value = event.target.value;
      this.setState({[name]: value});
  }

  showImageOptions () {
    const imageSourceArray = ["/images/biology-1.jpg", "/images/biology-2.jpg", "/images/Biology-3.jpg"]
    const imageAltArray = ["neuron", "bacterial cells", "frog and leaf"]
    return (
      <div className="mb-4">
        <p>Select course image:</p>
        { imageSourceArray.map((oneImg, index) => { 
          if (oneImg === this.state.courseImage) {
            return (
              <div className="form-check form-check-inline">
               <input checked className="form-check-input" type="radio" onChange={ e => this.handleChange(e)} name="courseImage" value={oneImg}/>
               <label className="form-check-label" for="inlineCheckbox1"> <img className="imgForm" src={oneImg} alt={imageAltArray[index]}/> </label>
              </div>
            )
          } else {
            return (
              <div className="form-check form-check-inline">
               <input className="form-check-input" type="radio" onChange={ e => this.handleChange(e)} name="courseImage" value={oneImg}/>
               <label className="form-check-label" for="inlineCheckbox1"> <img className="imgForm" src={oneImg} alt={imageAltArray[index]}/> </label>
              </div>
            )
          }
        }
        )}
      </div>
    )
  }

  render(){
    return(
    <div className="container mt-2 mb-4">
      {/* <div className="d-flex justify-content-end mb-2">
        {/* <Link className="btn btn-secondary" to='/courses'><span className="fa fa-angle-left"></span>Back to courses</Link> */}
        {/* <button className="btn btn-secondary" onClick={()=>this.props.toggleForm()}>Cancel</button>
      </div> */} 

      <h2>Edit {this.props.theCourse.courseName}</h2>
      <form onSubmit={this.handleFormSubmit}>

      {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}

        <div className="form-group">
          <label for="courseName">Course Name</label>
          <input className="form-control" value={this.state.courseName} onChange={ e => this.handleChange(e)} type="text" name="courseName" required placeholder="Course name"/>
        </div>

        <div className="form-group">
          <label for="description">Course Description</label>
          <input className="form-control" type="textarea" value={this.state.description} onChange={ e => this.handleChange(e)} name="description" required placeholder="Course description" rows="3" maxLength="150"/>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="startDate">Start Date</label>
            <input className="form-control"  value={this.state.startDate} onChange={ e => this.handleChange(e)} type="date" name="startDate" required/>
          </div>    

          <div className="form-group col-md-6">
            <label for="endDate">End Date</label>
            <input className="form-control" type="date"  value={this.state.endDate} onChange={ e => this.handleChange(e)} name="endDate" required/>
          </div> 
        </div> 

        {this.showImageOptions()}

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
    )
  }
}

export default EditCourse;