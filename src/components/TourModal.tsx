import React from "react";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";

const TourModal = ({
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
    <div className="tour-modal" hidden={index !== currentIndex}>
      {children}
    </div>
  );
};

export default TourModal;
