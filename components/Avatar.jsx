import Image from "next/image";
import { useMoralis } from "react-moralis";
const Avatar = ({ username }) => {
  const { user } = useMoralis();
  return (
    <Image
      className="bg-black border-8 border-indigo-600 rounded-full hover:opacity-75"
      src={`https://avatars.dicebear.com/api/pixel-art/${
        username || user.get("username")
      }.svg`}
      layout="fill"
    />
  );
};

export default Avatar;
