import React,{useContext,createContext, useState} from 'react'

export const finalAnsContext = createContext([]);

export function AnsContexts(ans1) {
  const [finalAns, setFinalAns] = useState([]);

  function addItem (ansName) {
    setFinalAns([...finalAns, ansName]);
    console.log(finalAns)
  };

  // const contextValue = { finalAns, addItem };

  return (
    // <finalAnsContext.Provider value={contextValue}>
      // {children}
    // </finalAnsContext.Provider>
    addItem(ans1)
  );
}

export default AnsContexts
