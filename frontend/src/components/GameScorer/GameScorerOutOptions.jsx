import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
export default function GameScorerOutOptions(props) {
    const [positions, setPositions] = useState([]);
    const maxAssists = 12;
    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 flex flex-col gap-4 py-2 text-white font-semibold text-4xl bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
            <div className="h-[2%]">
                <button className="absolute end-4 hover:text-gray-600 text-gray-500" onClick={() => props.close()}><RiCloseCircleLine size={30} /></button>
            </div>
            <div className="text-black text-center h-[10%] ">
                {positions.join("-")}
            </div>
            <div className="grid grid-cols-10 gap-y-4 px-6">
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "8") setPositions([...positions, "8"]); }}>CF</button>
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "7") setPositions([...positions, "7"]); }}>LF</button>
                <div className="col-span-6"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "9") setPositions([...positions, "9"]); }}>RF</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "6") setPositions([...positions, "6"]); }}>SS</button>

                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "4") setPositions([...positions, "4"]); }} >2B</button>
                <div className="col-span-2"></div>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "5") setPositions([...positions, "5"]); }}>3B</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "1") setPositions([...positions, "1"]); }}>P</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "3") setPositions([...positions, "3"]); }}>1B</button>
                <div className="col-span-1"></div>
                <button className="mt-4 bg-accent_2 hover:bg-accent_3 rounded text-center p-2 content-center col-span-2 text-xl" onClick={() => { positions.pop(); setPositions([...positions]) }}>Undo</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { if (positions.length < maxAssists && positions[positions.length - 1] != "2") setPositions([...positions, "2"]); }}>C</button>
                <div className="col-span-2"></div>
                <button className={`${positions.length === 0 ? "bg-blue-700 text-gray-400 pointer-events-none" : "bg-blue-500 hover:bg-blue-400"} rounded text-center mt-4 p-2 content-center col-span-2 text-lg`} onClick={() => {
                    if (positions.length !== 0) {
                        if (props.isRunner)
                            props.runnerSituationFunction(positions.join("-"));
                        else
                            props.situationFunction(positions.join("-"));
                    }
                }}>Confirm</button>
            </div>
        </div >
    </div >)
}