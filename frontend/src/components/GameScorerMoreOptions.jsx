import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerMoreOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col inset-0 px-6 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-3/4 self-center justify-self-center rounded">
                <div className="h-[10%]">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-2 overflow-y-auto gap-y-4 gap-x-2 text-white text-2xl font-semibold py-2 px-1">
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>IF</div><div>Infield fly</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>BK</div><div>Balk</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>CI</div><div>Catcher's interference</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>OBR</div><div>Out by rule</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>INT</div><div>Interference</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>WP</div><div>Wild pitch</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>PB</div><div>Passed ball</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>SAC</div><div>Sacrifice bunt</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>TP</div><div>Triple play</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>FF</div><div>Foul flyout</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>P</div><div>Pop-up</div></div>
                </div>
            </div>
        </div>
    );
}