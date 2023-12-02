import Main from "./components/Main";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const [started, setStarted] = useState(false)

  function handleQuizStart(){
    setStarted(true)
  }

  return (
    <>
        <Main>
          <AnimatePresence mode="wait" >
          {started ?
            <Quiz /> : <Header key={started} onStart={handleQuizStart}/> 
          }
          </AnimatePresence>
          
        </Main>
    </>
  );
}

export default App;
