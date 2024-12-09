import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerRunnerOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-3/4 h-4/5 self-center justify-self-center rounded">
                <div className="h-[10%] ">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-3 overflow-y-auto gap-y-4 gap-x-2 text-white text-2xl font-semibold py-4 px-1">
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Advanced by batter</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>T</div><div>On the throw</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>SB</div><div>Stolen base</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Ball out of play</div></div>

                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>PB</div><div>Passed ball</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>WP</div><div>Wild pitch</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>E</div><div>Error</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Extra base error</div></div>

                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>O/2</div><div>Defensive indifference</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Tagged out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Force out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>CS</div><div>Caught stealing</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>PK</div><div>Pick off</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>INT</div><div>Runner interference</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>OB</div><div>Obstruction</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>OBR</div><div>Out by rule</div></div>

                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-center items-center cursor-pointer col-span-2"><div>Pinch runner</div></div>

                </div>
            </div>
        </div>
    )
}