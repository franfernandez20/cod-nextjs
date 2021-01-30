export default function CheckCroos (props) {
  return (
    <svg
      height={35}
      viewBox="0 0 21 21"
      width={110}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={props.color || "#2a2e3b"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 15.5l10-10M15.5 15.5l-10-10z" />
      </g>
    </svg>
  );
}
