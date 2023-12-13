import { motion } from "framer-motion"

export  function JumpIn({ children, duration, delay }){
    return(
        <motion.div
            initial={{  scale: 0.2, translateY:35, opacity:0 }}
            animate={{  scale: 1, translateY:0, opacity:1 }}
            transition={{type:'spring', duration: duration, delay:delay }}
            
        >
            {children}
        </motion.div>
    )
}

export  function FadeIn({ children, duration, delay }){
    return(
        <motion.div
            initial={{ opacity:0 }}
            animate={{  opacity:1 }}
            transition={{ duration: duration, delay:delay }}
        >
            {children}
        </motion.div>
    )
}

export  function FromTop({ children, duration, delay }){
    return(
        <motion.div
            initial={{ translateY:-100 }}
            animate={{  translateY:0 }}
            transition={{ duration: duration, delay:delay }}
        >
            {children}
        </motion.div>
    )
}

export  function FadeOut({ children, duration, delay }){
    return(
        <motion.div 
            exit={{ 
                opacity: 0,
                transition:{
                    duration:duration, 
                    delay:delay
                } 
            }}
        >
            {children}
        </motion.div>
    )
}

export  function ShrinkOut({ children, duration, delay }){
    return(
        <motion.div 
            exit={{ 
                opacity: 0,
                scale:0.2, 
                transition:{
                    duration:duration, 
                    delay:delay
                } 
            }}
        >
            {children}
        </motion.div>
    )
}

