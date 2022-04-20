import React from "react";
import Arrow from "../res/images/arrow.png";

const ScreenHeader = ({
  showBack,
  title,
  headerRight,
  titleClasses,
}: {
  showBack: boolean;
  title: string;
  headerRight?: JSX.Element;
  titleClasses?: string;
}) => {
  return (
    <div className="screen-header">
      <div className="sh-left">
        {showBack && (
          <img
            src={Arrow}
            alt="Go Back"
            onClick={() => window.history.back()}
            height={20}
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
