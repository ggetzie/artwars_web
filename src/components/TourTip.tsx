import React from "react";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";

const TourTip = ({
  section,
  index,
  children,
}: {
  section: TourSection;
  index: number;
  children: React.ReactNode;
}) => {
  const tour = useAppSelector((state) => state.tour);
  const currentIndex = getIndex(tour, section);
  return (
    <div className="tour-tip" hidden={index !== currentIndex}>
      {children}
    </div>
  );
};

export default TourTip;
