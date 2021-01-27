// import '../styles/global.css'

import '../assets/scss/style.scss'

import LayoutDefault from '../layouts/LayoutDefault'

export default function App({ Component, pageProps }) {
    return (
      <LayoutDefault >
        <Component {...pageProps} />
      </LayoutDefault>
    )
  }