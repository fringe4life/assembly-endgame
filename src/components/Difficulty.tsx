import { useGameContext, type DifficultyType } from "../store/endgame-context-provider";
import Button from "./Button";
import clsx from "clsx";


export default function Difficulty(){
    const { difficulty, setDifficulty, isPlaying } = useGameContext()
    /**
     * @abstract handles change in difficulty
     */
    function handleDifficulty(difficulty: DifficultyType){
        setDifficulty(difficulty)
    }
    return (
        <section className="mt-4 max-w-80 mx-auto">
            <h2 className="text-center invisible translate-x-full opacity-0">Difficulty</h2>
            <div className=" flex flex-wrap flex-col items-center xs:flex-row group">
                <Button disabled={isPlaying} onClick={() => handleDifficulty(60)} className={clsx({" group-hover:scale-90 hover:scale-110 bg-green-200  xs:flex-2 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-green-300 bg-green-600 font-semibold":difficulty === 60})}>Easy: 60s</Button>
                <Button disabled={isPlaying} onClick={() => handleDifficulty(45)} className={clsx({" group-hover:scale-90 hover:scale-110 bg-orange-200 xs:flex-3 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-orange-300 bg-orange-600 font-semibold":difficulty === 45})}>Medium: 45s</Button>
                <Button disabled={isPlaying} onClick={() => handleDifficulty(30)} className={clsx({" group-hover:scale-90 hover:scale-110 bg-red-200 xs:flex-2 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-red-300 bg-red-600 font-semibold":difficulty === 30})}>Hard: 30s</Button>
            </div>
        </section>
    )
}