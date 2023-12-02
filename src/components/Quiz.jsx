import { useState, useCallback } from 'react'
import QUESTIONS from './util/questions.js'
import Timer from './Timer.jsx'
import Results from './Results.jsx'
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { FadeIn, FadeOut, JumpIn } from './Animations.jsx'

const shuffledAnswers = []  // create a copy of the answers for each question and randomize the order
for (var key in QUESTIONS) {
    const toShuffle = [].concat(QUESTIONS[key].answers)
    toShuffle.sort(() => Math.random() - 0.5)
    shuffledAnswers.push(toShuffle)    
}

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]) // create and update an array containing the user's answers
    // const [answeredState, setAnsweredState] = useState([])
    const [progressBar, setProgressBar] = useState(0)
    const [selectedAnswer, setselectedAnswer] = useState(null)

    function onClick(answer) { // making sure  the user has to double select to confirm answer
        if (selectedAnswer === answer) { 
             setselectedAnswer(null)
        }
        else {
            setselectedAnswer(answer) 
        }
    }

    const currentQuestionIndex = userAnswers.length // used for keeping track of the current question

    const gameOver = currentQuestionIndex === QUESTIONS.length
    
    const nextQuestion = useCallback (function nextQuestion(answer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer]
        })
        setProgressBar((prevProgressBar) => {return prevProgressBar + (100 / (QUESTIONS.length-1))})
        setselectedAnswer(null)
    })

    const handleSkipAnswer = useCallback(() => nextQuestion(null), [nextQuestion])

    return(
       
                <motion.div layout className="w-11/12 lg:max-w-6xl mx-auto overflow-hidden text-center rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:min-h-fit lg:w-10/12 bg-base-200">
                <LayoutGroup>
                    {gameOver ? 
                    <FadeIn delay={0.3} duration={0.5}>
                        <Results answers={userAnswers} shuffledAnswers={shuffledAnswers}/> 
                    </FadeIn>
                        
                    :
                    
                    <FadeOut key={gameOver} duration={0.5} delay={0.2}>
                       <motion.div className='px-4 py-0 lg:py-8 md:px-10 '>
                            <motion.h2 
                                key={QUESTIONS[currentQuestionIndex].text}
                                initial={{ opacity: 0 , scaleX:0.7}}
                                animate={{ opacity: 1, scaleX:1, transition:{ duration:0.2}}}
                                className='my-3 text-xl font-bold tracking-wide text-md lg:text-2xl text-content'
                            >
                                    {QUESTIONS[currentQuestionIndex].text}
                            </motion.h2>
                            <div className="w-10/12 mx-auto mb-0 divider"></div>
                            <div className="flex-row items-center justify-between w-full mx-auto my-5 md:w-10/12 md:flex">
                                
                                <div className="grid mx-auto grow-0 justify-items-start w-fit md:w-2/12 md:justify-items-end">
                                    <Timer key={currentQuestionIndex} onTimeout={handleSkipAnswer} timeout={3000000}/>
                                </div>
                                
                                <ul className='content-center flex-auto w-full lg:mx-10 menu text-content grow-none'>
                                    {shuffledAnswers[currentQuestionIndex].map((answer) => {
                                        let classes = ['w-full text-center my-1.5 text-sm md:tracking-wider transition-all duration-150 hover:scale-101 ease-in-out lg:text-[15px] md:text-md rounded-lg bg-base-100 drop-shadow-md hover:drop-shadow-none']
                                        if (answer === selectedAnswer) {
                                            classes.push(' ring-1 ring-offset-1 ring-offset-transparent ring-base-content bg-indigo-600 ')
                                        }
                                        return(
                                                <li 
                                                    onClick={() => onClick(answer)} 
                                                    key={answer} 
                                                    className={classes}
                                                >
                                                    <a className='justify-center px-6 py-4 text-center'>{answer}</a> 
                                                </li>
                                        )
                                        }
                                    )}
                                </ul>
                                
                            </div>
                            
                            <button 
                                className={"bg-indigo-600 hover:bg-indigo-800 btn " + (!selectedAnswer &&  " btn-disabled")}
                                onClick={() => nextQuestion(selectedAnswer)}
                            >
                                SUBMIT ANSWER
                                <i className="inline justify-self-end fa-solid fa-angles-right"></i>
                            </button>
                                
                        </motion.div>
                         <motion.div
                            className = {"myprogress"} 
                            animate = {{ scaleX: progressBar/100 }}
                            initial = {{scaleX :0}}
                            transition = {{ duration: 0.5 }}
                        />
                        </FadeOut>
                    }
                    </LayoutGroup>
                    
                </motion.div>

    )
}