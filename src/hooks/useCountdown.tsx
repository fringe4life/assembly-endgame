import { useEffect, useRef, useState } from "react"
import { useGameContext } from "../store/endgame-context-provider";




const useCountdown = () => {

    const {isPlaying, gameOver, difficulty, setGameLost} = useGameContext()
    const [timer, setTimer] = useState<number>(difficulty);

    const timerRef = useRef<number | null>(null)

    if(timer === 0 || gameOver  ) {
        
        
        timerRef.current && clearTimeout(timerRef.current);
    }

    useEffect(() => {
        if(timer === 0){ 
            setGameLost(true )
            console.log("made it into the timer === 0")
        }
    }, [timer,setGameLost])

    

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            if (timer > 0 && !gameOver && isPlaying) {
                setTimer(prevTime => prevTime - 1);
                console.log(timer)
            } 
            else {
                timerRef.current && clearTimeout(timerRef.current)
            }
        }, 1000);
        return () => {
            timerRef.current && clearTimeout(timerRef.current)
        };
    }, [gameOver,  timer, isPlaying])

    function newTimer(time:number){
        if( timerRef.current ) clearTimeout(timerRef.current);
        setTimer(time)
    }

    return {timer, newTimer}
}


export default useCountdown