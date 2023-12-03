import { useState, useCallback, useRef, useMemo } from 'react'
import QUESTIONS from './util/questions.js'
import Timer from './Timer.jsx'
import Results from './Results.jsx'
import { motion, LayoutGroup } from "framer-motion"
import { FadeIn, FadeOut } from './Animations.jsx'

const shuffledAnswers = []
for (var key in QUESTIONS) {
    const toShuffle = [].concat(QUESTIONS[key].answers)
    toShuffle.sort(() => Math.random() - 0.5)
    shuffledAnswers.push(toShuffle)    
}

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]) // create and update an array containing the user's answers
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const progressBar = (userAnswers.length * ( 100 / (QUESTIONS.length - 1) ))

    function onClick(answer) {
        if (selectedAnswer === answer) { 
            setSelectedAnswer(null)
        } else {
            setSelectedAnswer(answer)
        }
    }
  
    const currentQuestionIndex = userAnswers.length
    const gameOver = currentQuestionIndex === QUESTIONS.length
    
    const nextQuestion = useCallback (function nextQuestion(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
        // setProgressBar((prevProgressBar) => {return prevProgressBar + (100 / (QUESTIONS.length-1))})
        setSelectedAnswer(null)
    })

    const handleSkipAnswer = useCallback(() => nextQuestion(null), [nextQuestion])

    function restartQuiz() {
        setUserAnswers([])
    }

    return(
       <>
                <motion.div 
                    layout 
                    initial={{scaleY:0}} 
                    animate={{scaleY:1, transition:{delay:0, duration:0.25}}} 
                    className={"md:my-8 mb-12 md:mb-8 md:pb-0 lg:max-w-6xl mx-auto overflow-hidden text-center md:rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:min-h-fit lg:w-10/12 bg-base-200" + (gameOver ? " w-12/12" : " w-11/12")}
                >
                    <LayoutGroup>
                        {gameOver ? 
                        <FadeIn delay={0.3} duration={0.5}>
                                <Results  answers={userAnswers} shuffledAnswers={shuffledAnswers} restartQuiz={restartQuiz}/> 
                        </FadeIn>
                        :
                        
                        <FadeOut key={gameOver} duration={0.5} delay={0.2}>
                        <motion.div className='px-4 py-6 lg:py-8 md:px-10'>
                                <motion.h2 
                                    key={QUESTIONS[currentQuestionIndex].text}
                                    initial={{ opacity: 0 , scaleX:0.85, y:-5}}
                                    animate={{ opacity: 1, scaleX:1, y:0, transition:{ duration:0.3, delay:0.25}}}
                                    className='my-3 text-xl font-bold tracking-wide text-md lg:text-2xl text-content'
                                >
                                        {QUESTIONS[currentQuestionIndex].text}
                                </motion.h2>
                                <div className="w-10/12 mx-auto mb-0 divider"></div>
                                <div className="flex-row items-center justify-between w-full mx-auto my-5 md:w-10/12 md:flex">
                                    
                                    <div className="grid mx-auto grow-0 justify-items-start w-fit md:w-2/12 md:justify-items-end">
                                        <Timer 
                                            key={currentQuestionIndex} 
                                            onTimeout={handleSkipAnswer} 
                                            current={userAnswers.length} 
                                            timeout={15000}/>
                                    </div>
                                    
                                    <motion.ul 
                                        initial={{opacity:0}}
                                        animate={{opacity:1, transition:{delay:0.2, duration:0.15}}}
                                        key={currentQuestionIndex}
                                        className='content-center flex-auto w-full lg:mx-10 menu text-content grow-none'
                                    >
                                        {shuffledAnswers[currentQuestionIndex].map((answer) => {
                                            let classes = ['w-full text-center my-1.5 text-sm md:tracking-wider transition-all duration-150 hover:scale-101 ease-in-out lg:text-[15px] md:text-md rounded-lg bg-base-100 drop-shadow-md hover:drop-shadow-none']
                                            if (answer === selectedAnswer) {
                                                classes.push(' ring-1 ring-offset-1 ring-offset-transparent bg-opacity-50 ring-base-content bg-indigo-600')
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
                                    </motion.ul>
                                    
                                </div>

                                <button 
                                    className={"bg-indigo-600 hover:bg-indigo-800 group btn " + (!selectedAnswer &&  " btn-disabled")}
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
               
                </>
    )
}