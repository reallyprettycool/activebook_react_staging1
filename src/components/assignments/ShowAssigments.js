import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import ReactTooltip from 'react-tooltip' //for showing descriptions on hover
import moment from 'moment-timezone';
import AssignmentRow from './AssignmentRow';


class AssignmentList extends Component {
  constructor(props){
    super(props);
    this.state = { 
      assignments:this.props.theCourse.assignments,
      filtered:this.props.theCourse.assignments,
      attempts:[],
      currentAssignment: null,
      searchValue: '',
    }
    this.service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}`, withCredentials: true});
  }

  componentDidMount() {
    this.sortAssignmentsByDate();
    if (this.props.userInSession.role === 'student') {
      this.getAttempts()
    }
    // if (this.props.userInSession.role === 'instructor') {
    //   this.getOneCourse();
    // }

  }

  getAttempts = () =>{
    this.service.get(`/attempt/scores/${this.props.theCourse._id}`)
    .then(responseFromApi => {
      const sortedList = responseFromApi.data;
      console.log('attempt data....', sortedList)
      this.setState({attempts: sortedList});
      // console.log('the assignments .... ', responseFromApi.data.assignments)
    }).catch((err)=>{
      console.log(err);
    })
  }

  // getOneCourse = () =>{
  //   const { params } = this.props.match;
  //   this.service.get(`/courses/${params.id}`)
  //   .then(responseFromApi => {
  //     this.setState({
  //       assignments: responseFromApi.data.assignments,
  //     }, ()=>    this.sortAssignmentsByDate() )
  //     // console.log('the course .... ', responseFromApi.data)
  //   })
  //   .catch((err)=>{
  //       console.log(err);
  //   })
  // }

  sortAssignmentsByDate () {
    const sortedList = this.state.assignments;
    sortedList.sort((a, b)=> { 
    let x = a.dueDate;
    let y = b.dueDate;
    if (x === y) {
      x = a.dueTime;
      y = b.dueTime;
    } 
    if (x === y) {
      x = a.assignmentName;
      y = b.assignmentName;
    } 
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
    });
    this.setState({filtered: sortedList});
  }

  searchFunction = (searchTerm)=>{
    let filteredList = [...this.state.assignments];
    filteredList = filteredList.filter((oneAssignment)=>{
      return oneAssignment.assignmentName.toLowerCase().includes(searchTerm.toLowerCase()) 
    })
    this.setState({filtered: filteredList});
  }

  sortAssignments(event) {
    const sortBy = event.target.id
    // console.log('sort by ... ', sortBy)
    const sortedList = this.state.filtered;
    sortedList.sort((a, b)=> { 
      const x = a[sortBy].toLowerCase();
      const y = b[sortBy].toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    // console.log(sortedList)
      this.setState({
        filtered: sortedList
    })
  }

  showSearch (){
    return(
        <div className="form-group col-lg-8 col-md-12 my-2 d-flex justify-content-around">
        <label >Search</label>
        <div className="control">
          <input 
          onChange={e=>this.searchInput(e)}
          value={this.state.searchValue}
          type="text"
          className="form-control" />
        </div>
    </div>
    )
  }

  searchInput = (e) =>{
    this.setState({searchValue: e.target.value});
    this.searchFunction(e.target.value)
  }

  setCurrentAssignment = (assignmentID) => {
    if (this.state.currentAssignment === assignmentID) {
      this.setState({currentAssignment: null});
    } else {
      this.setState({currentAssignment: assignmentID});
    }
  }

  deleteAssign = (assignmentID) => {
    // console.log('delete clicked ', assignmentID)
    this.service.delete(`/courses/${this.props.theCourse._id}/assignments/delete/${assignmentID}`)
    .then(responseFromApi => {
      this.props.getCourse()
      this.setState({currentAssignment: null});
      console.log('the assignments deleted .... ', responseFromApi.data.assignments)
    })
    .catch((err)=>{
        console.log(err);
    })
  }

   editAssign = (assignmentID) => {
    // console.log('edit clicked ', assignmentID)
    this.props.whichAssignment(assignmentID)
    // toggles edit form and sets assignment in CourseDetails component
  }

  showAssignments () {
    return this.state.filtered.map(oneAssignment =>{
      return (
      <AssignmentRow theAssignment={oneAssignment} 
        key={oneAssignment._id} clickFnc= {this.setCurrentAssignment} 
        currentAssignment={this.state.currentAssignment} theAttempts={this.state.attempts}
        editAssign={this.editAssign} userRole={this.props.userInSession.role}
        deleteAssign={this.deleteAssign} theCourseID={this.props.theCourse._id}/>
      )
    })
  }

  render () {
    return (
      <div>
        <h2>{this.props.theCourse.courseName}</h2>
        {this.showSearch()}
        <div>
          <div className="row mr-2">
              <p className="col-4">Assignment Name <span className="fa fa-sort-down" id="assignmentName" onClick={(e)=>this.sortAssignments(e)} ></span></p>
              <p className="col-2">Start date <span className="fa fa-sort-down" id="startDate" onClick={(e)=>this.sortAssignments(e)} ></span></p>
              {/* <p className="col-2">End date <span className="fa fa-sort-down" id="endDate" onClick={(e)=>this.sortAssignments(e)} ></span></p> */}
              <p className="col-4">Due date <span className="fa fa-sort-down" id="dueDate" onClick={(e)=>this.sortAssignments(e)} ></span></p>
              {this.props.userInSession.role === 'instructor' && <p className="col-2">More details</p> }    
              {this.props.userInSession.role === 'student' && <p className="col-1">Score</p> } 
              {this.props.userInSession.role === 'student' && <p className="col-1">Details</p> }    

          </div>
          <div className='list-group list-group-flush'>
            {this.showAssignments()}
            {/* <ReactTooltip place="top" type="dark" effect="float"/> */}
          </div>
  
        </div>

      </div>
     )
    }
  
  } 
  
  
  export default AssignmentList;
