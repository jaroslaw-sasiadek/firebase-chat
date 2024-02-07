import { useEffect, useState } from "react";
import { User } from "firebase/auth";

import { MessagesType, handleOnSnapshot, sendMessage, signOut } from "../libs";
import "./Chat.css";

export const Chat = ({ user }: { user: User }) => {
  const [messages, setMessages] = useState<MessagesType>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    handleOnSnapshot(setMessages);
  }, []);

  if (!user) return;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <>
      <header>
        <span>
          Logged in as <span>{user.displayName}</span>
        </span>
        <button onClick={signOut}>Logout</button>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="send-message">
            <input
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <button
              onClick={() => sendMessage(newMessage, user, setNewMessage)}
            >
              Send Message
            </button>
          </div>
        </form>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              "message-bubble " +
              (message.data.displayName === user.displayName
                ? "current-user"
                : "other-users")
            }
          >
            <img
              id="avatar"
              src={message.data.photoURL}
              alt="avatar image"
              referrerPolicy="no-referrer"
            />
            <span className="message-text">{message.data.text}</span>
          </div>
        ))}
      </main>
    </>
  );
};
