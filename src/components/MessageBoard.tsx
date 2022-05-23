import React from "react";
import TourTip from "./TourTip";

const MessageBoard = ({messages}: {messages: string[]}) => {
  return (
    <div
      className="message-board"
      style={{overflowY: "scroll"}}
      id="message-board"
    >
      <h3>Message Board</h3>

      <ul className="message-list">
        {messages.length > 0 ? (
          messages.map((m, i) => <li key={i}>{m}</li>)
        ) : (
          <li>No new messages</li>
        )}
      </ul>
      <TourTip
        section="city"
        index={12}
        location="top"
        targetId="message-board"
      />
    </div>
  );
};

export default MessageBoard;
