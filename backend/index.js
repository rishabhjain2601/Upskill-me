const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios')
require('dotenv').config()

const app = express();
const PORT = 4567;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const {rArray, aArray, iArray, sArray, eArray, cArray} = require('./personalityArrays.js')


const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
  });
  
  const openai = new OpenAIApi(configuration);
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


app.post('/api/gpt', async(req,res)=>{
    
      const basePromptPrefix = `based on the given details about a student, identify the most suitable career for him in the specified format. 
      student details:`;
      const basePromptSuffix = `Return the Suitable career option and upto three subcategories of the profession which will be suitable for the student. Response format: {"career_option": "PROFESSION_NAME", "subcategories": [SUBCATEGORY_1, SUBCATEGORY_2, SUBCATEGORY_3]}`
      output = await generateGptOutput(req.body.inp, basePromptPrefix, basePromptSuffix);
      console.log(output)//this console log is not working
      res.json({output: output})
})

app.post('/api/gpt2', async(req,res)=>{
    
  const basePromptPrefix = `A student has decided to pursue a career, and needs the list of necessary skills to learn for that, step by step. you have to provide the list. Using the given details, find out what skills the student already has and do not include them in the list. The list should only contain skills that are essential for the particular career, and which can be learnt through online courses. Do not include more than 6 skills. for example:" to become a backend developer, the skills would be ["javascript", "nodejs", "expressjs", "mongodb"]"`;
  const basePromptSuffix = `Return 4 skills, in correct order in an array. Example response: ["javascript", "nodejs", "expressjs", "mongodb"] Do not return anything other than the array in response`
  const basePrompt = `Decided career: ${req.body.inp}, student details: ${req.body.studentData}`
  output = await generateGptOutput(basePrompt, basePromptPrefix, basePromptSuffix);
  console.log(output)//this console log is not working
  res.json({output: output})
})

app.post('/api/gptNew', async(req,res)=>{
    
  const basePromptPrefix = `A student has decided to pursue a career, and needs the list of necessary skills to learn for that, step by step. you have to provide the list. Using the given details, find out what skills the student already has and do not include them in the list. The list should only contain skills that are essential for the particular career, and which can be learnt through online courses. Do not include more than 4 skills. for example: to become a backend developer, the skills would be ["javascript", "nodejs", "expressjs", "mongodb"]`;
  const basePromptSuffix = `Return 4 skills, in correct order in an array. Example response: ["javascript", "nodejs", "expressjs", "mongodb"] Do not return anything other than the array in response`
  const basePrompt = `Decided career: ${req.body.inp}`
  output = await generateGptOutput(basePrompt, basePromptPrefix, basePromptSuffix);
  console.log(output)//this console log is not working
  res.json({output: output})
})


app.post('/api/udemy', async(req,res)=>{
  console.log(req.body.inp)
  axios.get(`https://www.udemy.com/api-2.0/courses/?page_size=2&search=${req.body.inp}`, {
      headers: {
          "Accept": "application/json, text/plain, */*",
          "Authorization": "Basic SDZuSklkWHdqQjJnYm40cjdQSDlUa3lKOFhEVGFZeWFEeGxDTDBUQjpSQ3gzYkswOEt1YmxuSDNLOXdxNjJma3BQMkQ2dlNld1Z2cXlrQ2RiZXlYMkdqZVRDWmVlZU80T0ZOUExwb3FjRjJ0d2U0MXVScmM5WHg4OVptcW9RbFVNSzdCQmxsc0JHQW1SVmdHSFVjOEJlMHdxdDFsWDUxbjFpak5IV0JEdA==",
          "Content-Type": "application/json"
        }
  })
  .then(response => {
      console.log(JSON.stringify(response.data.results[0].title))
      res.json({ title: response.data.results[0].title,
      url: response.data.results[0].url,
      image: response.data.results[0].image_240x135})
    }).catch(error => {
      console.error(error)
      res.status(500).json({ error: error.message })
    })  
})


