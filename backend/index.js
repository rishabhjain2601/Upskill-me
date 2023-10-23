const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios')

const app = express();
const PORT = 4567;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const {rArray, aArray, iArray, sArray, eArray, cArray} = require('./personalityArrays.js')


const configuration = new Configuration({
    // apiKey: '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',
    apiKey: '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'
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
        url: response.data.results[0].url})
      }).catch(error => {
        console.error(error)
        res.status(500).json({ error: error.message })
      })
    // .then(data => {
    // // console.log(data.body.toString());
    // console.log(JSON.stringify(data.body,null, 4))
    // res.json({output: data.body})
    // });

    
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


  async function chooseStream(career, userData){
    const careerPrompt = `A school student wants to pursue ${career} as a career. Following array contains a career counselling questionnaire answered by the student. 
    ${JSON.stringify(userData.answers)}
    
    You are a career counsellor. Use the questionnaire as data about the student to recommend the most suitable set of subjects the students should choose to study in high school, in order to become a ${career}. The set of subjects should be selected from the following array.
    
    [
      'Physics, Chemistry, Maths',
    'Physics, Chemistry, Biology',
    'Commerce',
    'Humanities'
    ]
    
    Here, commerce is a set of subjects related to economics and business studies, and humanities is a set of subjects related to social sciences.
    only select one set from the array. Do not recommend any set which is not present in the array.
    Output should be a json object containing the set and reason for selecting that set of subjects. Output should not contain anything other than the json. Output should always follow the following format.
    
    Output format:
    {"set":"SET OF SUBJECTS", "reason":"REASON FOR SELECTING THAT SET"}`
    recommendedStreamOutput = await generateGptOutputSinglePrompt(careerPrompt);
    return(JSON.parse(recommendedStreamOutput))
  }

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