import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
export default function GameScorerFlyoutOptions(props) {
    const [position, setPosition] = useState("");

    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 flex flex-col gap-4 py-2 text-white font-semibold text-4xl bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
            <div className="h-[2%]">
                <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            </div>
            <div className="text-black flex flex-row justify-center w-full h-[10%] ">
                {position !== "" && <div>{props.situationCode}{position}</div>}
                {position === "" && <div className="text-lg text-gray-700">{props.situation}</div>}
            </div>
            <div className="grid grid-cols-10 gap-y-4 px-6">
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("8"); }}>CF</button>
                <div className="col-span-4"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("7"); }}>LF</button>
                <div className="col-span-6"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("9"); }}>RF</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("6"); }}>SS</button>

                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("4"); }} >2B</button>
                <div className="col-span-2"></div>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("5"); }}>3B</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("1"); }}>P</button>
                <div className="col-span-1"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("3"); }}>1B</button>
                <div className="col-span-1"></div>
                <button className="mt-4 bg-accent_2 hover:bg-accent_3 rounded text-center p-2 content-center col-span-2 text-xl" onClick={() => { setPosition("") }}>Clear</button>
                <div className="col-span-2"></div>
                <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center  p-2 content-center col-span-2" onClick={() => { setPosition("2"); }}>C</button>
                <div className="col-span-2"></div>
                <button className={`${position === "" ? "bg-blue-700 text-gray-400 pointer-events-none" : "bg-blue-500 hover:bg-blue-400"} rounded text-center mt-4 p-2 content-center col-span-2 text-lg`} onClick={() => {
                    if (position !== "") {
                        props.situationFunction(position);
                    }
                }}>Confirm</button>
            </div>
        </div >
    </div >)
}