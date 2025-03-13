
import useCountdown from "../hooks/useCountdown"
import { useGameContext } from "../store/endgame-context-provider"

export default function GameInfo(){

    const { attemptsLeft, isPlaying, wrongGuessCount, difficulty,  gameOver, setGameLost } = useGameContext()

    const {timer} = useCountdown(difficulty, gameOver, isPlaying)

    setGameLost(prevGameLost => prevGameLost || timer === 0)

    return <><p className="text-white text-xl text-center ">{attemptsLeft - wrongGuessCount} tries left</p>
              <p className="text-center text-xl text-white font-bold animate-top">Seconds left: {timer}</p></>

}