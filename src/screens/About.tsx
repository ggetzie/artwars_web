import React from "react";
import {ScreenHeader} from "../components";

const About = () => {
  return (
    <>
      <ScreenHeader showBack={true} title="About" />
      <div className="vert-center">
        <h3 className="mb-4">Concept and Content</h3>
        <p className="m-0">
          <a href="https://msteinberg.art">Monica Steinberg</a>
        </p>

        <h3 className="mb-4 mt-10">Programming</h3>
        <p className="m-0">
          <a href="https://kotsf.com">Kotsf, Limited</a>
        </p>

        <h3 className="mb-4 mt-10">Design</h3>
        <p className="m-0">
          <a href="https://taylorlovell.myportfolio.com/">Taylor Lovell</a>
        </p>

        <h3 className="mb-4 mt-10">Illustrations</h3>
        <p className="m-0">Hoying "Pinky" Yuen</p>

        <h3 className="mb-4 mt-10">Fonts</h3>
        <p className="m-0">
          <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
        </p>
      </div>
    </>
  );
};

export default About;
