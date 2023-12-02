import { FadeIn, JumpIn, ShrinkOut } from "./Animations"
import {motion} from "framer-motion"

export default function Header({onStart}){
    return(
        <ShrinkOut duration={0.3} delay={0.1}>
            <div className="flex flex-col items-center mx-auto w-fit">
                <JumpIn duration={0.7} delay={0.5} className="content-center flex-none my-auto text-center align-middle" >
                        <h1 className="text-4xl font-bold text-center align-middle lg:text-6xl"> {'<'}REACT_QUIZ{' />'} </h1> 
                        <p className="my-3 italic text-md lg:text-lg">How much do you know about React? Test your knowledge with this quiz!</p>   
                </JumpIn>
                
                <JumpIn duration={0.4} delay={0.8}>
                    <motion.button 
                    whileHover={{scale:0.95}}
                    className="p-4 mx-auto mt-3 align-middle transition duration-300 ease-in-out btn btn-neutral elevation-6 hover:elevation-1" 
                    onClick={onStart}>
                        START QUIZ 
                        <i className="ml-2 fa-solid fa-play"></i>
                    </motion.button>
                </JumpIn>
            </div>
        </ShrinkOut>
        
    )
}