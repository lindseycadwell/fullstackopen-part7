import { useSelector } from "react-redux";

import { selectCurrentUser } from "../slices/currentUserSlice";

const useAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = currentUser === null ? false : true;

  return { currentUser, isAuthenticated };
};

export default useAuth;
