import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { activities } from '../activities/ActivityList';


class AddAssignments extends Component {
  constructor(props){
    super(props);
    this.state = { 
      assignmentName: "", 
      description: "", 
      startDate:"", 
      dueDate:"", 
      endDate:"", 
      url:"",
      dueTime: "23:59",
      startTime: "01:00", 
      endTime: "23:59",
      maxDeduction: 0,
      deduction: 0,
      timeUnit: "days",
    };
    // you need to include credentials if you are using req.user in Express ------------------------------------------- `|´
    this.service = axios.create({ baseURL: process.env.REACT_APP_BASE_URL +'/courses', withCredentials: true});
    this.activities = activities;
  }

  // componentDidMount() {
  //   this.getCourseData();
  // }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {assignmentName, startDate, endDate, dueDate, startTime, endTime, dueTime, url, maxDeduction, deduction, timeUnit} = this.state;
    console.log('new variables ', maxDeduction, deduction, timeUnit)// console.log('endTime ', moment(endDate.concat(' ', endTime)))
    // console.log('endTime ', moment(dueDate.concat(' ', dueTime)))
    // console.log('endTime before due time ', moment(endDate.concat(' ', endTime)).isBefore(dueDate.concat(' ', dueTime)))
    if (moment(endDate.concat(' ', endTime)).isBefore(startDate.concat(' ', startTime))) {
      this.setState({error: 'The start date must be prior to the end date' })
    } else if (moment(endDate.concat(' ', endTime)).isBefore(dueDate.concat(' ', dueTime)))  { 
      this.setState({error: 'The due date must be equal or prior to the end availability date' })
    } else {
      this.service.post(`/${this.props.theCourse._id}/assignments/create`, {assignmentName, startDate, endDate, dueDate, startTime, endTime, dueTime, url, maxDeduction, deduction, timeUnit}, {withCredentials: true})
      .then( () => {
        this.props.getCourse();
        this.setState({assignmentName: "", description: "", startDate:"", endDate:"",dueDate:"", dueTime: "23:59", startTime: "01:00", endTime: "23:59", url:"",  maxDeduction: 0, deduction: 0, timeUnit: "days",});
        this.props.toggleForm('showCourse');
      })
      .catch( err => {
        this.setState({error:err.response.data.message})
      }) 
    }
  }

  handleChange = (event) => {  
    const {name, value} = event.target; // this is just fancy syntax for  const name = event.target.name; const value = event.target.value;
    this.setState({[name]: value});
    // console.log('the activities... ', this.activities)
}

render(){
  return(
   <div className="container mt-2 mb-4">
      {/* <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary" onClick={()=>this.props.history.goBack()}>Cancel</button>
      </div> */}
      <div className='row'>
        <h2>Create assignment for {this.props.theCourse.courseName}</h2>
      </div>
      <form className="mt-2" onSubmit={this.handleFormSubmit}>

      {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}

        <div className="form-row">
          <div className="form-group  col-md-6">
            <label for="assignmentName">Assignment Name</label>
            <input className="form-control" value={this.state.assignmentName} onChange={ e => this.handleChange(e)} type="text" name="assignmentName" required placeholder="Assignment name"/>
          </div>

          <div className="form-group col-md-3">
            <label for="dueDate">Due Date</label>
            <input className="form-control" type="date"  value={this.state.dueDate} onChange={ e => this.handleChange(e)} name="dueDate" required/>
          </div> 

          <div className="form-group  col-md-3">
            <label className="mr-1" for="due-time">Due Time: </label>
            <input  className="form-control" type="time" id="due-time" name="dueTime" value={this.state.dueTime} onChange={ e => this.handleChange(e)} min="0:00" max="23:59" required />
          </div> 
        </div>

        <div className='row'>
          <h3>Availability period: </h3>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="startDate">Start Date</label>
            <input className="form-control"  value={this.state.startDate} onChange={ e => this.handleChange(e)} type="date" name="startDate" required/>
          </div>  
          <div className="form-group  col-md-3">
            <label className="mr-1" for="start-time">Start Time </label>
            <input  className="form-control" type="time" id="start-time" name="startTime" value={this.state.startTime} onChange={ e => this.handleChange(e)} min="0:00" max="23:59" required />
          </div> 

          <div className="form-group col-md-3">
            <label for="endDate">End Date</label>
            <input className="form-control"  value={this.state.endDate} onChange={ e => this.handleChange(e)} type="date" name="endDate" required/>
          </div>  
          <div className="form-group  col-md-3">
            <label className="mr-1" for="end-time">End Time </label>
            <input  className="form-control" type="time" id="end-time" name="endTime" value={this.state.endTime} onChange={ e => this.handleChange(e)} min="0:00" max="23:59" required />
          </div> 
        </div>

          <div className='row'>
            <h3>Late policy: </h3>
          </div>
          <div className='row form-inline mb-2'>
            <div className="form-group">
              <label className="mr-1" for="deduction">Deduce </label>
              <input  className="form-control" type="number" id="deduction" name="deduction" value={this.state.deduction} onChange={ e => this.handleChange(e)} min="0" max="100" required /> 
              <span>% points </span>
            </div> 
            <div className="form-group">
              <label for="timeUnit">{'\u00A0'}for each{'\u00A0'}</label>
              <select className="form-control" id="timeUnit" name='timeUnit' value={this.state.timeUnit} onChange={ e => this.handleChange(e)}>
                <option key='days' value='days'>day</option>
                <option key='hours' value='hours'>hour</option>
                <option key='minutes' value='minutes'>minute</option>
              </select>
                <span>{'\u00A0'}late.{'\u00A0'}</span>
            </div>
            <div className="form-group">
              <label className="mr-1" for="maxDeduction">{'\u00A0'}Maximum deduction: </label>
              <input  className="form-control" type="number" id="maxDeduction" name="maxDeduction" value={this.state.maxDeduction} onChange={ e => this.handleChange(e)} min="0" max="100" required /> 
              <span>% points </span>
            </div>
            <hr />
          </div>

        {this.activities.map((oneActivity, index)=>{
          return (
          <div className="form-group row justify-content-start pl-5" key={index}>
            <input className="form-check-input" type="radio" onChange={ e => this.handleChange(e)} name="url" value={oneActivity.url}/>
            <label className="form-check-label" for="inlineCheckbox1"><Link target="_blank" to={`${oneActivity.url}/${this.props.theCourse._id}` }><p><strong>{oneActivity.name}: </strong><span>{oneActivity.description}</span></p></Link></label>
            <hr />
          </div> 
          )
          }) 
        }

        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    
    </div>
  )
  }

}

export default AddAssignments;

//target="_blank"