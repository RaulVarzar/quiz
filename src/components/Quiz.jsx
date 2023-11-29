import { useState, useCallback } from 'react'
import QUESTIONS from './util/questions.js'
import Timer from './Timer.jsx'
import Results from './Results.jsx'


const shuffledAnswers = []  // create a copy of the answers for each question and randomize the order
for (var key in QUESTIONS) {
    const toShuffle = [].concat(QUESTIONS[key].answers)
    toShuffle.sort(() => Math.random() - 0.5)
    shuffledAnswers.push(toShuffle)    
}


export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]) // create and update an array containing the user's answers
    const [state, setState] = useState([])

    const currentQuestionIndex = userAnswers.length // used for keeping track of the current question

    const progressBar = (100 / QUESTIONS.length) * currentQuestionIndex // progress bar at the bottom of the quiz

    const gameOver = currentQuestionIndex === QUESTIONS.length
    
    const nextQuestion = useCallback (function nextQuestion(answer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer]
        })
        setState((prevState) => { return [...prevState, 'answered'] })
    })

    console.log(state)
    const handleSkipAnswer = useCallback(() => nextQuestion(null), [nextQuestion])

    if (gameOver) {
        return(
            <Results answers={userAnswers} shuffledAnswers={shuffledAnswers}/>
        )
    }
    return(
        <>
            <div className="flex items-center mt-2 align-middle">
                <div className="w-11/12 lg:max-w-6xl mx-auto overflow-hidden text-center rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:min-h-fit lg:w-10/12 bg-base-200">
                    <div className='px-4 py-6 md:px-10 '>
                        <h2 className='my-3 text-xl font-bold tracking-wide text-md lg:text-2xl text-content'>{QUESTIONS[currentQuestionIndex].text}</h2>
                        <div className="w-10/12 mx-auto mb-0 divider"></div>
                        <div className="flex-row items-center justify-between w-full mx-auto my-5 md:w-10/12 md:flex">
                            
                            <div className="grid mx-auto justify-items-start w-fit md:w-2/12 md:justify-items-end">
                                <Timer key={currentQuestionIndex} onTimeout={handleSkipAnswer} timeout={30000}/>
                            </div>
                            
                            <ul className='content-end flex-auto w-full lg:mx-10 menu text-content grow-none'>
                                {shuffledAnswers[currentQuestionIndex].map((answer) => (
                                    <li onClick={() => nextQuestion(answer)} key={answer} className="text-center tracking-tighter my-1.5 text-xs md:tracking-wider transition-all duration-150 ease-in-out lg:text-[15px] md:text-md rounded-xl bg-base-100 drop-shadow-md hover:drop-shadow-none">
                                    <a className='justify-center px-6 py-4'>{answer}</a> 
                                    </li>
                                ))}
                            </ul>
                        
                        </div>
                    </div>

                    {/* <ul className="steps">
                        {shuffledAnswers.map((index) => (
                            <li 
                                key={index} 
                                data-content={userAnswers[shuffledAnswers.indexOf(index)] ? "✓" : userAnswers[shuffledAnswers.indexOf(index)]===null ? "✕" : ""} 
                                className="step step-neutral" 
                            >
                                {shuffledAnswers.indexOf(index)}
                            </li>
                        ))}
                    </ul> */}
                    
                    <progress className="w-[101%] -ml-[0.5%] -mb-1.5 progress progress-success h-1" value={progressBar} max="100"></progress>
                    
                </div>
            </div>
        </>
    )
}