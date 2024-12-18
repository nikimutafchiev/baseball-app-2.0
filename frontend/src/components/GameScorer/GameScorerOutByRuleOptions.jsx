import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerOutByRuleOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-3/4 self-center justify-self-center rounded">
                <div className="h-[10%] ">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-4 overflow-y-auto text-white text-xl font-semibold  py-4 px-4">
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 1</div><div className="text-3xs">Illegally batted ball</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 2</div><div className="text-3xs">Foulball bunt 3rd strike</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 3</div><div className="text-3xs">Touched by own batted ball</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 4</div><div className="text-3xs">Interfering with catcher</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 5</div><div className="text-3xs">Batting out of order</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 6</div><div className="text-3xs">Refusing to touch first base</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 7</div><div className="text-3xs">Refusing to force advance to home plate</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 8</div><div className="text-3xs">Not caught infield fly</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 9</div><div className="text-3xs">Touched by fair ball</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 10</div><div className="text-3xs">Runner out of base line</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 11</div><div className="text-3xs">Runner passing another runner</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 12</div><div className="text-3xs">Running the bases in reverse order</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 13</div><div className="text-3xs">Interference with fielder</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR 14</div><div className="text-3xs">Interference by preceding runner</div></div>

                </div>
            </div>
        </div>
    )
}