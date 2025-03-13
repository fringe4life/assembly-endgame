import { useEffect, useRef, useState } from "react"




const useCountdown = (endTime: number, gameOver: boolean, isPlaying: boolean) => {
    const [timer, setTimer] = useState<number>(endTime);

    const timerRef = useRef<number | null>(null)

    if(timer === 0 || gameOver  ) {
        timerRef.current && clearTimeout(timerRef.current);
    }

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