const generateGptOutput = async (userInput, basePromptPrefix, basePromptSuffix) => {
      
    const baseCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${basePromptPrefix} ${userInput} ${basePromptSuffix}`}],
      temperature: 0.8
    });
    
    const basePromptOutput = baseCompletion.data.choices[0].message.content;
  
    return(basePromptOutput)
    //res.status(200).json({ output: basePromptOutput });
  };

  const generateGptOutputSinglePrompt = async (prompt) => {
      
    const baseCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
      temperature: 0.8
    });
    
    const basePromptOutput = baseCompletion.data.choices[0].message.content;
  
    return(basePromptOutput)
    //res.status(200).json({ output: basePromptOutput });
  };

  // const fun = async()=>{const response = await openai.listModels();console.log(response.data)}
  // fun()


// client sends user_data and user_personality to get recommended_career
// expected req: userData={"personality":['f','e'], "answers": [{"quesion":"answer"}, {"q":"a"}]}
  app.post('/api/recommendedCareer', async(req,res)=>{

    console.log(req.body.userData)

    const userData = req.body.userData;
    //remove empty fields
    const removeEmpty = (userData) => {
      Object.entries(userData).forEach(([key, val])  =>
        (val && typeof val === 'object') && removeEmpty(val) ||
        (val === null || val === "") && delete userData[key]
      );
      return userData;
    };

    const userPersonality = userData.personality; 
    delete userData["personality"];

    //making union of personality arrays
    const personalityOneArray = userPersonality[0]==='r'?rArray:userPersonality[0]==='a'?aArray:userPersonality[0]==='i'?iArray:userPersonality[0]=='s'?sArray:userPersonality[0]==='e'?eArray:userPersonality[0]=='c'?cArray:[...cArray, ...rArray]
    // const personalityTwoArray = []
    const  personalityTwoArray = userPersonality.length===1?cArray:userPersonality[1]==='r'?rArray:userPersonality[1]==='a'?aArray:userPersonality[1]==='i'?iArray:userPersonality[1]=='s'?sArray:userPersonality[1]==='e'?eArray:userPersonality[1]=='c'?cArray:[...cArray, ...rArray]
    
    const personalityArray = [...personalityOneArray, ...personalityTwoArray]

    let careerNamesArray = []//array of only career names, excluding streams etc
    personalityArray.map((obj, index)=>{
      careerNamesArray[index] = obj['career_name']
    })
    
    const prompt = `Following array contains a career counselling questionnaire answered by a school student. 
    [${JSON.stringify(userData.answers)}]
    You are a career counsellor. You have to recommend the most suitable career for the student out of the following array of careers.
    
    [${careerNamesArray.toString()}]
    
    only select a career from the array. Do not recommend any career which is not present in the array.
    Output should be a json object containing career name and reason for selecting that career. Output should not contain anything other than the json. Output should always follow the following format.
    
    Output format:
    {"career":"CAREER NAME", "reason":"REASON FOR SELECTING THAT CAREER"}`;
    recommendedCareerOutput = await generateGptOutputSinglePrompt(prompt);
    const careerObj = JSON.parse(recommendedCareerOutput);
    
    recommendedStreamObj = await chooseStream(careerObj.career, userData)
    //getting degree name
    const personalityArrayItem = personalityArray.filter((obj)=>(obj.career_name.toUpperCase()===careerObj.career.toUpperCase()))//todo: trusting form of word to be same (engineer/engineering)
    const degree = personalityArrayItem[0].degree

    //getting personality of selected career
    const personalities = {
      r: "Realistic (Doer)",
      i: "Investigative (Thinker)",
      a: "Artistic (Creator)",
      s: "Social (Helper)",
      e: "Enterprising (Persuader)",
      c: "Conventional (Organizer)"
    };  
    const selectedCareerPersonality = personalities[personalityArrayItem[0].category]
    
    res.json({output: {personality: selectedCareerPersonality, degrees: [degree], careers: [{name: careerObj.career, reason: careerObj.reason}], streams: [{name: recommendedStreamObj.set, reason: recommendedStreamObj.reason}] }})
})


app.post('/api/recommendUpskillCareers', async(req,res)=>{
  
  console.log(req.body.userData)

  const userData = req.body.userData;
  //remove empty fields
  const removeEmpty = (userData) => {
    Object.entries(userData).forEach(([key, val])  =>
      (val && typeof val === 'object') && removeEmpty(val) ||
      (val === null || val === "") && delete userData[key]
    );
    return userData;
  };

  const userPersonality = userData.personality; 
  delete userData["personality"];

  //making union of personality arrays
  const personalityOneArray = userPersonality[0]==='r'?rArray:userPersonality[0]==='a'?aArray:userPersonality[0]==='i'?iArray:userPersonality[0]=='s'?sArray:userPersonality[0]==='e'?eArray:userPersonality[0]=='c'?cArray:[...cArray, ...eArray]
  // const personalityTwoArray = []
  const  personalityTwoArray = userPersonality.length===1?cArray:userPersonality[1]==='r'?rArray:userPersonality[1]==='a'?aArray:userPersonality[1]==='i'?iArray:userPersonality[1]=='s'?sArray:userPersonality[1]==='e'?eArray:userPersonality[1]=='c'?cArray:[...cArray, ...eArray]
  
  const personalityArray = [...personalityOneArray, ...personalityTwoArray]

  let careerNamesArray = []//array of only career names, excluding streams etc
  personalityArray.map((obj, index)=>{
    careerNamesArray[index] = obj['career_name']
  })
  
  const promptUsingPersonality = `Following array contains a career counselling questionnaire answered by a school student. 
  [${JSON.stringify(userData.answers)}]
  You are a career counsellor. You have to recommend the most suitable career for the student out of the following array of careers.
  
  [${careerNamesArray.toString()}]
  
  only select a career from the array. Do not recommend any career which is not present in the array.
  Output should be a json object containing career name and reason for selecting that career. Output should not contain anything other than the json. Output should always follow the following format.
  
  Output format:
  {"career":"CAREER NAME", "reason":"REASON FOR SELECTING THAT CAREER"}`;

  const prompt = `Following array contains a career counselling questionnaire answered by a school student. 
  [${JSON.stringify(userData.answers)}]
  You are a career counsellor. You have to recommend the most suitable career for the student according to his details.
  You have to provide a less specific caareer option along with 3 specific categories of that career that would be suitable for the student. You also have to provide the reson for selecting and career. You also have to provide some details about what each category is about.
  Output format:
  {"career":"CAREER NAME", "reason":"REASON FOR SELECTING THAT CAREER", "subcategories":[[CAREER1, DETAIL1], [CAREER2, DETAIL2], [CAREER3, DETAIL3]]}`;

  recommendedCareerOutput = await generateGptOutputSinglePrompt(prompt);
  const careerObj = JSON.parse(recommendedCareerOutput);
  
  // //getting personality of selected career
  // const personalities = {
  //   r: "Realistic (Doer)",
  //   i: "Investigative (Thinker)",
  //   a: "Artistic (Creator)",
  //   s: "Social (Helper)",
  //   e: "Enterprising (Persuader)",
  //   c: "Conventional (Organizer)"
  // };  
  
  res.json({output: { career: {name: careerObj.career, reason: careerObj.reason, categories: careerObj.subcategories} }})
})
// output format:
// {
//   "output": {
//     "careers": [
//       {
//         "name": "Engineering",
//         "reason": "The student has skills in physics and is interested in technology.",
//         "categories": [
//           [
//             "Mechanical Engineering",
//             "Mechanical engineering is the branch of engineering that deals with the design, construction, and operation of machinery."
//           ],
//           [
//             "Electrical Engineering",
//             "Electrical engineering is the branch of engineering that deals with the study and application of electricity, electronics, and electromagnetism."
//           ],
//           [
//             "Computer Engineering",
//             "Computer engineering is the branch of engineering that integrates computer science and electrical engineering to develop computer hardware and software."
//           ]
//         ]
//       }
//     ]
//   }
// }


// expected req: {career: "asdf", userData: {answers:[{"ds":"sd"},{"dd","ff"}]}}
// required: third question is about 'kya kya already aata hai'
app.post('/api/generateRoadmap', async(req, res)=>{
  console.log(req.body.career)
  const preKnowledge = req.body.userData.answers.length>2? Object.values(req.body.userData.answers[2])[0] : false

  prompt = `a student has decided to pursue ${req.body.career} as a career. He needs to learn the necessary skills to land a good ${req.body.career} job. Your job is to create a step by step roadmap of specific skills that the student should learn to achieve his goal.
  ${preKnowledge?`He has already learnt the following skills: ${preKnowledge}
  Do not include these skills in the roadmap.`:''} Return an array of 4-6 skills that the student should learn, in the correct order. Never output anything apart from the array.
  Output format:
  ["SKILL1", "SKILL2", "SKILL3", "SKILL4", "SKILL5"]`

  roadmap = await generateGptOutputSinglePrompt(prompt);
  const roadmapObj = JSON.parse(roadmap);

  const listOfPromises = Promise.all(roadmapObj.map(async function(skill) {
    const getresponse = await axios.get(`https://www.udemy.com/api-2.0/courses/?page_size=2&search=${skill}`, {
      headers: {
          "Accept": "application/json, text/plain, */*",
          "Authorization": "Basic SDZuSklkWHdqQjJnYm40cjdQSDlUa3lKOFhEVGFZeWFEeGxDTDBUQjpSQ3gzYkswOEt1YmxuSDNLOXdxNjJma3BQMkQ2dlNld1Z2cXlrQ2RiZXlYMkdqZVRDWmVlZU80T0ZOUExwb3FjRjJ0d2U0MXVScmM5WHg4OVptcW9RbFVNSzdCQmxsc0JHQW1SVmdHSFVjOEJlMHdxdDFsWDUxbjFpak5IV0JEdA==",
          "Content-Type": "application/json"
        }
  })

    return  { courseTitle: getresponse.data.results[0].title,
      courseLink: 'https://www.udemy.com'+getresponse.data.results[0].url,
      courseImage: getresponse.data.results[0].image_240x135,
      skillName: skill
    };
  }))
  const allResults = await listOfPromises

 
  res.json({output: allResults})

})
// output sample:
// {
//   "output": [
//     "Circuit Analysis",
//     "Digital Electronics",
//     "Analog Electronics",
//     "Microcontrollers",
//     "PCB Design"
//   ],
//   "cou": [
//     {
//       "title": "Full course Circuit Analysis",
//       "url": "/course/full-course-circuit-analysis/",
//       "image": "https://img-c.udemycdn.com/course/240x135/2508614_abe9_2.jpg"
//     },
//     {
//       "title": "Digital Electronics - Complete Course (72+ Hours)",
//       "url": "/course/digitalelectronics/",
//       "image": "https://img-c.udemycdn.com/course/240x135/3478750_1c06.jpg"
//     },
//     {
//       "title": "The Complete Electronics Course 2022: Analog Hardware Design",
//       "url": "/course/electronic-circuits-for-beginners-analog-hardware-design/",
//       "image": "https://img-c.udemycdn.com/course/240x135/2548629_e360_4.jpg"
//     },
//     {
//       "title": "Mastering Microcontroller and Embedded Driver Development",
//       "url": "/course/mastering-microcontroller-with-peripheral-driver-development/",
//       "image": "https://img-c.udemycdn.com/course/240x135/643206_2ee7_9.jpg"
//     },
//     {
//       "title": "Crash Course Electronics and PCB Design",
//       "url": "/course/crash-course-electronics-and-pcb-design/",
//       "image": "https://img-c.udemycdn.com/course/240x135/401998_6e4a.jpg"
//     }
//   ]
// }