import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const APP_ID = "qi7eFCxPnxyCLG1aGGQFYNVZ3IBXpo3xhG1BO5VT";
const SERVER_URL = "https://q5ztb4oif8g0.usemoralis.com:2053/server";
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE
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
