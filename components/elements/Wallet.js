export default function Wallet({ total }) {
  return (
    // <div className="wallet">
      <div className="header-nav-wallet">
        <div className="wallet-content">
          <svg
            width="100%"
            height="100%"
            version="1.1"
            viewBox="0 0 20 20"
            x="0px"
            y="0px"
            class="ScIconSVG-sc-1bgeryd-1 cMQeyU"
          >
            <path
              fill="gray"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 12l7-10 7 10-7 6-7-6zm2.678-.338L10 5.487l4.322 6.173-.85.728L10 11l-3.473 1.39-.849-.729z"
            ></path>
          </svg>
          <span>{total}€</span>
        </div>
      </div>
    // </div>
  );
}