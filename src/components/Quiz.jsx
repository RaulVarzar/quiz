import { useState } from 'react'
import QUESTIONS from './util/questions.js'
import Results from './Results.jsx'
import { motion } from "framer-motion"
import { FadeIn, FadeOut } from './Animations.jsx'
import Game from './Game.jsx'

const shuffledAnswers = []
for (var key in QUESTIONS) {
    const toShuffle = [].concat(QUESTIONS[key].answers)
    toShuffle.sort(() => Math.random() - 0.5)
    shuffledAnswers.push(toShuffle)    
}

export default function Quiz() {
    
    const [userAnswers, setUserAnswers] = useState([]) // create and update an array containing the user's answers
    const currentQuestionIndex = userAnswers.length // used to display the current question
    const gameOver = currentQuestionIndex === QUESTIONS.length // used to end game and display results when there are no more questions
    
    function nextQuestion(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        }) 
    }

    function restartQuiz() {
        setUserAnswers([])
    }

    return(
       <>
                <motion.div 
                    layout 
                    initial={{scale:0}} 
                    animate={{scale:1, transition:{delay:0, duration:0.35}}} 
                    className={"md:my-8 mb-12 md:mb-8 md:pb-0 mx-auto overflow-hidden text-center md:rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:w-fit bg-base-200" }
                >
                        {!gameOver ? 
                            // <FadeOut key={gameOver} duration={0.5} delay={0.2}>
                                <Game 
                                    questions={QUESTIONS}
                                    nextQuestion={nextQuestion}
                                    activeQuestion={currentQuestionIndex}
                                    userAnswers={userAnswers}
                                    shuffledAnswers={shuffledAnswers}
                                />
                            // </FadeOut>
                            :
                            // <FadeIn delay={0.3} duration={0.5}>
                                <Results answers={userAnswers} shuffledAnswers={shuffledAnswers} restartQuiz={restartQuiz}/> 
                            //  </FadeIn> 
                        }
                        
                </motion.div>
               
                </>
    )
}