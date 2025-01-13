import { RiCloseCircleLine } from "react-icons/ri"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
import GameScorerErrorOptions from "./GameScorerErrorOptions";
import GameScorerOutOptions from "./GameScorerOutOptions";
export default function GameScorerRunnerOptions(props) {
    const [basePosition, setBasePosition] = useState(props.runner.newBasePosition);
    useEffect((() => setBasePosition(props.runner.newBasePosition)), [props.runner]);
    const [situationOption, setSituationOption] = useState("");
    const runnerOptionsComponents = {
        "Error": <GameScorerErrorOptions runnerSituationFunction={(errorSituation, outs = [], assists = [], errors) => { props.situationFunction(props.runner.player, errorSituation, props.runner.oldBasePosition, basePosition, true, outs, assists, errors); setSituationOption(""); props.close() }}
            isRunner={true} />,
        "Force out": <GameScorerOutOptions runnerSituationFunction={(positions, outs, assists) => { props.situationFunction(props.runner.player, "groundout", `Force out ${positions}`, props.runner.oldBasePosition, null, true, outs, assists); setSituationOption(""); props.incrementOuts(); props.close() }} isRunner={true} />,
        "Tagged out": <GameScorerOutOptions runnerSituationFunction={(positions, outs, assists) => { props.situationFunction(props.runner.player, "groundout", `Tagged out ${positions}`, props.runner.oldBasePosition, null, true, outs, assists); setSituationOption(""); props.incrementOuts(); props.close() }} isRunner={true} />,
        "Caught stealing": <GameScorerOutOptions runnerSituationFunction={(positions, outs, assists) => { props.situationFunction(props.runner.player, "caught stealing", `Caught stealing ${positions}`, props.runner.oldBasePosition, null, true, outs, assists); setSituationOption(""); props.incrementOuts(); props.close() }} isRunner={true} />,
        "Pick off": <GameScorerOutOptions runnerSituationFunction={(positions, outs, assists) => { props.situationFunction(props.runner.player, "", `Pick off ${positions}`, props.runner.oldBasePosition, null, true, outs, assists); setSituationOption(""); props.incrementOuts(); props.close() }} isRunner={true} />
    }
    return (<>
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="fixed z-20 flex flex-col  inset-0  py-2 overflow-y-hidden text-white font-semibold bg-white w-3/4 h-4/5 self-center justify-self-center rounded">
                <div className="h-[15%]">
                    {props.runner && <>
                        {
                            props.runner.player && <div className="text-black text-center">
                                What happened to #{props.runner.player.uniformNumber} {props.runner.player.player.lastName}
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
                                <ToggleButton value="1B" disabled={props.runner.newBasePosition == "2B" || props.runner.newBasePosition == "3B" || props.runner.newBasePosition == "Home"}>First</ToggleButton>
                                <ToggleButton value="2B" disabled={(props.occupiedBases.includes("2B") && props.runner.newBasePosition == "1B") || props.runner.newBasePosition == "3B" || props.runner.newBasePosition == "Home"}>Second</ToggleButton>
                                <ToggleButton value="3B" disabled={(props.occupiedBases.includes("2B") && props.runner.newBasePosition == "1B") || (props.occupiedBases.includes("3B") && (props.runner.newBasePosition == "1B" || props.runner.newBasePosition == "2B")) || props.runner.newBasePosition == "Home"}>Third</ToggleButton>
                                <ToggleButton value="Home" disabled={(props.occupiedBases.includes("2B") && props.runner.newBasePosition == "1B") || (props.occupiedBases.includes("3B") && (props.runner.newBasePosition == "1B" || props.runner.newBasePosition == "2B"))}>Home</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </>
                    }
                </div>
                <div className="flex-1 grid grid-cols-3 overflow-y-auto gap-y-2 gap-x-4 text-white text-2xl font-semibold py-4 px-4 z-10">

                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4  flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "advances", props.runner.oldBasePosition, basePosition); props.close() }}><div></div><div>Advanced by batter</div></div>
                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "", props.runner.oldBasePosition, basePosition); props.close() }}><div></div><div>Stays on base</div></div>

                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4  flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "on the throw", props.runner.oldBasePosition, basePosition); props.close() }}><div>T</div><div>On the throw</div></div>

                    <div className="bg-primary_2 hover:bg-primary_2_hover p-2 px-4  flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "stolen base", "SB", props.runner.oldBasePosition, basePosition); props.close() }}><div>SB</div><div>Stolen base</div></div>

                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "PB", props.runner.oldBasePosition, basePosition); props.close() }}><div>PB</div><div>Passed ball</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "WP", props.runner.oldBasePosition, basePosition); props.close() }}><div>WP</div><div>Wild pitch</div></div>
                    <div className="bg-yellow-500 hover:bg-yellow-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { setSituationOption("Error"); }}><div></div><div>Extra base error</div></div>

                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer text-lg transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "Defensive indifference", props.runner.oldBasePosition, basePosition); props.close() }} ><div>O/2</div><div>Defensive indifference</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { setSituationOption("Tagged out"); }}><div></div><div>Tagged out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { setSituationOption("Force out"); }}><div></div><div>Force out</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { setSituationOption("Caught stealing"); }}><div>CS</div><div>Caught stealing</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { setSituationOption("Pick off"); }}><div>PK</div><div>Pick off</div></div>
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer text-lg transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "Runner interference", props.runner.oldBasePosition, null, true); props.incrementOuts(); props.close() }}><div>INT</div><div>Runner interference</div></div>
                    {/* <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer"><div>OB</div><div>Obstruction</div></div> */}
                    <div className="bg-red-500 hover:bg-red-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg"><div>OBR</div><div>Out by rule</div></div>
                    <div className="bg-slate-500 hover:bg-slate-400 p-2 px-4 flex flex-row justify-between items-center cursor-pointer transform transition-transform hover:scale-105 rounded-lg" onClick={() => { props.situationFunction(props.runner.player, "", "on ball out of play", props.runner.oldBasePosition, basePosition); props.close() }}><div></div><div>Ball out of play</div></div>

                    <div className="col-span-3 bg-slate-500 hover:bg-slate-400 p-2 px-4 flex flex-row justify-center items-center cursor-pointer rounded-lg"><div>Pinch runner</div></div>

                </div>
            </div>
        </div >
        {situationOption !== "" && runnerOptionsComponents[situationOption]}
    </>
    )
}