function UserIcon(props) {
    return (
      <svg
        height={20}
        viewBox="0 2 19 21"
        width={20}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M10.5 2.5a3 3 0 013 3v1a3 3 0 11-6 0v-1a3 3 0 013-3zm7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 001 1h12a1 1 0 001-1z"
          fill={props.fill}
          stroke={props.stroke}
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  
  export default UserIcon