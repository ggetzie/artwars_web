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
type TTPos = {
  top: number;
  left: number;
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
): TTPos {
  // calculate coordinates for the fixed position of the tip
  const vp = window.visualViewport;
  const coords = target.getBoundingClientRect();

  function LeftOrRight() {
    // choose horizontal position of tip when it is on top or bottom of target
    const xLeft = coords.x;
    const xRight = vp.width - (coords.x + coords.width);
    if (xLeft > xRight) {
      // more space on the left
      // align right edge of tip 10px to right of center of target
      return {left: coords.x + coords.width / 2 + 20 - tipDims.width};
    } else {
      // more space on right
      // align left edge of tip 10px to left of center of target
      return {left: coords.x + coords.width / 2 - 20};
    }
  }
  function TopOrBottom() {
    // choose vertical position of tip when it is on left or right of target
    const yTop = coords.y;
    const yBottom = vp.height - (coords.y + coords.height);
    if (yTop > yBottom) {
      // more space on top
      // align bottom of tip 10px below center of target
      return {top: coords.y + coords.height / 2 + 20 - tipDims.height};
    } else {
      // more space on bottom
      // align top of tip 10px above center of target
      return {top: coords.y + coords.height / 2 - 20};
    }
  }
  switch (location) {
    case "top":
      return {top: coords.y - tipDims.height - 10, ...LeftOrRight()};
    case "bottom":
      return {top: coords.y + coords.height + 20, ...LeftOrRight()};
    case "left":
      return {left: coords.x - tipDims.width - 20, ...TopOrBottom()};
    case "right":
      return {left: coords.x + coords.width + 20, ...TopOrBottom()};
    default:
      return {top: 0, left: 0};
  }
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
      pos.left = coords.x + coords.width;
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

  const BaseStyle: React.CSSProperties = {
    backgroundColor: "#555",
    color: "white",
    borderRadius: "0.2em",
    padding: "0.5em",
    position: "fixed",
    width: "fit-content",
    maxWidth: "40%",
    maxHeight: "40%",
    zIndex: 1,
  };

  useLayoutEffect(() => {
    if (visibility) {
      setTarget(document.getElementById(targetId));
    }
    if (tipRef && tipRef.current) {
      setTipDims({
        width: tipRef.current.offsetWidth,
        height: tipRef.current.offsetHeight,
      });
    }
  }, [targetId, visibility]);

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
