// async function wait() {
//     await new Promise(resolve => setTimeout(resolve, 1000));
  
//     return 1;
//   }
//   async function wait2() {
//     await new Promise(resolve => setTimeout(resolve, 2000));
  
//     return 2;
//   }
  
//   async function f() {
//     // shows 10 after 1 second
//     const i = await wait2()
//     // console.log(i)
//     const j = await wait()
//     // console.log(j)
//     let arr={}
//     arr[0] = j
//     console.log(j)
//   }
  
//   f();

const rArray = [
  {
    "category": "r",
    "career_name": "Aerospace Engineer",
    "streams": [
      "pcm"
    ],
    "degree": "B.Tech"
  },
  {
    "category": "r",
    "career_name": "Athletics and Sports",
    "streams": [
      "pcm",
      "commerce",
      "humanities"
    ],
    "degree": "Any"
  },
  {
    "category": "r",
    "career_name":
      "Engineer (Civil, Electrical, Mechanical)",
    "streams": [
      "pcm"
    ],
    "degree": "B.Tech M.Tech Diploma"
  },
  {
    "category": "r",
    "career_name": "Agronomists",
    "streams": [
      "pcb"
    ],
    "degree": "B. Sc    M. Sc"
  },
  {
    "category": "r",
    "career_name": "Skilled Trade",
    "streams": [
      "pcm"
    ],
    "degree": "Any"
  },
  {
    "category": "r",
    "career_name": "Non-Clinical Health Care",
    "streams": [
      "pcm",
      "pcb",
      "commerce"
    ],
    "degree": "BHA BHIM BBA"
  },
  {
    "category": "r",
    "career_name": "Project Manager",
    "streams": [
      "pcm",
      "commerce"
    ],
    "degree": "BBA BMS"
  }
  
]

let careerNamesArray = []
rArray.map((obj, index)=>{
  careerNamesArray[index] = obj['career_name']
})
console.log(careerNamesArray)