import React, { useState, createContext, useContext } from 'react'
import Button from "../utils/Button";
import AnsContexts from './AnsContexts';


const QuesType1 = ({ onSubmit, questions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const [ans1, setAns1] = useState();

  function handleChange(e) {
    e.preventDefault();
    setAns1(e.target.value);
  }

  const clickNext = () => {
    if (currentQuestionIndex < questions.length) {//removed && ans1
      onSubmit(`${ans1}`)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      document.getElementById('ansArea1').value = ''
      setAns1('')
    }
    // else {
    //   if (currentQuestionIndex = questions.length - 1) {
    //     onSubmit(`${ans1}`)
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //     document.getElementById('ansArea1').value = ''
    //     setAns1('')
    //   }
    // }
  }

  const clickPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  return (
    <div className="rounded-3xl mx-auto p-10 text-xl bg-[#111C25] opacity-80 w-[90%] lg:w-[60%]">
      <div>
        Q. {questions[currentQuestionIndex]?.question}
      </div>
      <form action="" className="mx-auto">
        <textarea
          name=""
          id="ansArea1"
          className="text-black outline-white pl-2 w-full h-[260px] my-4 rounded-2xl resize-none overflow-y-scroll "
          onChange={handleChange}
        />
        <div className="flex justify-between mt-5">
          <Button onClick={clickPrev}>Previous</Button>
          {/* <div className="bg-yellow-400">submit</div> */}
          <Button type="submit" onClick={clickNext}>Next</Button>
        </div>
      </form>
    </div>
  );
};

export default QuesType1;
