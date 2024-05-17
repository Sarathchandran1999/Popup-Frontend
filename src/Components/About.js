import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/main2.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div id="about" className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Create your own Popups using PopUpMe
        </h1>
        <p className="primary-text">
        Create high-converting popups to capture leads, promote offers, and boost engagement -  it's easy with user-friendly popup builders!
        </p>
        <p className="primary-text">
          You can edit your popups according to your need
        </p>
        {/* <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;
