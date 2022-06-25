import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
const Login = () => {
  const { authenticate } = useMoralis();
  return (
    <div className="relative bg-black">
      <Head>
        <title>Login to Continue</title>
      </Head>
      <div className="absolute z-50 flex flex-col items-center justify-center w-full space-y-4 h-4/6">
//         <Image
//           src="https://links.papareact.com/3pi"
//           height={200}
//           width={200}
//           className="object-cover rounded-full"
//           loading="lazy"
//           draggable={false}
//         />
        <button
          className="p-3 font-bold text-white bg-yellow-500 rounded-lg animate-bounce"
          onClick={() => authenticate({provider : 'metamask'})}
        >
          Login to the Metaverse
        </button>
      </div>
      <div className="w-full h-screen">
        {/* Background Image */}
        <Image
          src="https://links.papareact.com/55n"
          objectFit="cover"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default Login;
