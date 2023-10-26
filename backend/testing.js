async function wait() {
    await new Promise(resolve => setTimeout(resolve, 100));
  
    return 1;
  }
  async function wait2() {
    await new Promise(resolve => setTimeout(resolve, 200));
  
    return 2;
  }
  
  async function f() {
    count = [1,2]
    const listOfPromises = Promise.all(count.map(async function(e, index) {
      if(e==2){const getresponse = await wait()
        return  getresponse;
      }
      else  {const getresponse = await wait2()
        return  getresponse;
      }
      
    }))
    const allResults = await listOfPromises
    console.log(allResults)
  }
  
  f();
