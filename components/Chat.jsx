import { useRef } from "react";
import { ByMoralis, useMoralis, useMoralisQuery } from "react-moralis";
import Message from "./Message";
import SendMessage from "./SendMessage";
const Chat = () => {
  const { user } = useMoralis();
  const endofMessagesRef = useRef(null);
  const { data, loading, error } = useMoralisQuery(
    "Messages",
    (query) =>
      query
        .ascending("createdAt")
        .greaterThan("createdAt", new Date(Date.now() - 1000 * 60 * 60)),
    [],
    {
      live: true,
    }
  );
  console.log(data);
  return (
    <div className="pb-[240px]">
      <div className="flex justify-center my-5">
        <a href="http://moralis.io" target="_blank">
          <ByMoralis variant="dark" />
        </a>
      </div>
      <div className="p-4 space-y-10">
        {data?.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
      <div className="flex justify-center">
        <SendMessage endofMessagesRef={endofMessagesRef} />
      </div>
      <div className="mt-5 text-center text-amber-500" ref={endofMessagesRef}>
        <h1>You are up to date {user.getUsername()}! 🥳</h1>
      </div>
    </div>
  );
};

export default Chat;
