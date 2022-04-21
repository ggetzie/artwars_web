import React from "react";
import {useNavigate} from "react-router-dom";
import Arrow from "../res/images/arrow.png";
import awLogo from "../res/images/aw-logo-square.png";

const ScreenHeader = ({
  showBack,
  title,
  headerRight,
  titleClasses,
  backTo,
}: {
  showBack: boolean;
  title: string;
  headerRight?: JSX.Element;
  titleClasses?: string;
  backTo?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="screen-header">
      <div className="sh-left">
        <img src={awLogo} alt="Art Wars" width={50} height={50} />
        {showBack && (
          <img
            id="back-arrow"
            src={Arrow}
            alt="Go Back"
            onClick={() => (backTo ? navigate(backTo) : window.history.back())}
            width={50}
          />
        )}
      </div>
      <div className={`sh-main ${titleClasses}`}>
        <h2>{title}</h2>
      </div>
      <div className="sh-right">{headerRight}</div>
    </div>
  );
};

export default ScreenHeader;
