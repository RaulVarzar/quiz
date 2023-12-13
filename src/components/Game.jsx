import { AnimatePresence, motion } from "framer-motion"
import Timer from './Timer.jsx'
import { useState, useCallback } from "react"

export default function Game({nextQuestion, questions, activeQuestion, userAnswers, shuffledAnswers}) {

    const skip = useCallback(() => {
        nextQuestion(null) 
        setSelectedAnswer(false)
    }, [nextQuestion])
    
    const [selectedAnswer, setSelectedAnswer] = useState(false)

    const progressBar = (userAnswers.length * ( 100 / (questions.length - 1) ))

    function onSelect(answer) {
        if (selectedAnswer === answer) { 
            setSelectedAnswer(false)
        } else {
            setSelectedAnswer(answer)
        }
    }
    return (
        <>
            <div className='px-4 py-6 lg:py-8 md:px-10'>
                <div className="p-0 pb-2 overflow-hidden">
                    <AnimatePresence mode='wait'>
                    <motion.h2 
                        key={questions[activeQuestion].text}
                        initial={{ y: '-150%'}}
                        animate={{ y:0, transition:{ duration:0.15, delay:0}}}
                        exit={{y: '200%'}}
                        className='text-xl font-bold leading-none tracking-wide text-md lg:text-2xl text-content'
                    >
                        {questions[activeQuestion].text}
                    </motion.h2>
                    </AnimatePresence>
                    </div>
                                <h2 className="h-0 text-xl font-bold leading-[0] tracking-wide -translate-y-16 opacity-0 text-md lg:text-2xl">{questions[activeQuestion].text}</h2>
                                <div className="w-10/12 mx-auto my-0 divider"></div>
                                <div className="flex-row items-center justify-between w-full mx-auto my-5 md:w-10/12 md:flex">
                                    
                                    <div className="grid mx-auto grow-0 justify-items-start w-fit md:w-2/12 md:justify-items-end">
                                        <Timer 
                                            key={activeQuestion} 
                                            onTimeout={skip}
                                            timeout={15000}/>
                                    </div>
                                    
                                    <motion.ul 
                                        // initial={{opacity:0}}
                                        // animate={{opacity:1, transition:{delay:0.2, duration:0.15}}}
                                        key={activeQuestion}
                                        className='content-center flex-auto w-full lg:mx-10 menu text-content grow-none'
                                    >
                                        {shuffledAnswers[activeQuestion].map((answer, index) => {
                                            let classes = ['w-full text-center my-1.5 text-sm md:tracking-wider transition-all duration-150 hover:scale-101 ease-in-out lg:text-[15px] md:text-md rounded-lg bg-base-100 drop-shadow-md hover:drop-shadow-none']
                                            if (answer === selectedAnswer) {
                                                classes.push(' ring-1 ring-offset-1 ring-offset-transparent bg-opacity-50 ring-base-content bg-indigo-600')
                                            }
                                            return (
                                                <motion.li 
                                                    variants={{
                                                        hidden:{
                                                            // scaleY:0,
                                                            // y: '-50%',
                                                            opacity:0
                                                        },
                                                        visible: (index) => ({
                                                            // scaleY: 1,
                                                            // y: 0,
                                                            opacity:1,
                                                            transition:{
                                                                duration:0.3, 
                                                                delay: (index+3) * 0.12, // staggered delay
                                                                ease: "linear"
                                                            }
                                                        })
                                                    }}
                                                    initial= "hidden"
                                                    animate="visible"
                                                    custom={index}
                                                    onClick={() => onSelect(answer)} 
                                                    key={answer} 
                                                    className={classes}>   
                                                    <p className='justify-center px-6 py-4 text-center'>{answer}</p> 
                                                </motion.li>
                                            )
                                            }
                                        )}
                                    </motion.ul>
                                    
                                </div>

                                <button 
                                    className={"bg-indigo-600 hover:bg-indigo-800 group btn " + (!selectedAnswer &&  " btn-disabled")}
                                    onClick={() => {nextQuestion(selectedAnswer) 
                                                    setSelectedAnswer(false)}}
                                >
                                    SUBMIT ANSWER
                                    <i className="inline justify-self-end fa-solid fa-angles-right"></i>
                                </button>
                                    
                            </div>
                            <motion.div
                                className = {"myprogress"} 
                                animate = {{ scaleX: progressBar/100 }}
                                initial = {{scaleX :0}}
                                transition = {{ duration: 0.5 }}
                            />
        </>
    )
}