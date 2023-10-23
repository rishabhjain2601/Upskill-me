import React, { useState, useEffect } from 'react'
import Button from "../utils/Button";

const QuesType2 = ({onSubmit ,questions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const [option, setOption] = useState("")
  const [ans2, setAns2] = useState("")
  function handleChange(e) {
    e.preventDefault();
    setAns2(e.target.value);
  }
  const onOptionChange = (e) => {
    const newOption = e.target.value;
    setOption(`${newOption}`);
    const newOptionId = e.target.id
    // Use await to wait for the state update to complete
    getSelectedLabel(newOptionId);
  };

  const getSelectedLabel = async (selectedOption) => {
    const labelElement = document.querySelector(`label[for="${selectedOption}"]`);
    if (labelElement && selectedOption !== "option5") {
      const labelText = labelElement.textContent;
      setAns2(labelText);
    }
    // console.log(ans2)
  };

  useEffect(() => {
    // This effect will run whenever ans2 or option changes.
    getSelectedLabel();
  }, [option]);

  const clickNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      onSubmit(`${ans2}`)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOption(null)
      document.getElementById('ansArea2').value = ''
      setAns2(null)
    }
  }

  const clickPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  return (
    <div className='rounded-3xl mx-auto my-auto text-xl bg-gray-800 opacity-80 w-[90%] lg:w-[60%] h-[355px] pt-5 pl-4'>
      <div className='ml-[2%] mb-6'>
        Q. {questions[currentQuestionIndex]?.question}
      </div>
      <form action=""  className="mx-auto">
        <div className="w-[90%] ml-[3.5%] my-4 rounded-2xl ">
          <input
            type="radio"
            id="option1"
            className="mb-3 mr-2"
            value={"ans1"}
            checked={option === "ans1"}
            name="ans"
            onChange={onOptionChange}
          />
          <label htmlFor="option1">
              {questions[currentQuestionIndex]?.options[0]}
          </label>
          <br />
          <input
            type="radio"
            id="option2"
            className="mb-3 mr-2"
            value={"ans2"}
            checked={option === "ans2"}
            name="ans"
            onChange={onOptionChange}
          />
          <label htmlFor="option2">
              {questions[currentQuestionIndex]?.options[1]}
          </label>
          <br />
          <input
            type="radio"
            id="option3"
            className="mb-3 mr-2"
            value={"ans3"}
            checked={option === "ans3"}
            name="ans"
            onChange={onOptionChange}
          />
          <label htmlFor="option3">
              {questions[currentQuestionIndex]?.options[2]}
          </label>
          <br />
          <input
            type="radio"
            id="option4"
            className="mb-4 mr-2"
            value={"ans4"}
            checked={option === "ans4"}
            name="ans"
            onChange={onOptionChange}
          />
          <label htmlFor="option4">
              {questions[currentQuestionIndex]?.options[3]}
          </label>
          <br />
          <input
            type="radio"
            id="option5"
            className="mr-2"
            value={"ans5"}
            checked={option === "ans5"}
            name="ans"
            onChange={onOptionChange}
          />
          <label htmlFor="option5">
            Other :{" "}
            <input
              type="text"
              id='ansArea2'
              className="text-black outline-white px-2 rounded-full w-[70%]"
              disabled={option !== "ans5"}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-between mt-5 mr-[2%]">
          <Button onClick={clickPrev}>Previous</Button>
          <Button type="submit" onClick={clickNext}>Next</Button>
        </div>
      </form>
    </div>
  );
};

export default QuesType2;