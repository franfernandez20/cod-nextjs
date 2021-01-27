// import '../styles/global.css'

import "../assets/scss/style.scss";

import LayoutDefault from "../layouts/LayoutDefault";

import { StateProvider } from "../hooks/store";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </StateProvider>
  );
}
