import { useEffect, useMemo, useState } from "react";
import { motion } from 'framer-motion'

const variants = {
  open: { scale:[1, 1.1, 1, 1.05, 1], opacity:1, transition:{ ease: "easeOut", duration: 0.6, repeat: Infinity, repeatDelay:0.4 } },
  closed: { scale:1, opacity:1 },
}

export default function Timer({ timeout, onTimeout, currentIndex }) {
  
  const [remainingTime, setRemainingTime] = useState(timeout)

  const radialValue = remainingTime / ( timeout / 100)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => { clearTimeout(timer)};
  }, [currentIndex]);
  

  useEffect(() => {
    const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 50)
        }, 50)
    
    return () => { 
      clearInterval(interval)
    }
    }, [currentIndex])

    const newSecond = useMemo(() => {
      return remainingTime/1000
    }, [remainingTime/1000])


  return <>
      <motion.div 
        key={currentIndex}
        initial={{scale:0, opacity:0}}
        variants= {variants}
        animate= {newSecond <= 5 ? "open" : "closed"}
        transition={{duration:0.3, delay:0.3}}
        className={"radial-progress " + (newSecond <= 5 && " text-red-300")}
        style={{"--value":radialValue}} 
        role="progressbar">
          {Math.trunc(remainingTime/1000)+1}
      </motion.div>
    </>
}
