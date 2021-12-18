import { useState } from "react";
import { useMoralis } from "react-moralis";
import Avatar from "./Avatar";
const Header = () => {
  const { user, logout, setUserData } = useMoralis();
  const moralisUserName = user.get("username");
  const [username, setUsername] = useState(moralisUserName);
  const [showUserNameInput, setShowUserNameInput] = useState(false);
  return (
    <div className="p-5 bg-black border-indigo-600 h-[45%] sticky top-0 z-50 shadow-md shadow-indigo-500">
      <div className="flex justify-end">
        {showUserNameInput ? (
          <div className="flex flex-row items-center space-x-2">
            <input
              type="text"
              placeholder="Enter New Username"
              className="p-2 rounded-md focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                setUserData({ username });
                setShowUserNameInput(false);
              }}
              className="p-2 text-white bg-indigo-400 rounded-md"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-2">
            <h1
              className="text-indigo-500 cursor-pointer"
              onClick={() => {
                setShowUserNameInput(true);
              }}
            >
              Change your Username
            </h1>
            <button
              onClick={logout}
              className="p-2 text-white bg-indigo-400 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-center space-y-2 sm:items-center">
        <div className="relative w-48 h-48 border-8 border-indigo-600 rounded-full cursor-pointer">
          <Avatar username={moralisUserName} />
        </div>
        <h1 className="text-xl font-bold text-indigo-700">
          Welcome to the World of Web 3.0
        </h1>
        <h1 className="text-lg font-bold text-indigo-700 truncate">{moralisUserName}</h1>
      </div>
    </div>
  );
};

export default Header;
