import IndividualResult from "./IndividualResult.jsx"
import QUESTIONS from "./util/questions.js"
import { FadeIn, FromTop } from "./Animations.jsx"


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
                <div className="p-0 pb-4">     
                <FromTop delay={0.2} duration={0.2}>
                    <div className="w-full mb-6 text-xs align-middle rounded-none shadow sm:text-md md:text-lg stats stats-vertical sm:stats-horizontal">
                        <div className="stat bg-neutral">
                            <div className="stat-title">Skipped questions</div>
                            <div className="stat-value">{skipped}</div>
                            <div className="text-lg stat-desc">{skippedPercentage}%</div>
                        </div>
                        
                        <div className="bg-neutral stat">
                            <div className="stat-title">Answered questions</div>
                            <div className="stat-value">{answers.length - skipped}</div>
                            <div className="text-lg stat-desc">{answeredPercentage}%</div>
                        </div>
                        
                        {mark >= 50 ?
                            <div className="bg-emerald-400 stat">
                                <div className="stat-title">YOUR MARK</div>
                                <div className="stat-value">{mark}%</div>
                                <div className="text-lg">PASS</div> 
                            </div> 
                            :
                            <div className="bg-error stat">
                                <div className="stat-title">YOUR MARK</div>
                                <div className="stat-value">{Math.round(mark * 100) / 100}%</div>
                                <div className="text-lg">FAIL</div> 
                            </div> 
                        }
                    </div>
                    </FromTop>
                
                <FadeIn delay={0.5} duration={0.2}>
                   <div>
                        <h2 className="mb-4 text-3xl font-semibold uppercase">Your answers</h2>
                        {answers.map((answer, index) => (
                            <IndividualResult key={index} answer={answer} answers={answers} shuffledAnswers={shuffledAnswers} index={index}/>
                        ))}
                    </div> 
                </FadeIn>
                </div>
    )
}