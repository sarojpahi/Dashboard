import { Card } from "@/Components/Card";
import { Headers } from "@/Components/Headers";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const baseUrl = process.env.BASE_URL;
console.log("baseUrl", baseUrl);
const index = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get(`${baseUrl}/topics`)
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchData();
  }, []);

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
            {data.map((el, i) => (
              <Link key={i} href={`Topics/${el.id}`}>
                <li className="bg-gray-50 hover:bg-gray-100 rounded-lg p-2 my-3 grid  md:grid-cols-cus sm:grid-cols-3 grid-cols-2 gap-5 items-center justify-between cursor-pointer">
                  <p className="truncate">{el["_id"]["$oid"]}</p>
                  <p className="truncate">{el.topic_name}</p>
                  <p className="text-gray-50 font-semibold text-center hidden md:grid">
                    <span
                      className={
                        el.topic_is_running
                          ? "bg-blue-400 p-2 rounded-lg"
                          : "bg-green-400 p-2 rounded-lg"
                      }
                    >
                      {el.topic_is_running ? "Completed" : "Ongoing"}
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
