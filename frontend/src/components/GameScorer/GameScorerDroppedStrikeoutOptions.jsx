import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerDroppedStrikeoutOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-1/2 self-center justify-self-center rounded">
                <div className="h-[10%] ">
                    <button className="absolute end-4 hover:text-gray-600 text-gray-500" onClick={() => props.close()}><RiCloseCircleLine size={30} /></button>
                </div>
                <div className="h-3/5 grid grid-cols-2 gap-x-8 gap-y-4 text-white text-xl font-semibold mt-10 py-4 px-1">
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction("Strikeout wild pitch"); }}><div>KWP</div><div>Strikeout wild pitch</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction("Strikeout pass ball"); }}><div>KPB</div><div>Strikeout pass ball</div></div>
                </div>
            </div>
        </div>);
}