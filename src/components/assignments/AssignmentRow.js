import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip' //for showing descriptions on hover


/* props theAssignment
  clickFnc= {setCurrentAssignment} 
  currentAssignment={this.state.currentAssignment}/>
  userRole
  theAttempts={this.state.attempts}
  editAssign={this.editAssign}

*/

const AssignmentRow = (props) => {
  const now = moment.utc()
  let rowClass = "list-group-item list-group-item-action";
  const dueDate = props.theAssignment.dueDate.concat(' ', props.theAssignment.dueTime);
  let mmDueDate=moment.tz(dueDate, "America/New_York"); // convert Due Date to moment
  mmDueDate.utc().format(); // convert due date to UTC
  const endDate = props.theAssignment.endDate.concat(' ', props.theAssignment.endTime); // End availability date
  let mmEndDate=moment.tz(endDate, "America/New_York"); // convert END Date to moment
  mmEndDate.utc().format(); // convert due date to UTC
  const startDate = props.theAssignment.startDate.concat(' ', props.theAssignment.startTime); // End availability date
  let mmStartDate=moment.tz(startDate, "America/New_York"); // convert END Date to moment
  mmStartDate.utc().format(); // convert due date to UTC
  // console.log('due date conc ',dueDate);
  // console.log('expired due date? ',moment(mmDueDate).isBefore(now));
  let isAvailable = true;
  // console.log ('the props role ', props.userRole)
  if (props.userRole === 'student' && (moment(mmEndDate).isBefore(now) || moment(now).isBefore(mmStartDate))) {
    isAvailable = false;
  }
  let theAttempt = [];
  let completed = false;
  let theScore = 0;
  let colWidth = 'col-2'
  // console.log('the props attempts ', props.theAttempts)
  if (moment(mmEndDate).isBefore(now)) { rowClass="list-group-item list-group-item-action list-group-item-secondary" }
  if (moment(mmDueDate).isBefore(now) && moment(mmEndDate).isAfter(now)) { rowClass="list-group-item list-group-item-action list-group-item-warning" }
  if (props.currentAssignment === props.theAssignment._id) { rowClass= rowClass.concat(' active') }
  if (props.userRole === 'student') {
    colWidth = 'col-1'
    theAttempt = props.theAttempts.filter((oneAttempt)=>{
      return oneAttempt.assignmentID === props.theAssignment._id
    })
    if (theAttempt.length > 0) {
      if (moment(mmDueDate).isBefore(now) && moment(mmEndDate).isAfter(now)) { rowClass="list-group-item list-group-item-action list-group-item-secondary" }
      theScore = calculateScore(props.theAssignment, theAttempt[0].completionDateUTC);
      // console.log('the attempt ', theAttempt)
      // console.log('completion date ', theAttempt[0].completionDateUTC)
      const str1 = 'Completed on:'
      theAttempt = theAttempt[0]  
      theAttempt= str1.concat(' ', moment.tz(theAttempt.completionDateUTC, "America/New_York").format("lll")); 
      completed = true
    } else {
      theAttempt = 'Not yet completed';
      theScore=0;
    }
  }
  const pStyle = {
    textAlign: "left"
  }
  // console.log('is available ', isAvailable)
  const pColor = rowClass.includes('active') ? {color: 'white'} : {color: '#007bff'};
  return (
    <div> 
      <div className={rowClass}  onClick={()=> props.clickFnc(props.theAssignment._id)}>
        <div className='row'>
        <p className="col-4" style={pStyle}> 
          { isAvailable ?
          <Link target="_blank" style={pColor} to={props.theAssignment.url + '/' + props.theCourseID + '/' + props.theAssignment._id}>{props.theAssignment.assignmentName}</Link>
          : <p>{props.theAssignment.assignmentName}</p>
          }
        </p>
        <p className="col-2">{props.theAssignment.startDate}</p> 
        {/* <p className="col-2">{props.theAssignment.endDate}</p> */}
        <p className="col-4">
          {moment(props.theAssignment.dueDate.concat(' ', props.theAssignment.dueTime)).format("MMM D YYYY, h:mm a")}{'\u00A0'}
          {props.userRole === 'student' && !completed && <span className="fa fa-dot-circle-o" style={{color: 'red'}} data-tip="Not completed"></span>}
          {props.userRole === 'student' && completed && <span className="fa fa-check" data-tip="Completed" style={{color: 'green'}}></span>}
        </p> 
        {props.userRole === 'student' && 
          <p className={colWidth}>{theScore}</p>}
        <p className={colWidth}>
          { props.currentAssignment === props.theAssignment._id ? <span className="fa fa-caret-up" data-tip="Less detail"></span> :
            <span className="fa fa-caret-down" data-tip="More details"></span>
          }
        </p>
        <ReactTooltip place="top" type="dark" effect="float"/>
      </div>
      </div>
      { props.currentAssignment === props.theAssignment._id && 
        <AssignmentDetails theAttempt ={theAttempt} isAvailable={isAvailable} 
        theAssignment={props.theAssignment} editAssign={props.editAssign}
        deleteAssign={props.deleteAssign} theCourseID={props.theCourseID}
        userRole ={props.userRole} theScore={theScore}
        />}
    </div> 
  )

}

