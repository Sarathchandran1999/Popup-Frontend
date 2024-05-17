import React,{useEffect,useState} from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/main.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from 'react-hot-toast'; 
import axios from 'axios'

const Home = () => {
  const [showToasts, setShowToasts] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchAndDisplayPopups = async () => {
      try {
        const response = await axios.get("https://popupbackend-jyry.onrender.com/api/v1/pop/all");
        const popups = response.data;
        
        popups.forEach((popup) => {
          const { content, startDelay, sendInterval, hideDuration } = popup;

          const displayToast = () => {
            toast(content, {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          };

          // Set timeout for start delay
          const startTimeoutId = setTimeout(() => {
            if (showToasts) {
              displayToast();

              // Set interval for repeated display if sendInterval is provided
              if (sendInterval > 0) {
                const intervalId = setInterval(() => {
                  if (showToasts) {
                    displayToast();
                  }
                }, sendInterval);

                // Clear the interval after hideDuration
                setTimeout(() => {
                  clearInterval(intervalId);
                }, hideDuration);
              }
            }
          }, startDelay);

          // Clear the timeout when the component unmounts to prevent memory leaks
          return () => clearTimeout(startTimeoutId);
        });
      } catch (error) {
        console.error("Error fetching popups:", error);
      }
    };

    // Call the function immediately and then every 5 seconds
    fetchAndDisplayPopups();
    const id = setInterval(fetchAndDisplayPopups, 5000);
    setIntervalId(id);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(id);
  }, [showToasts]); // Rerun when showToasts changes

  const handleCreateNowClick = () => {
    const createNowSection = document.getElementById("create-now");
    if (createNowSection) {
      createNowSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleToasts = () => {
    setShowToasts(prev => !prev);
  };
  return (
    <div id="home" className="home-container">
      <Navbar />
      <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            
          }}
        />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your PopUps is Here!
          </h1>
          <p className="primary-text">
            Create and Show eye catching popUps By using POpMeUp
          </p>
          <button className="secondary-button" onClick={handleCreateNowClick}>
            Create Now! <FiArrowRight />{" "}
          </button>
          <button className="secondary-button" onClick={toggleToasts} style={{marginTop:"30px"}}>
            {showToasts ? "Stop" : "Start"} Popup 👏
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;







