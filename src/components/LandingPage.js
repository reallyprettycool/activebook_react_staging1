import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



const LandingPage = (props) =>{
    return (
      <div>
        <section className="container-fluid pt-2">
          <div className="header">
            <div className="row">
                <h1>Make learning fun and experiential</h1>
            </div>
            <Link className="btn call2actionBtn" to='/signup'> Sign up</Link>
            <img className="img mt-4" src="/images/fun-learning.png" alt="fun learning"/>
            <hr/>
          </div>
        </section>

        <section  className="container-fluid services">
            <div className="row py-2">
                <div className="col-lg-4 col-sm-9 service-box">
                  <span className="fa fa-cubes circle"></span>
                  <h3>Learner-centered</h3>
                  <p>Activities are designed in a way that students self-manage as they learn and practice as many times as they need</p>
                </div>
                <div className="col-lg-4 col-sm-9 service-box">
                  <div className="fa fa-binoculars circle"></div>
                  <h3>Exploration</h3>
                  <p>The activities incite students to explore on their own while constructing and deepening their knowledge</p>
                </div>
                <div className="col-lg-4 col-sm-9 service-box">
                  <div className="fa fa-cogs circle"></div>
                  <h3>Independence</h3>
                  <p>Students begin to structure their knowledge before attending lecture or reading the material</p>
                </div>
              </div>
        </section>

        <section  className="container-fluid">
          <div className="row how">
            <div className="col-lg-6 col-sm-12">
              <img className="how-img" src="/images/students.jpg" alt="fun learning"/>
            </div>
            <div className="col-lg-6 col-sm-12 d-flex align-items-center">
              <h2>Our activities prompt students to learn by doing, while having fun in the process</h2>
            </div>
          </div>
        </section>

        <section className="container-fluid">
          <div className="row how">
            <div  className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-between">
              <h2>Select as many of our activities as you see fit and assign them to your students</h2>
            </div>
            <div className="col-lg-6 col-sm-12 d-flex justify-content-end">
              <img className="how-img" src="/images/students2.jpg" alt="fun learning"/>
            </div>
          </div>
        </section>

        <section pt-2>
          <div className="container-fluid header pt-2">
            <div className="row">
            <h1>Make learning fun and experiential</h1>
            </div>
            <Link className="btn call2actionBtn" to='/signup'> Sign up</Link>
            <img className="mt-4" src="/images/fun-learning.png" alt="fun learning"/>
            <hr/>
          </div>
        </section>
      </div>
    );
  //}
}

export default LandingPage;