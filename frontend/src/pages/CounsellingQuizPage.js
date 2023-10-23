import React from "react";
import QuesType1 from "../components/QuesType1";
import QuesType2 from "../components/QuesType2";
import QuesType3 from "../components/QuesType3";

const CounsellingQuizPage = () => {
  return (
    <div>
      <div className="title">Career Quiz</div>
      <div className="mx-auto w-fit text-2xl mt-10">Question 4/10</div>
      <div className="w-[50%] mx-auto mt-4 bg-gray-950  rounded-full h-4 dark:bg-gray-700">
        <div className="bg-yellow-400 h-4 rounded-full w-[40%]" />
      </div>
      <div className="mt-8">
        <QuesType1 />
      </div>
      <div className="mx-auto w-fit text-xl p-10">
        Note : Try to fill it with detailed explanation for better results.
      </div>
    </div>
  );
};

export default CounsellingQuizPage;
