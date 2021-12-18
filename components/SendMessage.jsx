import { useRef, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { PhotographIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useAlert } from "react-alert";

const SendMessage = ({ endofMessagesRef }) => {
  const alert = useAlert();
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState("");
  const filePickerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const uploadImage = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xuqz75gc");
    axios
      .post("https://api.cloudinary.com/v1_1/dsc7vpalz/image/upload", formData)
      .then((res) => {
        console.log(res.data);
        setImageUrl(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    uploadImage();
    if (!message.trim()) return;
    const Messages = Moralis.Object.extend("Messages");
    const messages = new Messages();
    messages
      .save({
        message: message,
        user: user.getUsername(),
        ethAddress: user.get("ethAddress"),
        // If Image is uploaded then set imageUrl
        imageUrl: imageUrl ? imageUrl : "",
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
    setFile(null);
    setImageUrl("");
    alert.success("Message sent successfully!");
    endofMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <form
      className="fixed flex w-11/12 max-w-2xl p-5 bg-black border-4 border-indigo-600 rounded-full shadow-2xl bottom-10 opacity-80"
      onSubmit={(e) => {
        // Send Message after image is uploaded to using function uploadImage
        e.preventDefault();
        uploadImage().then(() => {
          sendMessage(e);
        });
      }}
    >
      <input
        type="text"
        placeholder={`Enter a message ${user.getUsername()}...`}
        className="flex-grow pr-5 text-white placeholder-blue-500 bg-transparent outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={sendMessage}
      />
      <input
        type="file"
        className="hidden"
        ref={filePickerRef}
        accept="image/*"
        multiple={false}
        onChange={(e) => {
          setFile(e.target.files[0]);
          alert.info("Image Selected");
        }}
      />
      <PhotographIcon
        className="h-6 w-6 text-indigo-500 mr-2 cursor-pointer"
        onClick={() => {
          filePickerRef.current.click();
        }}
      />
      <button className="font-bold text-indigo-500">Send</button>
    </form>
  );
};

export default SendMessage;
