import React from "react";
import {useAppSelector} from "../hooks";
import TourTip from "./TourTip";
import TourModal from "./TourModal";
import {TourSection} from "../reducers/tour";
import TourSteps from "../util/steps";

const Tour = ({section}: {section: TourSection}) => {
  const steps = TourSteps[section];
  const {tour} = useAppSelector((state) => state.game);
  if (tour === section) {
    return (
      <>
        {steps.map((step, i) => {
          if (step.type === "modal") {
            return <TourModal key={i} index={i} section={section} />;
          } else if (step.type === "tip") {
            return (
              <TourTip
                key={i}
                index={i}
                section={section}
                targetId={step.targetId}
              />
            );
          } else {
            throw new Error(`Unknown step type: ${step.type}`);
          }
        })}
      </>
    );
  } else {
    return <></>;
  }
};

export default Tour;
