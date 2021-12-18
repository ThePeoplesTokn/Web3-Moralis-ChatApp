import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE,
};
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </MoralisProvider>
  );
}

export default MyApp;
