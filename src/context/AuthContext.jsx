import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/Config/firebase.config";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useRouter } from "next/router";

export const AuthContext = createContext();
export const UserAuthContextProvider = ({ children }) => {
  const router = useRouter();

  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

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
  console.log(isAuth);
  const logout = () => {
    try {
      alert("Logout");
      signOut(auth);
      router.push("/Login");
    } catch (e) {
      console.log(e);
    }
  };
  const value = {
    logout,
    setUpRecapta,
    setUserDetails,
    userDetails,
  };
  return (
    <AuthContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>{children} </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AuthContext.Provider>
  );
};
