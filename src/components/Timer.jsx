import { useEffect, useState } from "react";

export default function Timer({ timeout, onTimeout }) {

  const [remainingTime, setRemainingTime] = useState(timeout)
  const radialValue = remainingTime / ( timeout / 100)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => { clearTimeout(timer)};
  }, [timeout, onTimeout]);
  

  useEffect(() => {
    const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 50)
        }, 50)
    
    return () => { clearInterval(interval)}
    }, [])


  return <>
      <div className="radial-progress justify-self-end" style={{"--value":radialValue}} role="progressbar">{Math.trunc(remainingTime/1000)}</div>
    </>
}
