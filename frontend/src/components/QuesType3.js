import React from "react";
import Button from "../utils/Button";

const QuesType3 = () => {
  return (
    <div className="rounded-3xl mx-auto p-10 my-auto text-xl bg-[#111C25] opacity-80 w-[90%] lg:w-[60%]">
      <div>Q. What do you want to become ?</div>
      <form action="" className="mx-auto">
        <input
          type="text"
          name=""
          className="text-black outline-white px-2 w-full h-10 mt-4 rounded-xl "
        />
        <div className="flex justify-between mt-5">
          <Button>Previous</Button>
          <Button>Next</Button>
        </div>
      </form>
    </div>
  );
};

export default QuesType3;
