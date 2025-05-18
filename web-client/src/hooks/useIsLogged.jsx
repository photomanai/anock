import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { protectedUser } from "../store/slices/authSlice";

const useIsLogged = () => {
  const dispatch = useDispatch();
  const { token, isAuthResolved } = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    dispatch(protectedUser()).finally(() => setInitialized(true));
  }, []);

  if (!initialized || !isAuthResolved) return null;

  return !!token;
};

export default useIsLogged;
