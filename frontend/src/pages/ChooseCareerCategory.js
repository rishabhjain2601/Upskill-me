import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const ChooseCareerCategory = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    const userData = location.state.userData?? {"personality":["a"], "answers": [{"what are your skills":"physics"},{"do you like technology?": "yes"}, {"what skill do you already know": "verilog"}]}

    const ApiResponse = location.state.backendOutput?? {
        "output": {
          "career":
            {
              "name": "Engineering",
              "reason": "The student has skills in physics and likes technology, which are both important in the field of engineering. Engineering offers a wide range of opportunities and specializations for the student to explore.",
              "categories": [
                [
                  "Mechanical Engineering",
                  "Mechanical engineering involves the design, development, and maintenance of mechanical systems and machines."
                ],
                [
                  "Electrical Engineering",
                  "Electrical engineering focuses on the study and application of electricity, electronics, and electromagnetism."
                ],
                [
                  "Computer Engineering",
                  "Computer engineering combines electrical engineering and computer science to design and develop computer systems and hardware."
                ]
              ]
            }
        }
      }

      const createRoadmap = async(career)=>{
        try{
            console.log("calling api now")
            setIsLoading(true)
          axios.post('https://upskillme.onrender.com/api/generateRoadmap', {userData: userData, career: career})
          .then((response)=>{
            // const obj = JSON.parse(response.data.output)
            const obj = response.data.output
            console.log("navigating to roadmap")
            navigate('/roadmap/result', {state: {obj}})
            console.log(obj)
          })
        } catch(error){
          console.log(error.response)
        }
      }

  return (
    <div className='ml-10'>
        <h1>Your recommended career is <span className='text-yellow-500'>{ApiResponse.output.career.name}</span></h1>
        <h2 className='text-2xl text-yellow-500 pb-2'>Why we recommended this?</h2><p className='text-xl w-[70%]'> {ApiResponse.output.career.reason}</p><br />
        <h2 className='text-xl text-yellow-500'>Following are the specific domains in your recommended career :</h2>
        <h2> (Choose a domain to view its roadmap)</h2>
        <div className='flex-col flex gap-4 justify-center my-5'>
            <div className='flex gap-3 my-2'>
                <button className='bg-yellow-500 px-4 py-3 text-black font-semibold rounded-sm' onClick={()=>{createRoadmap(ApiResponse.output.career.categories[0][0])}}>{ApiResponse.output.career.categories[0][0]}</button>
                <p className='w-[50%] px-2'>{ApiResponse.output.career.categories[0][1]}</p>
            </div>
            <div className='flex gap-3 my-2'>
                <button className='bg-yellow-500 px-4 py-3 text-black font-semibold rounded-sm' onClick={()=>{createRoadmap(ApiResponse.output.career.categories[1][0])}}>{ApiResponse.output.career.categories[1][0]}</button>
                <p className='w-[50%] px-2'>{ApiResponse.output.career.categories[1][1]}</p>
            </div>
            <div className='flex gap-3 my-2'>
                <button className='bg-yellow-500 px-4 py-3 text-black font-semibold rounded-sm' onClick={()=>{createRoadmap(ApiResponse.output.career.categories[2][0])}}>{ApiResponse.output.career.categories[2][0]}</button>
                <p className='w-[50%] px-2' >{ApiResponse.output.career.categories[2][1]}</p>
            </div>
        </div>

        {isLoading? <div className='loader'></div> : <div></div>}
    </div>
  )
}

export default ChooseCareerCategory