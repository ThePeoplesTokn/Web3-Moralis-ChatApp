import Head from "next/head";
import { useMoralis } from "react-moralis";
import Header from "../components/Header";
import Login from "../components/Login";
import Chat from '../components/Chat';

export default function Home() {
  const { isAuthenticated, isInitializing, user } = useMoralis();
  if (isInitializing)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="flex items-center justify-center p-5 space-x-2 bg-white rounded-full">
          <div className="w-4 h-4 p-2 bg-blue-600 rounded-full animate-bounce blue-circle"></div>
          <div className="w-4 h-4 p-2 bg-green-600 rounded-full animate-bounce green-circle"></div>
          <div className="w-4 h-4 p-2 bg-red-600 rounded-full animate-bounce red-circle"></div>
        </div>
      </div>
    );
  if (!isAuthenticated) return <Login />;
  return (
    <div className="h-screen overflow-y-scroll bg-gradient-to-b from-purple-600 to-violet-800">
      <Head>
        <title>Experience the Metaverse</title>
      </Head>
      <Header user={user} />
      {/* Chat With Moralis*/}
      <Chat />
    </div>
  );
}
