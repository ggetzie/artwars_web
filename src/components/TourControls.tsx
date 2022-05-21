import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faAngleDoubleRight,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
  TourSection,
  incrementIndex,
  decrementIndex,
  setIndex,
  disableTours,
  getIndex,
} from "../reducers/tour";

const TourControls = ({
  section,
  children,
}: {
  section: TourSection;
  children: React.ReactNode;
}) => {
  const tour = useAppSelector((state) => state.tour);
  const currentIndex = getIndex(tour, section);
  const dispatch = useAppDispatch();
  return (
    <div className="tour-control-wrapper">
      <div className="tour-buttons mb-2">
        <div className="tour-button-col">
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            title="Skip this tutorial"
            onClick={() => dispatch(setIndex([section, -1]))}
            className="ml-4 pointer"
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="pointer m-auto"
            title="Next"
            icon={faChevronRight}
            onClick={() => dispatch(incrementIndex(section))}
          ></FontAwesomeIcon>
        </div>
        <div className="pl-10 pr-10 vert-center">{children}</div>
        <div className="tour-button-col">
          <FontAwesomeIcon
            icon={faBan}
            className="pointer"
            onClick={() => dispatch(disableTours())}
            title="Disable all tutorials"
          ></FontAwesomeIcon>
          {currentIndex > 0 && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="pointer m-auto"
              title="Back"
              onClick={() => dispatch(decrementIndex(section))}
            ></FontAwesomeIcon>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourControls;
