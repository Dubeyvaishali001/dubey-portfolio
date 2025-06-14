import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './App.css';
import ParticalBg from './ParticalBg';
import ParticalBg1 from './ParticalBg1';
import Sliders from './Sliders';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mobileAppImage from './Webapp.png';
import OnlineVotingImage from './mobapp.jpg';
import { createAutoScroll } from './autoScroll.js';
import mypro from './asset/mypro.jpg';


import WordCloudComponent from "./WordCloudComponent";

// Intro Animation Component
const IntroAnimation = ({ onComplete }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const images = imageRef.current;
    const container = containerRef.current;

    if (!images || !container || hasAnimated) return;

    const animation = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 1000,
      complete: () => {
        const rect = images.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        onComplete({
          top: rect.top - containerRect.top,
          left: rect.left - containerRect.left,
          width: rect.width,
          height: rect.height,
        });
        setHasAnimated(true);
      },
    });

    animation.add({
      targets: images,
      scale: [1, 0.7],
    });
  }, [onComplete, hasAnimated]);

  return (
    <div ref={containerRef} className="intro-container">
      <img ref={imageRef} src={mypro} alt="Intro" className="intro-image" />

    </div>
  );
};

// Main Website Component
const MainWebsite = ({ initialImagePosition, onTransitionComplete }) => {
  const containerRef = useRef(null);
  const profileImageRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isBioVisible, setIsBioVisible] = useState(false);
  const projectsRef = useRef(null);
  const bioRef = useRef(null); 
  const ConRef = useRef(null); // Added reference for the bio section

  const handleGlowClick = (sectionRef) => {
    if (sectionRef.current) {
      // Add the glow class to trigger the animation
      sectionRef.current.classList.add('glow');
      
      // Remove the glow class after animation duration (3 seconds)
      setTimeout(() => {
        sectionRef.current.classList.remove('glow');
      }, 3000); // 3s to match the animation duration
    }
  };

  useEffect(() => {
    if (!containerRef.current || !profileImageRef.current || !initialImagePosition || hasAnimated) return;

    const image = profileImageRef.current;
    const container = containerRef.current;
    const imageParent = image.parentElement;
    const finalRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Set initial styles
    image.style.position = 'fixed';
    image.style.top = `${initialImagePosition.top + containerRect.top}px`;
    image.style.left = `${initialImagePosition.left + containerRect.left}px`;
    image.style.width = `${initialImagePosition.width}px`;
    image.style.height = `${initialImagePosition.height}px`;
    image.style.borderRadius = '20px';
    image.style.zIndex = '1';

    // Fade in the container
    container.style.opacity = '1';
    
    // Calculate the transform values
    const x = `${finalRect.top}px`;

    anime({
      targets: image,
      top: x,
      left: finalRect.left,
      width: finalRect.width,
      height: finalRect.height,
      borderRadius: '20px',
      easing: 'easeInQuad',
      duration: 1000,
      complete: () => {
        image.style.opacity = '1';
        image.style.position = 'absolute';
        image.style.top = '0';
        image.style.left = '0';
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.zIndex = '1';

        setTimeout(() => {
          imageParent.style.transform = 'translateY(0px)';
          setIsBioVisible(true);
        }, 1000); 
        onTransitionComplete();
      },
    });

    // Fade in and slide up other elements
    anime({
      targets: Array.from(containerRef.current.children).filter(
        (el) => el !== image.parentElement
      ),
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 1000,
      delay: anime.stagger(100),
    });
  }, [initialImagePosition, onTransitionComplete]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        title:(
          <div>
            Heart Attack Risk Prediction Using SHAP (Web App){" "}
            <a
              href="https://github.com/Dubeyvaishali001/Heart-attack-prediction"
              target="_blank"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <i>Link</i>
            </a>
          </div>
        ),
        image: mobileAppImage,
        content:( <div>
        <h5>Project Description</h5>
        <p>
          <strong>Description:</strong>
          <br />
A web application that predicts the likelihood of a heart attack based on user inputs using machine learning and SHAP for explainability. Built with Python (Flask), HTML/CSS, and deployed online for public access.        </p>

        <h5>Key Features</h5>
        <ul>
          <li>
            Takes health-related inputs like age, blood pressure, cholesterol levels, etc., from users.
          </li>
          <li>
            Predicts the risk of a heart attack using a trained deep learning model such as TabTransformer and GRU.
          </li>
          <li>
            Utilizes SHAP (SHapley Additive exPlanations) to explain individual predictions in an interpretable way.
          </li>
          <li>
            Displays results with visual graphs for better understanding of risk factors.
          </li>
          <li>
            Simple, clean, and mobile-responsive user interface using HTML, CSS, and JavaScript.
          </li>
        </ul>

        <h5>Additional Features & Achievements</h5>
        <ul>
          <li>
            Trained and evaluated models like Logistic Regression and Random Forest with high accuracy.
          </li>
          <li>
            Integrated SHAP visualizations to clearly show which health parameters contribute most to predictions.
          </li>
          <li>
            Deployed on a public server for easy access and usability.
          </li>
          <li>
            Conducted testing with various user data to validate prediction reliability and interface smoothness.
          </li>
        </ul>
      </div>
    )
      },
      {
        title: (
          <div>
            Voyage Verse (An Android App){" "}
            <a
              href="https://github.com/Dubeyvaishali001/travel-app"
              target="_blank"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <i>Link</i>
            </a>
          </div>
        ),
        image: OnlineVotingImage,
        content: (
          <div>
            <h5>Project Description</h5>
            <p>
              <strong>Description:</strong>
              <br />
        Voyage Verse is an Android-based travel planner app that helps users discover tourist destinations and book verified local guides. It simplifies trip planning by integrating Google Maps for real-time location services and Firebase for secure data storage and user management.
            </p>
    
            <h5>Key Features</h5>
            <ul>
        <li>
          Explore popular tourist destinations with images, descriptions, and location details.
        </li>
        <li>
          Book trusted and verified local guides directly through the app.
        </li>
        <li>
          Integrated with Google Maps API for accurate navigation and real-time location assistance.
        </li>
        <li>
          Firebase Authentication and Firestore database for secure user login and dynamic data handling.
        </li>
        <li>
          Smooth and responsive user interface built using Android Studio and XML layouts.
        </li>
      </ul>
    
            <h5>Additional Features & Achievements</h5>
            <ul>
        <li>
          Successfully tested the app across multiple Android devices for consistent performance.
        </li>
        <li>
          Implemented Firebase Realtime Database for storing bookings and user profiles.
        </li>
        <li>
          Personalized user experience with saved trip history and guide preferences.
        </li>
        <li>
          Designed a clean and intuitive UI focused on travel usability and convenience.
        </li>
        <li>
          Received positive feedback from beta users for ease of use and practical utility during travel.
        </li>
      </ul>
          </div>
        )
      }
    ];

      // Auto-scroll effect every 5 seconds
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 30000); // 5000ms = 5 seconds
    
        // Clear the interval on component unmount
        return () => clearInterval(interval);
      }, [slides.length]);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    

    const sliderRef = useRef();

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide speed
    arrows: false, // Hide arrows
  };

  const wordsProgramming = [
    { text: "Java", value: 100 },
    { text: "C", value: 90 },
    { text: "C++", value: 80 },
    { text: "Python", value: 70 },
  ];

  const wordsDatabases = [
    { text: "MySQL", value: 100 },
    { text: "PostgreSQL", value: 80 },
    { text: "MongoDB", value: 70 },
    { text: "Firebase", value: 60 },
    { text: "Oracle", value: 50 },
  ];

  const wordsWeb = [
    { text: "HTML", value: 100 },
    { text: "CSS", value: 90 },
    { text: "React", value: 80 },
    { text: "JavaScript", value: 70 },
    { text: "TypeScript", value: 55 },
    { text: "Node.js", value: 60 },
  ];

  const wordsDevTools = [
    { text: "Docker", value: 100 },
    { text: "Android Studio", value: 80 },
    { text: "Git", value: 70 },
    { text: "AWS", value: 80 },
    { text: "PowerBI", value: 60 },
    { text: "VSCode", value: 50 },
  ];

  const wordsOS = [
    { text: "Linux", value: 100 },
    { text: "Windows", value: 80 },
    { text: "Ubuntu", value: 60 },
    { text: "CentOS", value: 50 },
  ];

  const contactInfoElement = ConRef.current?.querySelector('.contact-info'); // Using ref to access the DOM element
        
  if (contactInfoElement) {
      const cleanup = createAutoScroll(contactInfoElement, {
          scrollSpeed: 0.3,
          pauseOnHover: true
      });}


  return (
    <div ref={containerRef} className="container">
      <header className="header">
        <h1><i>VAISHALI</i> DUBEY</h1>
        <nav>
        <a href="#" onClick={() => handleGlowClick(projectsRef)} className="glow-link">
        PROJECTS
      </a>
      <a href="#" onClick={() => handleGlowClick(bioRef)} className="glow-link">
        SKILLS
      </a>
          <a href="#" onClick={() => handleGlowClick(ConRef)} className="glow-link">CERTIFICATION</a>
        </nav>
        <ParticalBg1 id="particles1-section1" />
      </header>

      <div className="intro">
        <ParticalBg id="particles-section5" />
        <h2>Software Developer</h2>
        <h2><i>Full-Stack Developer</i></h2>
        <h2>Cloud Solutions Architect</h2>
      </div>
      
      <div className="profile-image-container">
        <img ref={profileImageRef} src="myProfile1.png" alt="Profile" className="profile-image" />
        <ParticalBg id="particles-section7" />
      </div>

      <div ref={bioRef} className="bio">
          <div className="bio-text">
          {isBioVisible && (
            <Slider {...settings}>
              <div>
                <h3>Programming Languages</h3>
                <WordCloudComponent words={wordsProgramming} />
              </div>
              <div>
                <h3>Databases</h3>
                <WordCloudComponent words={wordsDatabases} />
              </div>
              <div>
                <h3>Web Development</h3>
                <WordCloudComponent words={wordsWeb} />
              </div>
              <div>
                <h3>Developer Tools</h3>
                <WordCloudComponent words={wordsDevTools} />
              </div>
              <div>
                <h3>Operating Systems</h3>
                <WordCloudComponent words={wordsOS} />
              </div>
            </Slider>
            )}
          </div>
          <ParticalBg id="particles-section2" />
        </div>
      

        <div ref={projectsRef} className="projects">
     <ParticalBg id="particles-section3" />
      <div className="projects-header">
      <h3>Projects</h3>
        </div>
      <div className="projects-slider-container">
      <Sliders slides={slides} />
      </div>
      </div>




      <div className="contact" ref={ConRef}>
    <ParticalBg id="particles-section4" />
    <h2>Achievements & Certificates</h2>
    <div className="contact-info">
        <ul>
          <br></br>
          <br></br>
            <li>AWS APAC's Solutions Architecture on<a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_i5Na6FTje7zxBaKtZ_1734804327990_completion_certificate.pdf" target="_blank">Forage</a>.</li>
            <li>Achieved 10th rank on the TANCET Entrance Exam for MCA in 2023.</li>
            <li>Presented technical paper on “DL for Medical Diagnosis” at college tech fest.</li>
            <li>Data Science with Python <a href="https://drive.google.com/file/u/2/d/1KxtL8l4HMEmtrWPX3ICFKCiZ8S7rcbN8/view" target="_blank">(From NPTEL)</a>.</li>
            <li>Java Certification from Udemy <a href="https://drive.google.com/file/d/1OV7DzVqqI4pIw_oh5K4N1xFm_YX_H2xx/view?usp=sharing" target="_blank">(Skill Badge in Java Programming)</a>.</li>
            
        </ul>
    </div>
</div>


      <footer className="footer">
        <ParticalBg id="particles-section6" />
        <a href="https://github.com/Dubeyvaishali001" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/vaishali-dubey-426957304/" target="_blank">LinkedIn</a>
        <a href="mailto:vaishalidubeyofficial@gmail.com" target="_blank">Email</a>
        <a href="https://drive.google.com/file/d/1xadYfiGd009G1yAGZx4ucnsdDvAA-Eq-/view?usp=sharing" target="_blank">Resume</a>
      </footer>
    </div>
  );
};

// App Component
const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [initialImagePosition, setInitialImagePosition] = useState(null);
  const [transitionComplete, setTransitionComplete] = useState(false);


  const handleIntroComplete = (imageRect) => {
    setInitialImagePosition(imageRect);
    setShowMain(true);
  };

  const handleTransitionComplete = () => {
    setTransitionComplete(true);
  };


  return (
    <div className="app">
      {!transitionComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      {showMain && (
        <MainWebsite
          initialImagePosition={initialImagePosition}
          onTransitionComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
};


export default App;