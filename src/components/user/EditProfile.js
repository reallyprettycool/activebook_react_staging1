import React, { Component } from 'react';
import AuthService from '../auth/auth-service';

class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
        firstname: this.props.theUser.firstname, 
        lastname: this.props.theUser.lastname,
        title: this.props.theUser.title,
        institution: this.props.theUser.institution,
        error: false,
    }
    this.service = new AuthService();
  }

    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const title = this.state.title;
    const institution = this.state.institution;
    console.log ('about to send axios request')
    this.service.updateProfile(this.props.theUser._id, firstname, lastname, title, institution)
    .then( response => {
        this.props.updateUser(response)
        console.log('the user object reponse 0-0-0',response)
      
        this.setState({
         firstname: '', lastname: '', title: '' , institution: '' , error:false,
        });
        if ('email' in response) {
        this.props.showMsg('User information updated')
        this.props.toggleForm()
        } else {
          this.setState({error: response})
        }

    }) // the error comes in the response
    .catch( error => console.log(error.response.data.message) )
  }

  handleChange = (event) => { 
    const {name, value} = event.target;
    this.setState({[name]: value});
    // console.log('user role .....', this.props.theUser.role === 'instructor')
  }

  renderInstructorForm () {
    return (
      <div>
        <div className="form-group">
          <label >Title</label>
          <input className="form-control" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
        </div>

        <div className="form-group">
          <label >Institution</label>
          <input className="form-control" type="institution" name="institution" value={this.state.institution} onChange={ e => this.handleChange(e)}/>
        </div>
      </div>
    )
  }

  render(){
    return (
    <div className="col-lg-6 col-md-8 col-sm-12">
      
      <button className="btn btn-secondary" onClick={()=>this.props.toggleForm()}>Cancel</button>
      
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
            <label for="firstname">First name</label>
            <input className="form-control" type="text" name="firstname" value={this.state.firstname}required placeholder="First name" onChange={ e => this.handleChange(e)}/>
        </div>

        <div className="form-group">
            <label for="lastname">Last name</label>
            <input className="form-control" type="text" name="lastname" value={this.state.lastname} required placeholder="Last name" onChange={ e => this.handleChange(e)}/>
        </div>

        {this.props.theUser.institution && this.renderInstructorForm()}

        {(this.state.error) && <p style={{ color: 'red' }}>{this.state.error.message}</p> }

        <button className="btn btn-primary mb-2">Submit</button>

      </form>
    </div>
    )
  }
}

export default EditProfile;