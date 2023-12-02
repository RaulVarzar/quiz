import QUESTIONS from './util/questions.js'

export default function IndividualResult ({answers, index, shuffledAnswers}) {
    return(
        <>
            <div className="mx-auto my-3 text-sm transition duration-150 md:w-10/12 lg:w-10/12 w-12/12 md:text-md collapse bg-base-300 elevation-1 hover:elevation-3 hover:scale-101">
                <input type="radio" name="my-accordion-1" defaultChecked={index===0}/>         
                    <div className="text-sm font-medium bg-neutral md:text-xl collapse-title">
                       {index + 1}. {QUESTIONS[index].text}
                    </div>
                    <div className="bg-base-100 collapse-content"> 
                        <ul className='mt-6'>
                            
                            {shuffledAnswers[index].map((defaultAnswer) => {
                                let conditionalClasses = ''
                                if (QUESTIONS[index].answers[0] === defaultAnswer && defaultAnswer === answers[index]) {
                                    conditionalClasses = " bg-emerald-700 font-semibold"
                                } else if (QUESTIONS[index].answers[0] != defaultAnswer && defaultAnswer === answers[index]) {
                                    conditionalClasses = " bg-rose-400 font-semibold"
                                } else{
                                    conditionalClasses = " bg-base-300 text-stone-400"
                                }
                                return(
                                    <li key={defaultAnswer} className={"px-4 text-sm lg:text-md py-2 mx-auto my-2 rounded-xl w-fit" + conditionalClasses}>
                                        {defaultAnswer}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
            </div>
            
        </>
    )
}