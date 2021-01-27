import { set } from "lodash";
import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "../firebase/client";

import { store } from "./store";

export default function useUser() {
  // const [user, setUser] = useState();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;


  const { user } = state
  
  const setUser = (user) => {
    dispatch({ type: "setUser", value: user });
  } 

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const logOut = () => setUser(undefined);
  // const updateUser = (newuser) => {
  //  if (newuser && newuser.uid) return setUser(newuser)
  // }
  const updateUser = (user) => {
    dispatch({ type: "setUser", value: user });
  };
  return [user, logOut, updateUser];
}
