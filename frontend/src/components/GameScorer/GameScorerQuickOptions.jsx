import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerQuickOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-3/4 h-3/4 self-center justify-self-center rounded">
                <div className="h-[10%]">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-3 overflow-y-auto gap-y-4 gap-x-2 text-white text-2xl font-semibold py-4 px-1">     <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>6-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>5-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>4-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>1-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>2-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>3-1</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>U3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>F7</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>F8</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>F9</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>6-4-3</div><div>GDP</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>4-6-3</div><div>GDP</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>5-4-3</div><div>GDP</div></div>
                </div>
            </div>
        </div>
    );
}