import { RiCloseCircleLine } from "react-icons/ri"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
export default function GameScorerRunnerOptions(props) {
    const [basePosition, setBasePosition] = useState(props.runner.basePosition);
    useEffect((() => setBasePosition(props.runner.basePosition)), [props.runner]);
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0 px-6 py-2 overflow-y-hidden text-white font-semibold bg-white w-3/4 h-4/5 self-center justify-self-center rounded">
                <div className="h-[15%]">
                    <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
                    {props.runner && <>
                        {
                            props.runner.player && <div className="text-black text-center">
                                What happened to #{props.runner.player.uniformNumber} {props.runner.player.lastName}
                            </div>
                        }
                        < div className="justify-self-center">
                            <ToggleButtonGroup
                                exclusive
                                value={basePosition}
                                onChange={(e, newValue) => {
                                    setBasePosition(newValue);
                                }}
                            >
                                <ToggleButton value="1B" disabled={props.runner.basePosition == "2B" || props.runner.basePosition == "3B" || props.runner.basePosition == "Home"}>First</ToggleButton>
                                <ToggleButton value="2B" disabled={props.runner.basePosition == "3B" || props.runner.basePosition == "Home"}>Second</ToggleButton>
                                <ToggleButton value="3B" disabled={props.runner.basePosition == "Home"}>Third</ToggleButton>
                                <ToggleButton value="Home">Home</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </>
                    }
                </div>
                <div className="flex-1 grid grid-cols-3 overflow-y-auto gap-y-2 gap-x-2 text-white text-2xl font-semibold py-4 px-1">
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "advances", props.runner.basePosition, basePosition); props.close() }}><div></div><div>Advanced by batter</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "on the throw", basePosition); props.close() }}><div>T</div><div>On the throw</div></div>

                    <div className="bg-gray-500 hover:bg-gray-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "", props.runner.basePosition, props.runner.basePosition); props.close() }}><div></div><div>Stays on base</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "SB", props.runner.basePosition, basePosition); props.close() }}><div>SB</div><div>Stolen base</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "on ball out of play", props.runner.basePosition, basePosition); props.close() }}><div></div><div>Ball out of play</div></div>

                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "PB", props.runner.basePosition, basePosition); props.close() }}><div>PB</div><div>Passed ball</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer" onClick={() => { props.situationFunction(props.runner.player, "WP", props.runner.basePosition, basePosition); props.close() }}><div>WP</div><div>Wild pitch</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>E</div><div>Error</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Extra base error</div></div>

                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>O/2</div><div>Defensive indifference</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Tagged out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div></div><div>Force out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>CS</div><div>Caught stealing</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>PK</div><div>Pick off</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer text-lg"><div>INT</div><div>Runner interference</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>OB</div><div>Obstruction</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 rounded flex flex-row justify-between items-center cursor-pointer"><div>OBR</div><div>Out by rule</div></div>

                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 rounded flex flex-row justify-center items-center cursor-pointer "><div>Pinch runner</div></div>

                </div>
            </div>
        </div >
    )
}