const AssignmentDetails = (props) => {
  // console.log('the props attempts ', props.theAttempts)
  const pStyle = {
    textAlign: "left"
  }

  let timeUnit 
  if (props.theAssignment.latePolicy.timeUnit === 'hours') { timeUnit = 'hour'} 
  else if (props.theAssignment.latePolicy.timeUnit === 'days') { timeUnit = 'day'} 
  else if (props.theAssignment.latePolicy.timeUnit === 'minutes') { timeUnit = 'minute'} ;

  return (
    <div>
      { props.isAvailable ? 
        <h5 className="d-flex justify-content-around mt-1">
        <Link target="_blank" to={props.theAssignment.url + '/' + props.theCourseID + '/' + props.theAssignment._id}> {props.theAssignment.assignmentName} {'\u00A0'}</Link>
        <Link className='btn btn-primary' target="_blank" to={props.theAssignment.url + '/' + props.theCourseID + '/' + props.theAssignment._id}><span className="fa fa-external-link"></span>{'\u00A0'}Start assignment</Link>
        </h5> :
        <h5 className="d-flex justify-content-around mt-1">
         {props.theAssignment.assignmentName} {'\u00A0'}
        </h5>
      }
      <p style={pStyle}><strong>Due on: </strong>{moment(props.theAssignment.dueDate.concat(' ', props.theAssignment.dueTime)).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
      <p style={pStyle}><strong>Available from: </strong>{moment(props.theAssignment.startDate.concat(' ', props.theAssignment.startTime)).format("dddd, MMMM Do YYYY, h:mm:ss a")} <strong>until</strong> {moment(props.theAssignment.endDate.concat(' ', props.theAssignment.endTime)).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
      <p style={pStyle}><strong>Late policy: </strong> deduce {props.theAssignment.latePolicy.deduction}% for each {timeUnit} late. The maximum points deducted will be {props.theAssignment.latePolicy.maxDeduction}%</p>
    {props.userRole === 'instructor' && 
      <div>
        <button className="btn btn-primary mr-1 mb-2" onClick={()=>props.editAssign(props.theAssignment._id)}> 
          <span className="fa fa-edit mr-2"></span>
          {'\u00A0'}Edit assignment
        </button>
        <button className="btn btn-secondary ml-1 mb-2" onClick={()=> { if (window.confirm('Are you sure you want to delete this assignment? \n\n This will delete all student data \n\n This action cannot be undone')) 
            props.deleteAssign(props.theAssignment._id)}} >
          <span className="fa fa-trash mr-1"></span>
          Delete assignment
        </button>
      </div>
    }
    {props.userRole === 'student' && <p style={pStyle}><strong>Score: {props.theScore}. </strong> {props.theAttempt}</p>}
    </div>
  )

}

const calculateScore = (oneAssignment, completionDate) => {
  const endDate = oneAssignment.endDate.concat(' ', oneAssignment.endTime); // End availability date
  let mmEndDate=moment.tz(endDate, "America/New_York"); // convert END Date to moment
  mmEndDate.utc().format(); 
  const dueDate = oneAssignment.dueDate.concat(' ', oneAssignment.dueTime); // End availability date
  let mmDueDate=moment.tz(dueDate, "America/New_York"); // convert END Date to moment
  mmDueDate.utc().format(); 
  const completionTime = moment(completionDate);
  let points = 100;
  if (oneAssignment.latePolicy) {
    const difference = Number(mmDueDate.diff(completionTime, oneAssignment.latePolicy.timeUnit, true)); 
    if (difference < 0) { // difference will be negative if completion is After due date
      let deduction = Math.ceil(Math.abs(difference)) * oneAssignment.latePolicy.deduction;
      deduction = Math.min(deduction, oneAssignment.latePolicy.maxDeduction);
      points = 100-deduction;
    }  
  } else if (completionTime.isAter(mmEndDate)) {
    points = 0;
  }
  return points
}

export default AssignmentRow 
