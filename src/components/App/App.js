import React, { Component} from "react";
import "./App.css";

import Particles from 'react-tsparticles';
import particleOptions from "../Particles/ParticleOptions";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../FaceRecognition/FaceRecognition";

class App extends Component {
  render() {
  return (
    <div className="">
      <Particles 
        className="particles"
              params={particleOptions}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );}
}

export default App;