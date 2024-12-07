import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerWalkOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-1/2 self-center justify-self-center rounded">
                <div className="h-[10%] ">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="h-1/2 grid grid-cols-2 gap-x-8  text-white text-xl font-semibold mt-10 py-4 px-1">
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>BB</div><div>Walk</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>IBB</div><div>Intentional walk</div></div>
                </div>
            </div>
        </div>);
}