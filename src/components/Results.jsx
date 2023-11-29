import IndividualResult from "./IndividualResult.jsx"
import QUESTIONS from "./util/questions.js"

export default function Results({answers, shuffledAnswers}) {

    const skipped = (answers.filter((answer) => answer == null)).length
    const skippedPercentage = Math.round(100*((skipped/answers.length)))
    const answeredPercentage = Math.round(100*(1-(skipped/answers.length)))

    
    var correctAnswers = 0

    for (var index in answers) {
        if (answers[index] === QUESTIONS[index].answers[0]){
            correctAnswers += 1
        }   
    }

    const mark = ((correctAnswers/answers.length) * 100).toFixed(2)
       
    return(
        <div className="flex items-center mt-2 align-middle">
            <div className="max-w-6xl mx-auto overflow-hidden text-center rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-11/12 min-h-fit lg:w-10/12 bg-base-200">
                <div className="p-2 md:p-8 xl:p-12"> 
                    <h2 className="mb-4 text-4xl font-bold tracking-wider">RESULTS</h2>
                    <div className="mb-6 text-xs align-middle shadow sm:text-md md:text-lg stats stats-vertical sm:stats-horizontal">
                        <div className="stat">
                            <div className="stat-title">Skipped questions</div>
                            <div className="stat-value">{skipped}</div>
                            <div className="text-lg stat-desc">{skippedPercentage}%</div>
                        </div>
                        
                        <div className="stat bg">
                            <div className="stat-title">Answered questions</div>
                            <div className="stat-value">{answers.length - skipped}</div>
                            <div className="text-lg stat-desc">{answeredPercentage}%</div>
                        </div>
                        
                        {mark >= 50 ?
                            <div className="bg-neutral stat">
                                <div className="stat-title">YOUR MARK</div>
                                <div className="stat-value">{mark}%</div>
                                <div className="text-lg">PASS</div> 
                            </div> 
                            :
                            <div className="bg-warning stat">
                                <div className="stat-title">YOUR MARK</div>
                                <div className="stat-value">{Math.round(mark * 100) / 100}%</div>
                                <div className="text-lg">FAIL</div> 
                            </div> 
                        }
                        

                    </div>
                    <div className="w-10/12 mx-auto mt-1 md:w-8/12 divider"></div>

                    <h2 className="mb-4 text-3xl font-semibold uppercase">Your answers</h2>

                    {answers.map((answer, index) => (
                        <IndividualResult key={index} answer={answer} answers={answers} shuffledAnswers={shuffledAnswers} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}