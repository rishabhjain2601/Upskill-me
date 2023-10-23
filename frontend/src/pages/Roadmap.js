import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import Card from "../utils/Card";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Roadmap = () => {
  const [step, setStep] = useState(0);

  const [backendDataGpt1, setBackendDataGpt1] = useState()
  const [backendDataUdemyCourses, setBackendDataUdemyCourses] = useState([])
  const [url, setUrl] = useState()
  const [finalResponse, setFinalResponse] = useState()
  const [udemyArray, setUdemyArray] = useState([])

  // const location = useLocation()

  // const career = location?.state.career;
  // const career = "engineering"

  // const getRoadmap = async(career)=>{
  //   try{
  //     // console.log(obj.subcategories[0])
  //     axios.post('http://localhost:4567/api/gpt2', {inp: career})
  //     .then(async(response)=>{
  //       setFinalResponse(response.data.output)
  //      // const obj = JSON.parse(finalResponse)
  //       console.log(finalResponse)
  //       //console.log(obj)
  //       const arr = JSON.parse(finalResponse)
  //       for (let index = 0; index < arr.length; index++) {
  //         const element = arr[index];
  //         await getUdemyCourses(element, index)//.then((ans)=>{console.log(ans)})

  //       }
  //     })
  //   } catch(error){
  //     //console.log(error.response.data)
  //     console.log(error.response)
  //   }
  // }

  // const getUdemyCourses= async(item, index)=>{
  //   try{
  //     console.log(item)

  //     axios.post('http://localhost:4567/api/udemy', {inp: item})
  //     .then((response)=>{
  //       // setBackendDataUdemyCourses(backendDataUdemyCourses=>[...backendDataUdemyCourses, response.title])
  //       // // console.log(JSON.stringify(backendDataUdemyCourses))
  //       // console.log(backendDataUdemyCourses)
  //       const temp = [...udemyArray]
  //       temp[index]=response.data.title
  //       setUdemyArray(temp)
  //       console.log(udemyArray)
  //       // console.log(response.data.title, item)
  //     })
  //   } catch(error){
  //     //console.log(error.response.data)
  //     console.log(error.response)
  //   }
  // }
  // useEffect(()=>{
  //   getRoadmap(career)
  // },[])

  const courses = [
    {
      title: "The Complete 2023 Web Development Bootcamp",
      image: "https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
      link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    },
    {
      title: "The Web Developer Bootcamp 2023",
      image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
      link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
    },
    {
      title: "The Web Development Bootcamp",
      image: "https://img-b.udemycdn.com/course/240x135/4505104_8592_8.jpg",
      link: "https://www.udemy.com/course/fullstack-web-development-course-projects-base/",
    },
  ];

  const skills = [
    "HTML, CSS",
    "Javascript",
    "React JS",
    "Node JS",
    "Express JS",
    "Mongo DB",
    "NEXT JS",
  ];

  const roadmapData = [
    {
      skillName: "HTML",
      courseTitle: "Ultimate html bootcamp",
      courseImage: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
      courseLink: "https://www.udemy.com/course/fullstack-web-development-course-projects-base/"
    },
    {
      skillName: "Javascript",
      courseTitle: "Best javascript bootcamp",
      courseImage: "https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
      courseLink: "https://www.udemy.com/course/fullstack-web-development-course-projects-base/"
    },
    {
      skillName: "React",
      courseTitle: "Top react bootcamp",
      courseImage: "https://img-b.udemycdn.com/course/240x135/4505104_8592_8.jpg",
      courseLink: "https://www.udemy.com/course/fullstack-web-development-course-projects-base/"
    },
    {
      skillName: "Node",
      courseTitle: "Ultimate html bootcamp",
      courseImage: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
      courseLink: "https://www.udemy.com/course/fullstack-web-development-course-projects-base/"
    }
  ]

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (step < roadmapData.length) {
      setStep((prev) => prev + 1);
    }
  };

  // apply "is-done" className on divs having classNames "cd-timeline-img" and "cd-timeline-content"
  // to mark that SKILL as completed...

  return (

    <div className="bg-[#111C25] w-11/12 md:w-10/12 mx-auto my-10 py-14 px-8 md:px-16 rounded-3xl">
      {/* Button */}
      <div className="flex justify-between">
        <Button onClick={handlePrev}>Prev Step</Button>
        <Button onClick={handleNext}>Next Step</Button>
      </div>
      {/* Timeline */}
      {/* <div className="w-[10%] hidden xl:block h-[4px] bg-black opacity-80 m-auto" /> */}
      <section id="cd-timeline" className="cd-container font-bold">
        {roadmapData.map((ele, index) => {
          return (
            <div className="cd-timeline-block">
              <div
                className={`cd-timeline-img ${step > index ? "is-done" : ""
                  } cd-picture`}
              ></div>
              <div
                className={`cd-timeline-content ${step > index ? "is-done" : ""
                  }`}
              >
                <h2>{ele.skillName}</h2>
              </div>
            </div>
          );
        })}
      </section>
      <div className="w-[10%] hidden xl:block h-[4px] bg-black opacity-80 m-auto" />

      {/* Suggested courses */}
      <div className="my-10">
        <h2 className="text-3xl font-semibold">
          Recommended Courses for ReactJS-
        </h2>
        <div className="flex items-center gap-4 justify-center md:justify-evenly flex-wrap my-10">
          {roadmapData.map((ele, index) => {
            return <Card link={ele.courseLink} image={ele.courseImage} name={ele.courseTitle} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
