import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
export default function GameScorerGroundoutOptions(props) {
    const [positions, setPositions] = useState([]);
    const maxAssists = 12;
    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 flex flex-col gap-4 text-white font-semibold text-4xl bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
            <div className="h-[2%]">
                <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            </div>
            <div className="text-black text-center h-[10%] ">
                {positions.join("-")}
            </div>
            <div className="grid grid-cols-10 gap-y-4 px-6">
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "8"]); }}>CF</button>
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "7"]); }}>LF</button>
                <div className="col-span-6"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "9"]); }}>RF</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "6"]); }}>SS</button>

                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "4"]); }} >2B</button>
                <div className="col-span-2"></div>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "5"]); }}>3B</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "1"]); }}>P</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "3"]); }}>1B</button>
                <div className="col-span-1"></div>
                <button className="bg-accent_2 hover:bg-accent_3 rounded text-center p-2 content-center col-span-2 text-xl" onClick={() => { positions.pop(); setPositions([...positions]) }}>Undo</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists) setPositions([...positions, "2"]); }}>C</button>
                <div className="col-span-2"></div>
                <button className="bg-blue-500 hover:bg-blue-400 rounded text-center  p-2 content-center col-span-2 text-lg" onClick={() => { props.close() }}>Confirm</button>
            </div>
        </div >
    </div >)
}