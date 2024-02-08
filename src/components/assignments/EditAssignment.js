import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';


class EditAssignments extends Component {
  constructor(props){
    super(props);
    this.state = { 
      assignmentName: this.props.theAssignment[0].assignmentName, 
      description: this.props.theAssignment[0].description, 
      startDate: this.props.theAssignment[0].startDate, 
      dueDate: this.props.theAssignment[0].dueDate, 
      // url: this.props.theAssignment[0].url,
      dueTime: this.props.theAssignment[0].dueTime,
      startTime: this.props.theAssignment[0].startTime, 
      endTime: this.props.theAssignment[0].endTime,
      endDate: this.props.theAssignment[0].endDate,
      maxDeduction: this.props.theAssignment[0].latePolicy.maxDeduction,
      deduction: this.props.theAssignment[0].latePolicy.deduction,
      timeUnit: this.props.theAssignment[0].latePolicy.timeUnit,
    };
    // you need to include credentials if you are using req.user in Express ------------------------------------------- `|´
    this.service = axios.create({ baseURL: process.env.REACT_APP_BASE_URL +'/courses', withCredentials: true});
  }

  // componentDidMount() {
  // }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {assignmentName, startDate, endDate, dueDate, startTime, endTime, dueTime, url, maxDeduction, deduction, timeUnit} = this.state;
    console.log('endTime ', moment(endDate.concat(' ', endTime)))
    console.log('endTime ', moment(dueDate.concat(' ', dueTime)))
    console.log('endTime before due time ', moment(endDate.concat(' ', endTime)).isBefore(dueDate.concat(' ', dueTime)))
    if (moment(endDate.concat(' ', endTime)).isBefore(startDate.concat(' ', startTime))) {
      this.setState({error: 'The start date must be prior to the end date' })
    } else if (moment(endDate.concat(' ', endTime)).isBefore(dueDate.concat(' ', dueTime)))  { 
      this.setState({error: 'The due date must be equal or prior to the end availability date' })
    } else {
      const latePolicy = {maxDeduction, deduction, timeUnit}
      this.service.post(`/${this.props.theCourse._id}/assignments/${this.props.theAssignment[0]._id}`, {assignmentName, startDate, endDate, dueDate, startTime, endTime, dueTime, latePolicy}, {withCredentials: true})
      .then( () => {
        this.setState({assignmentName: "", description: "", startDate:"", endDate:"",dueDate:"", dueTime: "23:59", startTime: "01:00", endTime: "23:59", url:"",  maxDeduction: 0, deduction: 0, timeUnit: "days",});
        this.props.getCourse();
        this.props.toggleForm('showCourse');
      })
      .catch( err => {
        console.log(err)
        this.setState({error:err.response.data.message})
      }) 
    }
  }

  handleChange = (event) => {  
    const {name, value} = event.target; // this is just fancy syntax for  const name = event.target.name; const value = event.target.value;
    this.setState({[name]: value});
}

render(){
  return(
   <div className="container mt-2 mb-4">
      {/* <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-secondary" onClick={()=>this.props.history.goBack()}>Cancel</button>
      </div> */}
      <h2>Edit assignment {this.state.assignmentName}</h2>
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

        <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
    
    </div>
  )
  }

}

export default EditAssignments;
