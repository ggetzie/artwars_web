import React from "react";

const MessageBoard = ({messages}: {messages: string[]}) => {
  return (
    <div
      className="message-board"
      style={{overflowY: "auto"}}
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
    </div>
  );
};

export default MessageBoard;
