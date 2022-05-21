import React from "react";
import ReactMarkdown from "react-markdown";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";
import TourControls from "./TourControls";
import TourSteps, {dedent} from "../util/steps";

const TourModal = ({section, index}: {section: TourSection; index: number}) => {
  const tour = useAppSelector((state) => state.tour);
  const currentIndex = getIndex(tour, section);
  const display = index === currentIndex ? "block" : "none";
  const content = TourSteps[section][index];
  console.log(content);
  return (
    <div className="modal-background" style={{display: display}}>
      <div className="modal-content">
        <TourControls section={section}>
          <div className="tour-content">
            <ReactMarkdown>{dedent(content)}</ReactMarkdown>
          </div>
        </TourControls>
      </div>
    </div>
  );
};

export default TourModal;
