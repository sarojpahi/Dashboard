import { Card } from "@/Components/Card";
import { Headers } from "@/Components/Headers";
import Link from "next/link";
import React from "react";

const data = [
  {
    id: 1,
    topic: "RandomRandomRandomRandomRandomRandomRandomRandom",
    status: "Completed",
    totalBet: "500",
  },
  {
    id: 2,
    topic: "Random",
    topic: "Random",
    status: "Ongoing",
    totalBet: "500",
  },
  {
    id: 3,
    topic: "Random",
    status: "Ongoing",
    totalBet: "500",
  },
];
const index = () => {
  return (
    <div className="ml-16">
      <Headers />
      <div className="grid lg:grid-cols-4 gap-4 lg:p-4 p-2">
        <Card title={"Total Topics"} amount={data?.length} />
        <Card
          title={"Total Active Topics"}
          amount={data.filter((el) => el.status === "Ongoing").length}
        />
        <Link href={"CreateTopic"}>
          <div className="lg:col-span-1  bg-green-600 transition-all duration-300 hover:tracking-wider font-semibold justify-between w-[50%] cursor-pointer border p-2 rounded-lg">
            <div className="flex flex-col justify-center items-center w-full">
              <p className=" text-gray-50">Create New Topic</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="lg:p-4 p-2">
        <div className="w-full m-auto lg:p-4 p-2 border rounded-lg bg-white">
          <div className="my-3 p-2 grid md:grid-cols-cus sm:grid-cols-3 grid-cols-2 items-center gap-5 justify-between cursor-default">
            <span className="whitespace-nowrap">Topic ID</span>
            <span>Topic</span>
            <span className="text-center hidden md:grid">Status</span>
            <span className="text-center hidden md:grid">Total Bets</span>
          </div>
          <ul>
            {data.map((el) => (
              <Link key={el.id} href={`Topics/${el.id}`}>
                <li className="bg-gray-50 hover:bg-gray-100 rounded-lg p-2 my-3 grid  md:grid-cols-cus sm:grid-cols-3 grid-cols-2 gap-5 items-center justify-between cursor-pointer">
                  <p>{el.id}</p>
                  <p className="truncate">{el.topic}</p>
                  <p className="text-gray-50 font-semibold text-center hidden md:grid">
                    <span
                      className={
                        el.status === "Completed"
                          ? "bg-blue-400 p-2 rounded-lg"
                          : "bg-green-400 p-2 rounded-lg"
                      }
                    >
                      {el.status}
                    </span>
                  </p>
                  <p className="text-center hidden md:grid">
                    {el.totalBet} sol
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
