import React, {useLayoutEffect, useState, useRef} from "react";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {TourSection, getIndex} from "../reducers/tour";
import {useAppSelector} from "../hooks";
import TourControls from "./TourControls";
import TourSteps, {dedent} from "../util/steps";

type TipLocation = "top" | "bottom" | "left" | "right";

type Dimensions = {
  width: number;
  height: number;
};

type AreaSet = {
  top: Dimensions;
  bottom: Dimensions;
  left: Dimensions;
  right: Dimensions;
};

type Position = {
  top: number;
  left: number;
};

function getArea(d: Dimensions): number {
  return d.height * d.width;
}

function getBestLocation(target: HTMLElement): [TipLocation, Dimensions] {
  // find biggest area to left, right, top or bottom of target element
  // to place TourTip
  const coords = target.getBoundingClientRect();
  const vp = window.visualViewport!;
  const areas: AreaSet = {
    left: {height: vp.height, width: coords.x},
    right: {height: vp.height, width: vp.width - (coords.x + coords.width)},
    bottom: {height: vp.height - (coords.y + coords.height), width: vp.width},
    top: {height: coords.y, width: vp.width},
  };
  let best: TipLocation = "top";
  for (const key in areas) {
    if (getArea(areas[key as keyof AreaSet]) > getArea(areas[best])) {
      best = key as TipLocation;
    }
  }
  return [best, areas[best]];
}

function getTipPos(
  location: TipLocation,
  tipDims: Dimensions,
  arrowPos: Position
): React.CSSProperties {
  // calculate coordinates for the fixed position of the tip
  const vp = window.visualViewport!;

  function minorAxis() {
    // Align the tip horizontally (if on top or bottom)
    // or vertically (if on left or right)

    const horizontal = location === "top" || location === "bottom";
    const available = horizontal ? vp.width : vp.height;
    const midTarget = horizontal ? arrowPos.left : arrowPos.top;
    const tipSize = horizontal ? tipDims.width : tipDims.height;

    // attempt to align middle of tip with middle of target
    let pos = midTarget - tipSize / 2;

    // adjust if tip goes off either end of screen
    if (pos < 0) {
      pos = 5;
    } else if (pos + tipSize > available) {
      pos = available - tipSize - 2;
    }

    return pos;
  }
  let res: React.CSSProperties = {};
  switch (location) {
    case "top":
      res = {top: arrowPos.top - tipDims.height, left: minorAxis()};
      break;
    case "bottom":
      res = {top: arrowPos.top + 20, left: minorAxis()};
      break;
    case "left":
      res = {left: arrowPos.left - tipDims.width - 5, top: minorAxis()};
      break;
    case "right":
      res = {left: arrowPos.left + 9, top: minorAxis()};
      break;
    default:
      return {top: 0, left: 0};
  }
  return res;
}

function getArrowPos(
  location: TipLocation,
  target: HTMLElement
): [Position, React.CSSProperties] {
  const coords = target.getBoundingClientRect();
  const vp = window.visualViewport!;
  function minorAxis() {
    const horizontal = location === "top" || location === "bottom";
    const oversize = horizontal
      ? coords.x + coords.width > vp.width
      : coords.y + coords.height > vp.height;
    if (horizontal) {
      return oversize ? coords.x + 10 : coords.x + (coords.width / 2 - 5);
    } else {
      return oversize ? coords.y + 10 : coords.y + (coords.height / 2 - 5);
    }
  }

  switch (location) {
    case "top":
      // center arrow in top of target
      return [
        {
          top: coords.y - 10,
          left: minorAxis(),
        },
        {
          borderColor: "#555 transparent transparent transparent",
          marginLeft: "-5px",
        },
      ];
    case "bottom":
      // center arrow in bottom of target
      return [
        {
          top: coords.y + coords.height - 10,
          left: minorAxis(),
        },
        {
          borderColor: "transparent transparent #555 transparent",
          marginLeft: "-5px",
        },
      ];
    case "left":
      // center arrow on left side of target
      return [
        {
          top: minorAxis(),
          left: coords.x - 10,
        },
        {
          borderColor: "transparent transparent transparent #555 ",
          marginLeft: "-5px",
        },
      ];

    case "right":
      // center arrow on right side of target
      return [
        {
          top: minorAxis(),
          left: coords.x + coords.width,
        },
        {
          borderColor: "transparent #555 transparent transparent  ",
          marginLeft: "10px",
        },
      ];

    default:
      throw new Error("Invalid value for location in TipArrow");
  }
}

const TipArrow = ({
  target,
  pos,
}: {
  target: HTMLElement;
  pos: React.CSSProperties;
}) => {
  const ArrowBase: React.CSSProperties = {
    position: "fixed",
    borderWidth: "10px",
    borderStyle: "solid",
  };

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
  const vpWidth = window.visualViewport!.width;

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

  const [location, availableArea] = getBestLocation(target!);
  const tipMax: React.CSSProperties = {
    maxWidth: Math.min(availableArea.width - 15, 620),
    maxHeight: availableArea.height - 15,
  };
  const [arrowPos, arrowCSS] = getArrowPos(location, target);
  const pos = getTipPos(location, tipDims, arrowPos);

  const style: React.CSSProperties = {
    visibility: visibility,
    ...BaseStyle,
    ...tipMax,
    ...pos,
  };

  return (
    <div style={style} id={`${targetId}-tip`} ref={tipRef}>
      <TourControls section={section}>
        <div className="tour-content">
          <ReactMarkdown>{dedent(content)}</ReactMarkdown>
        </div>
      </TourControls>
      <TipArrow target={target} pos={{...arrowPos, ...arrowCSS}} />
    </div>
  );
};

export default TourTip;
