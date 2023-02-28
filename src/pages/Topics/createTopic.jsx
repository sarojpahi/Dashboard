import { Headers } from "@/Components/Headers";
import React, { useEffect, useRef, useState } from "react";

const CreateTopic = () => {
  const [topic, setTopic] = useState("");
  const formref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("topic created successfully");
    formref.current.reset();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="ml-16">
          <Headers />
          <div className=" justify-center lg:mt-56 mt-10  flex">
            <div className="bg-white lg:p-8 p-4 rounded-lg shadow-lg lg:w-[50%] w-full">
              <div>
                <p className="font-bold text-2xl pb-4">Create Topic </p>
              </div>
              <form
                className="flex flex-col gap-4"
                ref={formref}
                onSubmit={handleSubmit}
              >
                <input
                  className="bg-gray-200 shadow-inner rounded-l p-2 flex-1"
                  type="text"
                  placeholder="Enter Topic Name"
                  onChange={(e) => setTopic(e.target.value)}
                />
                <input
                  type="submit"
                  value={"Create Topic"}
                  className="bg-green-500 w-max md:animate-bounce hover:bg-green-700 transition-all font-semibold duration-200 text-white px-4 py-2 mt-2 rounded-lg cursor-pointer "
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTopic;
