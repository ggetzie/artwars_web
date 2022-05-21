import React from "react";
import TourTip from "./TourTip";

const MessageBoard = ({messages}: {messages: string[]}) => {
  return (
    <div className="tour-tip-container message-board">
      <div className="message-board" style={{overflowY: "scroll"}}>
        <h3>Message Board</h3>

        <ul className="message-list">
          {messages.length > 0 ? (
            messages.map((m, i) => <li key={i}>{m}</li>)
          ) : (
            <li>No new messages</li>
          )}
        </ul>
      </div>
      <TourTip section="city" index={1} location="top" />
    </div>
  );
};

export default MessageBoard;
