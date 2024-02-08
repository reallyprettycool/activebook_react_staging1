import React, { Component } from 'react';
import axios from 'axios';

class StudentList extends Component {
  constructor(props){
    super(props);
    this.state = { 
      students:this.props.theCourse.students,
      filtered:this.props.theCourse.students,
      searchValue: '',
    }
    this.service = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/courses`, withCredentials: true});
  }

  componentDidMount() {
    this.getStudents();
    this.sortStudents('lastname');
  }

  getStudents = () =>{
    this.service.get(`/${this.props.theCourse._id}`)
    .then(responseFromApi => {
      this.setState({
        students: responseFromApi.data.students, 
        filtered: responseFromApi.data.students, 
      }, ()=> this.sortStudents('lastname'));
      console.log('the students .... ', responseFromApi.data.students)
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  deleteStudent = (studentEmail) =>{
    this.service.put(`remove-student/${this.props.theCourse._id}`, {studentEmail})
    .then(responseFromApi => {
      console.log('student removed .... ', responseFromApi)
      this.getStudents();
      this.props.getCourse();
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  searchFunction = (searchTerm)=>{
    let filteredList = [...this.state.students];
    filteredList = filteredList.filter((oneStudent)=>{
      // let toInclude= false
      // Object.values(oneStudent).forEach(oneVal => {
      //   if (oneVal.toLowerCase().includes(searchTerm.toLowerCase())) {toInclude = true } });
      // if (toInclude) { return oneStudent }
      return oneStudent.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || oneStudent.lastname.toLowerCase().includes(searchTerm.toLowerCase()) || oneStudent.email.toLowerCase().includes(searchTerm.toLowerCase())
    })

    this.setState({filtered: filteredList});
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

  sortStudentsBy(event) {
    const sortBy = event.target.id
    this.sortStudents(sortBy);
  }

  sortStudents(sortBy) {
    if (this.state.filtered) {
      const sortedList = this.state.filtered.slice();
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
  }

  showStudents () {
    if (this.state.filtered) {
      return this.state.filtered.map((oneStudent, index)=>{
        return (
          <tr key={index}>
            <td>{oneStudent.firstname}</td>
            <td>{oneStudent.lastname}</td>
            <td>{oneStudent.email}</td>
            <td><button className='btn btn-secondary' onClick={() => { if (window.confirm(`Are you sure you want to delete this student: ${oneStudent.firstname} ${oneStudent.lastname}?`)) this.deleteStudent(oneStudent.email) } } ><span className="fa fa-times"></span></button></td>
          </tr>
        )
      })
    }
  }

  render () {
    return (
      <div>
        <h2>{this.props.theCourse.courseName}</h2>
        {this.showSearch()}
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">First name <span className="fa fa-sort-down" id="firstname" onClick={(e)=>this.sortStudentsBy(e)} ></span></th>
              <th scope="col">Last Name <span className="fa fa-sort-down" id="lastname" onClick={(e)=>this.sortStudentsBy(e)} ></span></th>
              <th scope="col">Email <span className="fa fa-sort-down" id="email" onClick={(e)=>this.sortStudentsBy(e)} ></span></th>
              <th scope="col">Remove <span className="fa fa-sort-down" id="email" onClick={(e)=>this.sortStudentsBy(e)} ></span></th>
            </tr>
          </thead>
          <tbody>
            {this.showStudents()}
          </tbody>
  
        </table>

      </div>
     )
    }
  
  } 
  
  
  export default StudentList;
