import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerMoreOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
                <div className="h-[10%]">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                </div>
                <div className="flex-1 grid grid-cols-2 overflow-y-auto gap-y-4 gap-x-2 text-white text-2xl font-semibold py-2 px-1">

                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"
                        onClick={() => {
                            props.addSituation(0, "Catcher's interference");
                            props.moveRunners(1);
                        }}
                    ><div>CI</div><div>Catcher's interference</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"
                        onClick={() => {
                            props.addSituation(0, "Ground rule double");
                            props.moveRunners(2);
                        }}><div>GR</div><div>Ground rule double</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"
                        onClick={() => {
                            if (props.occupiedBases.length == 0) {
                                props.incrementBallCount();
                                props.close();
                            }
                            else {
                                props.addSituation(0, "Balk");
                                props.moveRunners(1, false);
                            }
                        }}>
                        <div>BK</div><div>Balk</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => props.changeOption("Sac bunt")}><div>SAC</div><div>Sacrifice bunt</div></div>
                    <div className={`${props.occupiedBases.includes("1B") && props.occupiedBases.includes("2B") && props.outs < 2 ? "bg-red-500 hover:bg-red-400" : "bg-red-700 text-gray-400 pointer-events-none"} p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer`} onClick={() => props.changeOption("Infield fly")}><div>IF</div><div>Infield fly</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => props.changeOption("Foul fly")}><div>FF</div><div>Foul flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => props.changeOption("Pop fly")}><div>P</div><div>Pop-up</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>GTP</div><div>Triple play</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>OBR</div><div>Out by rule</div></div>


                </div>
            </div>
        </div>
    );
}