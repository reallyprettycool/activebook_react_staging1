import React, { Component } from 'react';

class Assignments extends Component {
  constructor(props){
    super(props);
    this.state = { courseList: [], addCourse:false, createCourse:false,};
    this.service = axios.create({ baseURL: 'http://localhost:5000/api', withCredentials: true});
  }

render(){
  return(
    <div></div>
  )
  }

}

export default Assignments;
