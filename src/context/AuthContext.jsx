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

  const [userDetails, setUserDetails] = useState();
  const [isAuth, setIsAuth] = useState(false);

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
      if (currentuser) setIsAuth(true);
      else setIsAuth(false);
    });
    return () => unsubscribe();
  }, [isAuth]);

  const logout = () => {
    alert("Logout");
    signOut(auth);
    wallet
      .disconnect()
      .then(() => router.push("/Login"))
      .catch((e) => console.log(e));
  };
  console.log(wallet.connected);
  useEffect(() => {
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
