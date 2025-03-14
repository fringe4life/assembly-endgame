
import useCountdown from "../hooks/useCountdown"
import { useGameContext } from "../store/endgame-context-provider"

export default function GameInfo(){

    const { attemptsLeft,   wrongGuessCount} = useGameContext()

    const {timer} = useCountdown();
    return (
        <>
            <p className="text-white text-xl text-center ">{attemptsLeft - wrongGuessCount} tries left</p>
            <p className="text-center text-xl text-white font-bold animate-top">Seconds left: {timer}</p>
        </>
        )

}