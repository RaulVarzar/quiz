import QUESTIONS from './util/questions.js'

export default function IndividualResult ({answer, index, shuffledAnswers}) {
    
    const answerIsCorrect = (selectedAnswer) => {return QUESTIONS[index].answers[0] === selectedAnswer && selectedAnswer === answer}
    const answerIsIncorrect = (selectedAnswer) => {return QUESTIONS[index].answers[0] != selectedAnswer && selectedAnswer === answer}

    return(
        <>
            <div className="mx-auto my-3 text-sm transition duration-150 md:w-10/12 lg:w-10/12 w-12/12 md:text-md collapse bg-base-300 elevation-1 hover:elevation-3 hover:scale-101">
                <input type="radio" name="my-accordion-1" defaultChecked={index===0}/>         
                
                    <div className="p-0 text-sm font-medium bg-neutral md:text-xl collapse-title">
                        <div className="flex items-center justify-between h-full">
                            <p className='px-6 py-3.5 text-2xl bg-indigo-800 bg-opacity-20'>{index + 1}</p>
                            <span className='px-1 text-xs md:text-lg'>{QUESTIONS[index].text}</span>
                            { !answer ? <i className="pl-2 pr-6 text-slate-600 fa-regular fa-circle fa-lg"></i> 
                                : 
                            answerIsCorrect(answer) ? <i className="pl-2 pr-6 text-teal-500 fa-regular fa-circle-check fa-lg"></i> 
                                : 
                             answerIsIncorrect(answer) && <i className="pl-2 pr-6 text-rose-300 fa-solid fa-circle-xmark fa-lg"></i> 
                            }
                        </div>
                    </div>
                    
                    <div className="bg-base-100 collapse-content"> 
                        <ul className='mt-6'>
                            {shuffledAnswers.map((selectedAnswer) => {
                                let conditionalClasses = ''
                                if (answerIsCorrect(selectedAnswer)) {
                                    conditionalClasses = " bg-emerald-700 font-semibold"
                                } else if (answerIsIncorrect(selectedAnswer)) {
                                    conditionalClasses = " bg-rose-400 bg-opacity-70 font-semibold"
                                } else {
                                    conditionalClasses = " bg-base-300 text-stone-400"
                                }
                                return(
                                    <li key={selectedAnswer} className={"px-4 text-xs md:text-md py-2 mx-auto my-2 rounded-xl w-fit" + conditionalClasses}>
                                        {selectedAnswer}
                                    </li>
                                )
                            })}
                            
                        </ul>
                    </div>
            </div>
            
        </>
    )
}