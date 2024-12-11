import { FaCaretUp, FaCaretDown } from "react-icons/fa";
export default function GameScorerPlayByPlay(props) {
    return (
        <div className="h-full overflow-y-auto flex flex-col gap-2 px-4 py-2">
            {props.situations.length == 0 && <div className="text-2xl text-center font-semibold">No situations yet.</div>}
            {props.situations.map((situation) =>
                <div className={`flex flex-row border-2 min-h-[70px] max-h-[90px] justify-between items-center border-gray-300 rounded p-3 ${situation.runs ? "bg-green-100" : "bg-white"} drop-shadow-sm text-xs font-semibold `}>
                    <div className="flex flex-col w-4/5 gap-2">
                        <div className="flex flex-row gap-6">
                            {situation.batter && <div>
                                Batter: #{situation.batter.uniformNumber} {situation.batter.lastName}
                            </div>
                            }
                        </div>
                        <div className="text-2xs flex flex-row flex-wrap gap-1">
                            {situation.runners.map((runner) => <div>#{runner.player.uniformNumber} {runner.player.lastName} {runner.situation} {runner.finalBase}</div>)}
                        </div>
                    </div>
                    <div className="flex flex-col w-1/5 gap-2">
                        <div className="flex flex-row justify-center">
                            {situation.inning} {situation.inningHalf == "UP" ? <FaCaretUp className="text-green-500" size={15} /> : <FaCaretDown className="text-red-500" size={15} />}
                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                Runs: {situation.runs}
                            </div>
                            <div>
                                Outs: {situation.outs}
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>)
}