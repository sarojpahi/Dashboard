import React, { createContext, useEffect, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/Config/firebase.config";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

export const AuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const router = useRouter();
  const wallet = useWallet();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem("isAuth");
    if (authState) setIsAuth(true);
  }, [isAuth]);

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
  }, [isAuth]);

  const logout = () => {
    alert("Logout");
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    signOut(auth);
    wallet
      .disconnect()
      .then(() => router.push("/Login"))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log("wallet", wallet.connected);
    console.log("authState", isAuth);

    if (!wallet.connected && !isAuth) router.push("/Login");
  }, [wallet.connected]);

  const value = {
    logout,
    setUpRecapta,
    setUserDetails,
    userDetails,
    isAuth,
    wallet,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
