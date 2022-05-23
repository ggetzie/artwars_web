import React from "react";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";
import TourControls from "./TourControls";
import TourSteps, {dedent} from "../util/steps";

type TipLocation = "top" | "bottom" | "left" | "right";

const TourTip = ({
  section,
  index,
  location,
  targetId,
}: {
  section: TourSection;
  index: number;
  location: TipLocation;
  targetId: string;
}) => {
  const tour = useAppSelector((state) => state.tour);
  const currentIndex = getIndex(tour, section);
  const visibility = index === currentIndex ? "visible" : "hidden";
  const content = TourSteps[section][index];
  const target = document.getElementById(targetId);
  const coords = target?.getBoundingClientRect();
  console.log(coords)
  return (
    <div className={`tour-tip tt-${location}`} style={{visibility: visibility}}>
      <TourControls section={section}>
        <div className="tour-content">
          <ReactMarkdown>{dedent(content)}</ReactMarkdown>
        </div>
      </TourControls>
    </div>
  );
};

export default TourTip;
