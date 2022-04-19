import { useState, useContext } from "react";
import { LanguageContext } from '../../contexts/context'

//const LanguageContext = createContext();

function LanguageChange() {
  //english 
  //vietnamese 
  //turkish 
  //french
  const [language, setLanguage] = useState("en");


  function changeLanguage() {
    console.log("Clicked");
    //console.log(a);
    if (language === "en") {
      setLanguage("vie");
    } else if (language === "vie") {
      setLanguage("turk");
    } else if (language === "turk") {
      setLanguage("fr")
    } else {
      setLanguage("en")
    }
  }

  return (
    <LanguageContext.Provider value={language}>
      <button onClick={changeLanguage}>Change language</button>
      <Hello />
    </LanguageContext.Provider>
  );
}

function Hello() {
  const language = useContext(LanguageContext);
  if (language === "vie") {
    return <h1>Xin chao</h1>
  } else if (language === "en") {
    return <h1>Hello</h1>
  } else if (language === "turk") {
    return <h1>Marhaban</h1>
  }
  return <h1>Bonjour</h1>
}

export default LanguageChange