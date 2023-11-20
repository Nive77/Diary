import React, { useState } from 'react';
import { Input } from '@mui/material';
import logo1 from "../images/Home_Bg.jpeg";
import './Home.css';
import About from "./About";
import img1 from "../images/carousel-1.jpg";
import img2 from "../images/carousel-1.jpg"
import Footer from "./Footer.js"


const Home = () => {
  

  return (
    <main>
        <div className="container-fluid px-0 mb-5">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="w-100" src={img1} alt="Image" />
            <div className="carousel-caption">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-lg-8 text-start">
                    <p className="fs-4 text-white">Welcome to our dairy farm</p>
                    <h1 className="display-1 text-white mb-5 animated slideInRight">The Farm of Dairy products</h1>
                    <a href="" className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explore More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      
      </div>
    </div>
      <About/>
      <Footer/>
    </main>
  );
};

export default Home;
