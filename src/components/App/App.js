import React, { Component } from "react";
import "./App.css";

import Clarifai from "clarifai";

import Particles from "react-tsparticles";
import particleOptions from "../Particles/ParticleOptions";
import Navigation from "../Navigation/Navigation";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import Logo from "../Logo/Logo";
import Rank from "../Rank/Rank";
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "568a8ad987284b48bcc235d0027c1e93",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById("inputImg");
    const width = Number(image.width);
    const height = Number(image.height);

    const boxData = regions.map((region) => {
      return {
        left: region.region_info.bounding_box.left_col * width,
        top: region.region_info.bounding_box.top_row * height,
        right: width - region.region_info.bounding_box.right_col * width,
        bottom: height - region.region_info.bounding_box.bottom_row * height,
      };
    });
    this.setState({ box: boxData });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value.trim() });
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    try {
      let response = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      );

      this.calculateFaceLocation(response);
      response = await fetch("http://localhost:3000/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.user.id,
        }),
      });
      const count = await response.json();
      console.log("count: ", count);
      this.setState(Object.assign(this.state.user, {entries: count}));
    } catch (err) {
      alert(err);
    }
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isSignedIn: false });
      this.setState({ imageUrl: ""});
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div>
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={user.name} rank={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
