import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerStrikeoutOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-1/2 self-center justify-self-center rounded">
                <div className="h-[10%] ">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4 text-white text-xl font-semibold  py-4 px-1">
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>KS</div><div>Strikeout swinging</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>KL</div><div>Strikeout looking</div></div>
                    <div className="col-span-2 flex flex-row justify-center items-center">
                        <div className="w-1/2 h-full bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>K</div><div>Dropped 3rd strike</div></div>
                    </div>
                </div>
            </div>
        </div>);
}