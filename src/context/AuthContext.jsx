import React, { createContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/Config/firebase.config";

export const AuthContext = createContext();
export const UserAuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();

  const setUpRecapta = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUserDetails(currentuser);
    });
    return () => unsubscribe();
  }, [userDetails]);
  const logout = () => {
    signOut(auth);
    navigate("/login");
  };
  const value = {
    logout,
    setUpRecapta,
    setUserDetails,
    userDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
