import React from "react";

import { BsFillXDiamondFill } from "react-icons/bs";
import { RiLogoutBoxLine, RiShieldUserFill } from "react-icons/ri";
import { MdAttachMoney, MdTopic } from "react-icons/md";
import { NavIcons } from "./NavIcons";

export const Sidebar = () => {
  return (
    <div className="flex">
      <div className="fixed w-16 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center gap-4">
          <NavIcons link={"/"}>
            <BsFillXDiamondFill size={18} />
          </NavIcons>
          <NavIcons link={"/Topics"}>
            <MdTopic size={18} />
          </NavIcons>
          <NavIcons link={"/Bets"}>
            <MdAttachMoney size={18} />
          </NavIcons>
          <NavIcons link={"/Users"}>
            <RiShieldUserFill size={18} />
          </NavIcons>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <div className=" text-black hover:text-red-400 transition duration-200 p-3 rounded-lg inline-block">
            <RiLogoutBoxLine size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
