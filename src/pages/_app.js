import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { Sidebar } from "@/Components/Sidebar";
import { UserAuthContextProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <UserAuthContextProvider>
      {mounted && (
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      )}
    </UserAuthContextProvider>
  );
}
