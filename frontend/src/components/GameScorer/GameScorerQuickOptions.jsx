import { RiCloseCircleLine } from "react-icons/ri"
export default function GameScorerQuickOptions(props) {
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-3/4 h-3/4 self-center justify-self-center rounded">
                <div className="h-[10%]">
                    <button className="absolute end-4 hover:text-gray-600 text-gray-500" onClick={() => props.close()}><RiCloseCircleLine size={30} /></button>
                </div>
                <div className="flex-1 grid grid-cols-3 overflow-y-auto gap-y-4 gap-x-4 text-white text-2xl font-semibold py-4 px-4 z-10">
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 6-3`, true, [3], [6]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>6-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 5-3`, true, [3], [5]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>5-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 4-3`, true, [3], [4]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>4-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 1-3`, true, [3], [1]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>1-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 2-3`, true, [3], [2]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>2-3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 3-1`, true, [1], [3]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>3-1</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("groundout", `Groundout 3`, true, [3]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>U3</div><div>Groundout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("flyout", `Flyout LF`, true, [7]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>F7</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("flyout", `Flyout CF`, true, [8]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>F8</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => {
                            props.addSituation("flyout", `Flyout RF`, true, [9]);
                            props.incrementOuts();
                            props.moveRunners(0);
                            props.clearCount();
                            props.nextBatter();
                        }}><div>F9</div><div>Flyout</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"><div>6-4-3</div><div>GDP</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"><div>4-6-3</div><div>GDP</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105"><div>5-4-3</div><div>GDP</div></div>
                </div>
            </div>
        </div>
    );
}