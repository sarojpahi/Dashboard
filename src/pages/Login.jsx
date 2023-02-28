import { AuthVerify } from "@/Components/AuthVerify";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import React from "react";

const Login = () => {
  const wallet = useWallet();
  console.log(wallet);

  if (wallet.connected) return <AuthVerify />;
  return (
    <div className="flex justify-center flex-col gap-8 items-center min-h-screen">
      <div>
        <p className="text-4xl text-gray-600">Login To Access</p>
      </div>
      <WalletMultiButton />
    </div>
  );
};

export default Login;
