import React from "react";
import './About.css'; // Import the CSS file
import img1 from "../images/service.png";
import img2 from "../images/product.png"

const About = () => {
  
  return (
    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
    <div className="section-title bg-white text-start text-primary pe-3">About Us</div>
    <h1 className="mb-4">Know About Our Dairy Farm & Our History</h1>
    <p className="mb-4" style={{ color:'CaptionText' }}>
    Welcome to our Dairy Delights – where the pure goodness of dairy comes to life! At Dairy Delights, we take pride in crafting a delectable range of dairy products that are not just delicious but also wholesome and nourishing. Our website is your gateway to a world of creamy indulgence and nutritional excellence.
    Dive into our extensive lineup of dairy delights, from rich and velvety artisanal cheeses to luscious yogurts that dance on your taste buds. Indulge in the smooth textures of our butters and spreads, each lovingly churned to perfection. Discover the freshness of our farm-fresh milk, a testament to our commitment to quality and purity.
    </p>
    <br></br>
    <br></br>
    <div className="row g-5 pt-2 mb-5" >
      <div className="col-sm-6" style={{ marginLeft: '300px' }}>
        <img className="img-fluid mb-4" src={img1} alt="" />
        <h5 className="mb-3">Dedicated Services</h5>
        <span>Experience the true essence of goodness with our dairy products</span>
      </div>
      <div className="col-sm-6" style={{ marginRight: '300px' }}>
        <img className="img-fluid mb-4" src={img2} alt="" />
        <h5 className="mb-3">Organic Products</h5>
        <span>Savor the untainted richness of our organic dairy products.</span>
      </div>
    </div>
   
  </div>
  );
};

export default About;
