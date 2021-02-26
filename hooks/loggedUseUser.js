import { useEffect } from "react";
import { onAuthStateChanged } from "../firebase/client";

import useUser from "./useUser";

export default function loggedUseUser() {
  const [user, logOut, updateUser] = useUser();

  useEffect(() => {
    onAuthStateChanged(updateUser);
  }, []);

  return [user];
}