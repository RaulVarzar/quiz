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

    const currentQuestionIndex = userAnswers.length // used for keeping track of the current question

    const progressBar = (100 / QUESTIONS.length) * currentQuestionIndex // progress bar at the bottom of the quiz

    const gameOver = currentQuestionIndex === QUESTIONS.length
    
    const nextQuestion = useCallback (function nextQuestion(answer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer]
        })
    })

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
                        <h2 className='my-3 text-xl font-bold uppercase text-md lg:text-2xl text-content'>{QUESTIONS[currentQuestionIndex].text}</h2>
                        <div className="w-10/12 m-0 mx-auto divider"></div>
                        <div className="flex-row items-center justify-center mx-auto my-5 lg:flex">
                            
                            <div className="flex content-center justify-end w-2/12 mx-auto">
                                <Timer key={currentQuestionIndex} onTimeout={handleSkipAnswer} timeout={50000}/>
                            </div>
                            
                            <ul className='content-center w-full lg:mx-10 lg:w-10/12 menu text-content grow-none'>
                                {shuffledAnswers[currentQuestionIndex].map((answer) => (
                                    <li onClick={() => nextQuestion(answer)} key={answer} className="justify-center p-0 my-1.5 text-xs tracking-wider text-center transition-all duration-150 ease-in-out lg:text-[15px] md:text-md rounded-xl bg-base-100 drop-shadow-md hover:drop-shadow-none">
                                    <a className='justify-center px-6 py-4'>{answer}</a> 
                                    </li>
                                ))}
                            </ul>
                        
                        </div>
                    </div>
                    
                    <progress className="w-[101%] -ml-[0.5%] -mb-1.5 progress h-2" value={progressBar} max="100"></progress>
                    
                </div>
            </div>
        </>
    )
}