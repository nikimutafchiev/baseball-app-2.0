import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerHitOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-3/5 self-center justify-self-center rounded">
                <div className="h-[10%]">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-2 text-white text-2xl font-semibold py-8">
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(1); props.close() }}><div>1B</div><div>Single</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(2); props.close() }}><div>2B</div><div>Double</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(3); props.close() }}><div>3B</div><div>Triple</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(4); props.close() }}><div>HR</div><div>Homerun</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg" onClick={() => { props.situationFunction(4); props.close() }}><div>IHR</div><div>Inside the park homerun</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(1); props.close() }}><div>B</div><div>Bunt</div></div>
                </div>
            </div>
        </div>)
}