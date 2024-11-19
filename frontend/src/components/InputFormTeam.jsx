import { RiCloseCircleLine } from "react-icons/ri";
export default function InputFormTeam(props) {
    return (
        <div className="top-10 fixed self-center z-20 w-5/12 p-2 px-4 bg-white rounded border-black border-[1px] drop-shadow-xl">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="py-2 flex flex-col items-center gap-4">
                <div className="w-full flex flex-col gap-4">
                    <div className='flex flex-col self-center gap-4'>
                        <div className='size-[120px] bg-gray-300 rounded'></div>
                        <button className='w-[120px] bg-blue-400 rounded p-3 text-white text-sm font-semibold'>Качи снимка</button>
                    </div>
                </div>
                <button className="bg-primary_2 hover:bg-primary_3 px-2 py-1 w-1/2 text-white text-lg font-semibold rounded" >Потвърди</button>
            </div>
        </div>);
}