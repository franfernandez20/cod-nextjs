export default function CheckOk (props) {
  return (
    <svg
      height={35}
      viewBox="0 0 21 21"
      width={100}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.5 11.5l3 3 8.028-8"
        fill="none"
        stroke={props.color || "#5658DD"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
