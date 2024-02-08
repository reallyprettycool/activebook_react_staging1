import React, { Component } from 'react';
import './grades.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { CSVLink, CSVDownload } from "react-csv";

class ShowGrades extends Component {
  constructor(props){
    super(props);
    this.state = { 
      assignments:this.props.theCourse.assignments,
      students:this.props.theCourse.students,
      filteredAssignments:[],
      filteredStudents:[],
      searchValue: '',
      scoreData:[],
      formattedScores: [],
      loadData: true,
      error: false,
      cvdData:'',
    }
    this.service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/attempt/scores`, withCredentials: true});
  }

  componentDidMount() {
    if (this.state.filteredAssignments.length ===0) {
      this.sortAssignments();
    }
    if (this.state.filteredStudents.length ===0) {
      this.sortStudents();
    }
    if (this.state.scoreData.length <1 && this.state.loadData) {
        this.getScores()
    }
  }

  getScores () {
    this.service.get(`/${this.props.theCourse._id}`)
    .then(responseFromApi => {
      // console.log('the scores....', responseFromApi.data)
      this.setState({
        scoreData: responseFromApi.data,
      }, ()=> {
        this.dataToCSV()
      })
      // console.log(this.state.scoreData)
    }).catch( err => {
      this.setState({loadData: false, error:err.response.data.message})
      // console.log('API error ----',err.response) 
    }) 
  }

  formatScores = () => {
    let table = [];
    this.state.filteredStudents.map((oneStudent, index) => {
      // console.log('filtered students ', this.state.filteredStudents)
      // console.log ('the assignments ....', this.state.filteredAssignments)
      // console.log ('the attempts ....', this.state.scoreData)
      // console.log('Assign 3 ', this.state.filteredAssignments[3], 'attempt 0 ', this.state.scoreData[0])
      let children = [];
      children.push(<th scope="col">{oneStudent.lastname},{'\u00A0'} {oneStudent.firstname}</th>)
      this.state.filteredAssignments.map((oneAssignment,  index) => { 
        let theAttempt = this.state.scoreData.filter((oneAttempt)=>{
          // console.log('items ',oneAttempt.studentID[0], oneStudent._id, oneAttempt.assignmentID, oneAssignment._id )
          // console.log('attempt match ',(oneAttempt.studentID === oneStudent._id && oneAttempt.assignmentID === oneAssignment._id) )
          return oneAttempt.studentID === oneStudent._id && oneAttempt.assignmentID === oneAssignment._id
        })
        // console.log('the attempt...', theAttempt)
        const endDate = oneAssignment.endDate.concat(' ', oneAssignment.endTime); // End availability date
        let mmEndDate=moment.tz(endDate, "America/New_York"); // convert END Date to moment
        mmEndDate.utc().format(); 
        const dueDate = oneAssignment.dueDate.concat(' ', oneAssignment.dueTime); // End availability date
        let mmDueDate=moment.tz(dueDate, "America/New_York"); // convert END Date to moment
        mmDueDate.utc().format(); 
        // console.log('current attempt ', theAttempt)
        if (theAttempt.length >0) {
          // if (theAttempt.length >1) {theAttempt = theAttempt[0]}
            const points = calculateScore(oneAssignment, theAttempt[0].completionDateUTC); 
            // console.log('completion date UTC ', theAttempt[0].completionDateUTC)

            children.push(<td key= {index}>{points}</td>)
        } else {
          const now = moment.utc()
          if (now.isAfter(mmEndDate)) {
            children.push(<td key= {index} >0</td>)
          } else if (now.isAfter(mmDueDate)) {
            children.push(<td key= {index} style={{color: 'red'}}> - </td>)
          } else {
            children.push(<td key= {index} > - </td>)        
          }
        } 
        // console.log('one attempt ', theAttempt)
        // console.log('due date ', mmDueDate)
        // console.log('then... the attempt...', theAttempt)
      })
      // console.log('new student object ...', children)
      return table.push(<tr key= {index}>{children}</tr>)
    })
    return table
  }

  showAssignments () {
    //table-heading
    return (
      <thead className='thead-light'>
        <tr>
          <th scope="col" >Student name</th>
          {this.state.filteredAssignments.map((oneAssignment, index)=>{
            return (
              <th key= {index} scope="col">{oneAssignment.assignmentName}</th>
            )
          })}
        </tr>
      </thead>
    )
  }

  dataToCSV = () => {
    let csvRows=[];
    let headers = ['firstname', 'lastname', 'email', 'student ID'];
    this.state.filteredAssignments.map(oneAssignment => { 
      const theName = (''+ oneAssignment.assignmentName).replace(/"/g, '\\"') // to escape any quotes in the name
      headers.push(`"${theName}"`)
      headers.push(`"${theName} points"`)
    })
    csvRows.push(headers.join(','));
    // console.log('header row ', csvRows)
    this.state.filteredStudents.map(oneStudent => {
      let oneRow = [];
      oneRow.push(`"${oneStudent.firstname}"`)
      oneRow.push(`"${oneStudent.lastname}"`)
      oneRow.push(`"${oneStudent.email}"`)
      oneRow.push(`"${oneStudent.pantherID}"`)
      this.state.filteredAssignments.map(oneAssignment => { 
        let theAttempt = this.state.scoreData.filter((oneAttempt)=>{
          return oneAttempt.studentID === oneStudent._id && oneAttempt.assignmentID === oneAssignment._id
        })
        const endDate = oneAssignment.endDate.concat(' ', oneAssignment.endTime); // End availability date
        let mmEndDate=moment.tz(endDate, "America/New_York"); // convert END Date to moment
        mmEndDate.utc().format(); 
        const dueDate = oneAssignment.dueDate.concat(' ', oneAssignment.dueTime); // End availability date
        let mmDueDate=moment.tz(dueDate, "America/New_York"); // convert END Date to moment
        mmDueDate.utc().format(); 
        if (theAttempt.length > 0) {
          // if (theAttempt.length >1) {theAttempt = theAttempt[0]}
          let dateString = moment.tz(theAttempt[0].completionDateUTC, "America/New_York").format("lll");
          // console.log('one attempt ', theAttempt)
          // console.log('due date ', mmDueDate)
          // console.log('completion date UTC ', theAttempt[0].completionDateUTC)
          // console.log('completion date EST ', dateString)
          oneRow.push(`"${dateString}"`)  
          const points = calculateScore(oneAssignment, theAttempt[0].completionDateUTC);  
          oneRow.push(`"${points}"`)
        } else {
          const now = moment.utc()
          if (now.isAfter(mmEndDate)) {
            oneRow.push(`"not completed"`)
            oneRow.push(`"0"`)
          } else if (now.isAfter(mmDueDate)) {
            oneRow.push(`"pending (late)"`)
            oneRow.push(`" "`)
          } else {
            oneRow.push(`"pending"`)
            oneRow.push(`" "`)
          }
        } 
  
      })
      csvRows.push(oneRow.join(','));
    })
    this.setState({cvsData: csvRows.join('\n')})
    //return csvRows // return csvRows.join('\n') // 
  }

  // download = () => {
  //   const data = this.dataToCSV();
  //   const blob = New Blob([data], {type: 'text/csv'});
  //   const url = window.URL.createObjectURL(blob);


  // }

  sortAssignments () {
    const sortedList = this.props.theCourse.assignments;
      sortedList.sort((a, b)=> { 
      let x = a.dueDate;
      let y = b.dueDate;
      if (x === y) {
        x = a.dueTime;
        y = b.dueTime;
      } 
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    }) 
    this.setState({filteredAssignments: sortedList})
  }

  sortStudents () {
    const sortedList = this.props.theCourse.students;
      sortedList.sort((a, b)=> { 
      let x = a.lastname;
      let y = b.lastname;
      if (x === y) {
        x = a.firstname;
        y = b.firstname;
      } 
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    }) 
    this.setState({filteredStudents: sortedList})
  }

  render () {
    //className="table"  className="fixed_header"
    const now = moment.utc().tz("America/New_York").format('MMM-D-YYYY-H-m-s')
    return (
      <div>
        {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <div className="row px-4 py-1 justify-content-between">
          <h1>Grades</h1>
          {this.state.cvsData && <CSVLink className="btn btn-info mb-2" data={this.state.cvsData} filename={`${this.props.theCourse.courseName}_${now}.csv`}>Download grades</CSVLink>}
        </div>
        <div className="tableDiv">
        <table className="table" >
          {this.showAssignments()}
          <tbody>
            {this.formatScores()}
          </tbody>
        </table>
        </div>
      </div>
    )
  }

}

const calculateScore = (oneAssignment, completionDate) => {
  const endDate = oneAssignment.endDate.concat(' ', oneAssignment.endTime); // End availability date
  let mmEndDate=moment.tz(endDate, "America/New_York"); // convert END Date to moment
  mmEndDate.utc().format(); 
  const dueDate = oneAssignment.dueDate.concat(' ', oneAssignment.dueTime); // End availability date
  let mmDueDate=moment.tz(dueDate, "America/New_York"); // convert END Date to moment
  mmDueDate.utc().format(); 
  const completionTime = moment(completionDate);
  // console.log('calculating ...',completionDate, ' moment ', completionTime)
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

export default ShowGrades;