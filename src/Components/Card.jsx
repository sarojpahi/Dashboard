import React from "react";

export const Card = ({ title, amount }) => {
  return (
    <div className="lg:col-span-2 col-span-1 bg-white justify-between w-full border p-2 lg:p-4 rounded-lg">
      <div className="flex flex-col w-full pb-4">
        <p className="text-2xl font-bold">{amount}</p>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
};
