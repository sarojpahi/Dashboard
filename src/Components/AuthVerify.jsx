import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export const AuthVerify = () => {
  const router = useRouter();
  const { setUpRecapta } = useContext(AuthContext);
  const [otp, setOtp] = useState();
  const [confirmObj, setConfrimObj] = useState();

  const submitNumber = async (number) => {
    try {
      const res = await setUpRecapta(number);
      setConfrimObj(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    submitNumber("+918249816465");
  }, []);

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await confirmObj.confirm(otp);
      if (res.user.accessToken) {
        alert("Login successfully");
        localStorage.setItem("isAuth", true);
        router.push("/");
      } else alert("Invalid Otp");
    } catch (error) {
      console.log(error);
      alert("Invalid Otp");
    }
  };
  return (
    <div className=" justify-center lg:mt-56 mt-10  flex">
      <div id="recaptcha-container"></div>
      <div className="bg-white lg:p-8 p-4 rounded-lg shadow-lg lg:w-[50%] w-full">
        <div>
          <p className="font-bold text-2xl pb-4">Verify OTP </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={verifyOtp}>
          <input
            className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
            type="text"
            placeholder="Enter Topic Name"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="submit"
            value={"Verify"}
            className="bg-green-500 w-max md:animate-bounce hover:bg-green-700 transition-all font-semibold duration-200 text-white px-4 py-2 mt-2 rounded-lg cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
};
