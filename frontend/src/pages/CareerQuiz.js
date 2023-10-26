import React, { useState, useContext, createContext } from 'react'
import QuesType1 from '../components/QuesType1'
import QuesType2 from '../components/QuesType2'
import QuesType3 from '../components/QuesType3'
import questions from '../data/questions.json'
import { useNavigate } from 'react-router-dom'
import userData from '../data/userData.json';
import axios from 'axios'

const CareerQuiz = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const userDataFormat = {
        "personality": ['r', 'e'],
        "answers": [
            { "question": "answer" }
        ]
    }

    const callApi = async(userData)=>{
        try{
            console.log("calling api now")
            setIsLoading(true)
          axios.post('http://localhost:4567/api/recommendUpskillCareers', {userData: userData})
          .then((response)=>{
            // const obj = JSON.parse(response.data.output)
            const obj = response.data
            console.log("navigating to choose")
            console.log(obj)
            navigate('/choose', {state: {backendOutput: obj, userData: userData}})
          })
        } catch(error){
          console.log(error.response)
        }
    }

    // Replace this condition with the actual condition you want to check
    const [ansArray, setAnsArray] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const quesType = questions[currentQuestionIndex]?.isMCQ;
    const quest = `${questions[currentQuestionIndex]?.question}`

    const updateValue = (input) => {
        // setAnsArray([...ansArray, `${ans}`])
        ansArray.push({ question:quest, answer:input })
        console.log(ansArray)
    }
    const passValue = async (input) => {
        // setAnsArray([...ansArray, `${ans}`])
        ansArray.push({ question:quest, answer:input })
        console.log("in pass value" + ansArray)
        userData.push(ansArray)
        console.log(userData)
        const userDataObj = {personality: userData[0], answers: userData[1]}
        await callApi(userDataObj)
        // navigate('/choose', {state: {userDataObj}})
    }
    const quizQues = () => {
        if (!quesType) {
            if (currentQuestionIndex < 9) {
                return (
                    <>
                        <QuesType1
                            onSubmit={updateValue}
                            questions={questions}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                        />{
                            isLoading?
                            <div>
                                <div className='loader'></div>
                            </div>
                            :
                        <div className="h-8 bg-yellow-400 mx-auto p-3 w-24 text-black text-center flex justify-center items-center" onClick={()=>{passValue('')}}><p className=''>submit</p></div>
                    }</>
                );
            }
            else {
                return (
                    <>
                    {/* <div className="bg-yello-400 h-8 w-[30px]">submit</div> */}
                        <QuesType1
                            onSubmit={passValue}
                            questions={questions}
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                        />
                        {/* <div className="h-8 bg-yello-400 w-[30px]">submit</div> */}
                    </>

                );
            }
        }
        else {
            return (
                <QuesType2
                    onSubmit={updateValue}
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
            )
        }
    };

    const wPercent = `${((currentQuestionIndex + 1) * 100) / (questions.length)}%`

    return (
        <div>
            <div className='text-5xl mx-auto mt-24 w-fit'>Career Quiz</div>
            <div className='mx-auto w-fit text-2xl mt-10'>Question {currentQuestionIndex + 1}/10</div>
            <div className="w-[60%] mx-auto mt-4 bg-gray-950 rounded-full h-2.5 dark:bg-gray-700">
                <div className={`bg-yellow-400 h-2.5 rounded-full w-[${wPercent}]`} ></div>
            </div>
            <div className='mt-8'>
                {quizQues()}
            </div>
            <div className='mx-auto w-fit text-xl mt-6'>Note : Try to fill it with detailed explanation for better results.</div>
        </div>
    )
}

export default CareerQuiz
