import { useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { PhotographIcon, EmojiHappyIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useAlert } from "react-alert";
import dynamic from "next/dynamic";
import Modal from "react-modal";
import ReactGiphySearchbox from "react-giphy-searchbox";

const SendMessage = ({ endofMessagesRef }) => {
  const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
  const alert = useAlert();
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState("");
  const filePickerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    // Add emoji to message
    setMessage(message + emojiObject.emoji);
  };
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
  Modal.setAppElement("#__next");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
      <EmojiHappyIcon
        className="h-6 w-6 text-indigo-500 mr-2 cursor-pointer"
        onClick={() => {
          toggleModal();
        }}
      />
      <PhotographIcon
        className="h-6 w-6 text-indigo-500 mr-2 cursor-pointer"
        onClick={() => {
          filePickerRef.current.click();
        }}
      />
      <ReactGiphySearchbox
        apiKey="syYsr0T8Bh6BLy75qftElq4TbqM3SFBP"
        onSelect={(gif) => {
          console.log(gif);
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Pick an emoji"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "50",
          },
          content: {
            zIndex: "100",
            top: "50%",
            left: "50%",
            // Make modal to the right of the cursor
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Picker onEmojiClick={onEmojiClick} className="z-50" />
      </Modal>
      <button className="font-bold text-indigo-500">Send</button>
    </form>
  );
};

export default SendMessage;
