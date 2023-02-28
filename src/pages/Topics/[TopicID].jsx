import { Headers } from "@/Components/Headers";
import { useRouter } from "next/router";
import React from "react";

const TopicID = () => {
  const router = useRouter();
  const { TopicID } = router.query;

  return (
    <div className="ml-16">
      <Headers />
      <div className="lg:p-4 p-2">TopicId : {TopicID}</div>
    </div>
  );
};

export default TopicID;
