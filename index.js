import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
// import Popper from 'popper.js';
import 'font-awesome/css/font-awesome.min.css';
// import moment from 'moment'
// npm install moment --save

ReactDOM.render(
  <Router>
      <App />
  </Router>
, document.getElementById('root'));
registerServiceWorker();