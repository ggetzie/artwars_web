import React, {useLayoutEffect, useState, useRef} from "react";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";
import TourControls from "./TourControls";
import TourSteps, {dedent} from "../util/steps";

type TipLocation = "top" | "bottom" | "left" | "right";

type AreaSet = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type Dimensions = {
  width: number;
  height: number;
};

function getBestLocation(target: HTMLElement): TipLocation {
  // find biggest area to left, right, top or bottom of target element
  // to place TourTip
  const coords = target.getBoundingClientRect();
  const vp = window.visualViewport;
  const areas: AreaSet = {
    left: vp.height * coords.x,
    right: vp.height * (vp.width - (coords.x + coords.width)),
    bottom: vp.width * (vp.height - (coords.y + coords.height)),
    top: vp.width * coords.y,
  };
  let best: TipLocation = "top";
  for (const key in areas) {
    if (areas[key as keyof AreaSet] > areas[best]) {
      best = key as TipLocation;
    }
  }
  return best;
}

function getTipPos(
  target: HTMLElement,
  location: TipLocation,
  tipDims: Dimensions
): React.CSSProperties {
  // calculate coordinates for the fixed position of the tip
  const vp = window.visualViewport;
  const coords = target.getBoundingClientRect();

  function minorAxis() {
    // Align the tip horizontally (if on top or bottom)
    // or vertically (if on left or right)
    const horizontal = location === "top" || location === "bottom";
    const available = horizontal ? vp.width : vp.height;
    const midTarget = horizontal
      ? coords.x + coords.width / 2
      : coords.y + coords.height / 2;
    const tipSize = horizontal ? tipDims.width : tipDims.height;

    // attempt to align middle of tip with middle of target
    let pos = midTarget - tipSize / 2;

    // adjust if tip goes off either end of screen
    if (pos < 0) {
      pos = 5;
    } else if (pos + tipSize > available) {
      pos = available - tipSize - 2;
    }

    return horizontal ? {left: pos} : {top: pos};
  }
  let res: React.CSSProperties = {};
  switch (location) {
    case "top":
      res = {top: coords.y - tipDims.height - 9, ...minorAxis()};
      break;
    case "bottom":
      res = {top: coords.y + coords.height + 20, ...minorAxis()};
      break;
    case "left":
      res = {left: coords.x - tipDims.width - 9, ...minorAxis()};
      break;
    case "right":
      res = {left: coords.x + coords.width + 20, ...minorAxis()};
      break;
    default:
      return {top: 0, left: 0};
  }
  return res;
}

const TipArrow = ({
  target,
  location,
}: {
  target: HTMLElement;
  location: TipLocation;
}) => {
  const ArrowBase: React.CSSProperties = {
    position: "fixed",
    borderWidth: "10px",
    borderStyle: "solid",
    borderColor: "#555 transparent transparent transparent",
  };
  const coords = target.getBoundingClientRect();
  let pos: React.CSSProperties = {};
  switch (location) {
    case "top":
      // center arrow in top of target
      pos.top = coords.y - 10;
      pos.left = coords.x + (coords.width / 2 - 5);
      pos.borderColor = "#555 transparent transparent transparent";
      pos.marginLeft = "-5px";
      break;
    case "bottom":
      // center arrow in bottom of target
      pos.top = coords.y + coords.height;
      pos.left = coords.x + (coords.width / 2 - 5);
      pos.borderColor = "transparent transparent #555 transparent";
      pos.marginLeft = "-5px";
      break;
    case "left":
      // center arrow on left side of target
      pos.top = coords.y + (coords.height / 2 - 5);
      pos.left = coords.x - 10;
      pos.borderColor = "transparent transparent transparent #555";
      pos.marginRight = "-5px";
      break;
    case "right":
      // center arrow on right side of target
      pos.top = coords.y + (coords.height / 2 - 5);
      pos.left = coords.x + coords.width;
      pos.borderColor = "transparent #555 transparent transparent";
      pos.marginLeft = "10px";
      break;
    default:
      throw new Error("Invalid value for location in TipArrow");
  }

  return (
    <div
      style={{...ArrowBase, ...pos}}
      id={`${target.getAttribute("id")}-tip-arrow`}
    />
  );
};

const TourTip = ({
  section,
  index,
  targetId,
}: {
  section: TourSection;
  index: number;
  targetId: string;
}) => {
  const tour = useAppSelector((state) => state.tour);
  const currentIndex = getIndex(tour, section);
  const visibility = index === currentIndex ? "visible" : "hidden";
  const {content} = TourSteps[section][index];
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [tipDims, setTipDims] = useState<Dimensions>({width: 200, height: 40});
  const vpWidth = window.visualViewport.width;

  const BaseStyle: React.CSSProperties = {
    backgroundColor: "#555",
    color: "white",
    borderRadius: "0.2em",
    padding: "0.5em",
    position: "fixed",
    maxWidth: vpWidth <= 640 ? "80%" : "40%",
    maxHeight: vpWidth <= 640 ? "80%" : "40%",
    zIndex: 1,
  };

  useLayoutEffect(() => {
    setTarget(document.getElementById(targetId));
    if (visibility === "visible") {
      target?.classList.add("tour-highlight");
    } else {
      target?.classList.remove("tour-highlight");
    }
    if (tipRef && tipRef.current) {
      setTipDims({
        width: tipRef.current.offsetWidth,
        height: tipRef.current.offsetHeight,
      });
    }
  }, [targetId, visibility, target]);

  if (!target) {
    return <></>;
  }

  const location = getBestLocation(target!);
  const pos = getTipPos(target!, location, tipDims);

  const style: React.CSSProperties = {
    visibility: visibility,
    ...BaseStyle,
    ...pos,
  };

  return (
    <div style={style} id={`${targetId}-tip`} ref={tipRef}>
      <TourControls section={section}>
        <div className="tour-content">
          <ReactMarkdown>{dedent(content)}</ReactMarkdown>
        </div>
      </TourControls>
      <TipArrow target={target} location={location} />
    </div>
  );
};

export default TourTip;
