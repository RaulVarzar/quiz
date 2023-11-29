import Main from "./components/Main";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
  const [started, setStarted] = useState(false)

  function handleQuizStart(){
    setStarted(true)
  }

  return (
    <>
        <Main>
          {!started ?
            <Header onStart={handleQuizStart}/>
            :
            <Quiz />
          }
        </Main>
    </>
  );
}

export default App;
