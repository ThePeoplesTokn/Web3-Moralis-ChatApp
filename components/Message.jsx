import { useMoralis } from "react-moralis";
import Avatar from "./Avatar";
import TimeAgo from "timeago-react";
import Image from "next/image";
const Message = ({ message }) => {
  const { user } = useMoralis();
  const isOwnMessage = message.get("ethAddress") === user.get("ethAddress");
  return (
    <div
      className={`flex items-end space-x-2 relative ${
        isOwnMessage && "justify-end"
      }`}
    >
      <div className={`relative h-8 w-8 ${isOwnMessage && "order-last ml-2"}`}>
        <Avatar username={message.get("user")} />
      </div>
      <div
        className={`flex space-x-4 p-3 rounded-lg ${
          isOwnMessage
            ? "rounded-br-none bg-indigo-700"
            : "rounded-bl-none bg-blue-500"
        } ${message.get("imageUrl") && "flex-col"}`}
      >
        <p>{message.get("message")}</p>
        {message.get("imageUrl") && (
          <Image src={message.get("imageUrl")} width={400} height={400} className="rounded-lg cursor-pointer" draggable={false} />
        )}
      </div>
      {/* TimeStamp */}
      <TimeAgo
        datetime={message.createdAt}
        className={`text-[10px] italic text-white ${
          isOwnMessage && "order-first pr-1"
        }`}
      />
      <p
        className={`absolute -bottom-5 text-xs ${
          isOwnMessage ? "text-white" : "text-blue-500"
        }`}
      >
        {message.get("user")}
      </p>
    </div>
  );
};

export default Message;
