import React from "react";
import {ScreenHeader} from "../components";

const About = () => {
  return (
    <>
      <ScreenHeader showBack={true} title="About" />
      <div className="vert-center">
        <h3>Concept and Content</h3>
        <p>
          <a href="https://msteinberg.art">Monica Steinberg</a>
        </p>
        <h3>Programming</h3>
        <p>
          <a href="https://kotsf.com">Kotsf, LLC</a>
        </p>
        <h3>Design</h3>
        <p>Taylor Lovell</p>
        <h3>Illustrations</h3>
        <p>Hoying "Pinky" Yuen</p>
      </div>
    </>
  );
};

export default About;
