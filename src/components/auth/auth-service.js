// auth/auth-service.js

import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
      // origin: process.env.REACT_APP_BASE_URL, // may want to remove
    });
    this.service = service;
  }


signup = (email, password, confirm, firstname, lastname, pantherID ) => {
    console.log("signup service", email, password, confirm, firstname, lastname, pantherID)
    return this.service.post('/signup', {email, password, confirm, firstname, lastname, pantherID })
    .then(response => {
      console.log("received response", response.data)
      return response.data
    })
      .catch((err)=>{
        console.log(err)
        return err;
      })
  }

  instructorSignup = (email, password, confirm, firstname, lastname, institution, title ) => {
    return this.service.post('/instructor-signup', {email, password, confirm, firstname, lastname, institution, title })
    .then(response => response.data)
  }

// passport strategy requires a username to authenticate, you can give it the email as username
  login = (email, password) => {
    console.log("login service", email, password)
    return this.service.post('/login', {username:email, password})
    .then(response => {
      console.log(response.data)
      return response.data
    })
    // .catch((err)=>{
    //   console.log(err)
    //   return err;
    // })
  }

  forgot = (email) => {
    return this.service.post('/forgot', {email})
    .then(response => response.data)
  }

  reset = (password,confirm, token) => {
    return this.service.post('/reset', {password,confirm, token})
    .then(response => response.data)
  }

  password = (password,confirm) => {
    return this.service.post('/password', {password,confirm})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => {
      console.log('response ', response)
      console.log('response headers ', response.headers)
      return response.data
    })
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => {
      console.log('response ', response)
      console.log('response headers ', response.headers)
      return response.data
    })
  }

  updateProfile = (userId, firstname, lastname, title, institution) => {
    return this.service.put('/profile/update', {userId, firstname, lastname, title, institution})
    .then(response => response.data)
  }

}

export default AuthService;