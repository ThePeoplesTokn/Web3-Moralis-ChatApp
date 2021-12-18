import { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

const SendMessage = ({ endofMessagesRef }) => {
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();
    messages
      .save({
        message: message,
        user: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (message) => {
        //   console.log(message);
        },
        (error) => {
          console.log(error.message);
        }
      );
    setMessage("");
    endofMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form
      className="fixed flex w-11/12 max-w-2xl p-5 bg-black border-4 border-indigo-600 rounded-full shadow-2xl bottom-10 opacity-80"
      onSubmit={sendMessage}
    >
      <input
        type="text"
        placeholder={`Enter a message ${user.getUsername()}...`}
        className="flex-grow pr-5 text-white placeholder-blue-500 bg-transparent outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={sendMessage}
      />
      <button className="font-bold text-indigo-500">Send</button>
    </form>
  );
};

export default SendMessage;
