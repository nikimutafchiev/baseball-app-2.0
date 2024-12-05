import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import GameScorerHitOptions from "./GameScorerHitOptions";
import { useState } from "react";
import GameScorerQuickOptions from "./GameScorerQuickOptions";
import GameScorerStrikeoutOptions from "./GameScorerStrikeoutOptions";
import GameScorerGroundoutOptions from "./GameScorerGroundoutOptions";
import GameScorerFlyoutOptions from "./GameScorerFlyoutOptions";
export default function GameScorer() {


    const [situationOption, setSituationOption] = useState("");
    const clearOption = () => setSituationOption("");
    const situationComponents = {
        "Hit": <GameScorerHitOptions close={clearOption} />,
        "Quick": <GameScorerQuickOptions close={clearOption} />,
        "Strikeout": <GameScorerStrikeoutOptions close={clearOption} />,
        "Groundout": <GameScorerGroundoutOptions close={clearOption} />,
        "Flyout": <GameScorerFlyoutOptions close={clearOption} />
    }
    return (
        <>
            <div className="w-full h-full flex flex-row">
                <div className="w-7/12 h-full flex flex-col bg-white">
                    <div className="h-fit w-full flex flex-row p-2 shadow-md">
                        <div className="w-1/5 flex flex-col bg-gray-100">
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div className="flex flex-row items-center font-semibold text-sm gap-2">
                                    <img src="https://placehold.co/25x25">
                                    </img>
                                    <div>Team 1</div>
                                </div>
                                <div className="font-semibold text-lg">
                                    0
                                </div>
                            </div>
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div className="flex flex-row items-center font-semibold text-sm gap-2">
                                    <img src="https://placehold.co/25x25">
                                    </img>
                                    <div>Team 2</div>
                                </div>
                                <div className="font-semibold text-lg">
                                    0
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 flex flex-col w-1/4 text-sm font-semibold">
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div>
                                    Chernozemsky
                                </div>
                                <div>
                                    P: 14
                                </div>
                            </div>
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div>
                                    4.Ivanov
                                </div>
                                <div>
                                    1 for 3
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 h-full flex flex-row">
                            <div className="relative bg-gray-400 w-1/5 flex flex-row  items-center justify-center">
                                <div className="bg-yellow-400 size-4 rotate-45 items-center justify-center">
                                </div>
                                <div className="border-yellow-400 size-4 rotate-45 border-2 mb-8 flex items-center justify-center">
                                </div>
                                <div className="bg-yellow-400 size-4  flex rotate-45 items-center justify-center">
                                </div>

                            </div>
                            <div className="w-[10%] bg-blue-400 text-white flex flex-col items-center justify-around font-semibold">
                                <div className=" flex flex-row">
                                    9<FaCaretUp />
                                </div>
                                <div className="flex flex-row">
                                    1-2
                                </div>
                            </div>
                            <div className="flex flex-1 px-2">
                                <table className="w-full table-auto  text-xs">
                                    <thead className="border-b-[1px] border-gray-500">
                                        <tr>
                                            {["Team", 1, 2, 3, 4, 5, 6, 7, 8, 9, "R", "H", "E"].map((value) => <th className="p-1 font-bold">{value}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {["Team 1", 0, 1, 3, 0, 1, 2, 0, 1, 2, 11, 13, 2].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                                        </tr>
                                        <tr>
                                            {["Team 2", 0, 1, 3, 0, 1, 2, 0, 1, "X", 11, 13, 2].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row  items-center justify-center bg-primary_3">
                        <div className="w-[71%]  bg-clip-padding mask-mas grid grid-cols-[repeat(30,minmax(0,1fr))] text-white font-semibold">
                            <div style={{ gridColumn: "span 14/ span 14" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">34</div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">17</div>
                            <div style={{ gridColumn: "span 22/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div className="bg-accent_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 12/ span 12" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className="bg-accent_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className="bg-accent_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>

                            <div style={{ gridColumn: "span 11/ span 11" }}></div>
                            <div className="bg-accent_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 1/ span 1" }}></div>
                            <div className="mt-4 bg-primary_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 1/ span 1" }}></div>
                            <div className="bg-accent_1 col-span-2 size-10 content-center text-center rounded drop-shadow-md">21</div>
                            <div style={{ gridColumn: "span 11/ span 11" }}></div>

                        </div>
                    </div>

                    {/* <div className="w-full grid grid-cols-3 self-center text-white font-semibold text-lg">
                    <button className="text-center bg-slate-400 py-2">Ball</button>
                    <button className="text-center bg-slate-400 py-2">Foulball</button>
                    <button className="text-center bg-slate-400 py-2">Strike</button>
                </div> */}
                </div>
                <div className="border-l-[1.5px] border-black w-5/12 flex flex-col bg-gray-100">
                    <div className="w-full h-full grid grid-cols-2 grid-rows-9 px-2 py-4 gap-x-1 gap-y-3 text-xl font-semibold text-white">
                        <Link to={"roster"} className="col-span-2 bg-slate-500 hover:bg-slate-400 text-center content-center rounded ">
                            ROSTERS
                        </Link>
                        <button className="bg-blue-500 hover:bg-blue-400 text-center place-content-center rounded col-span-2" onClick={() => setSituationOption("Quick")}>Quick</button>
                        <button className="bg-green-500 hover:bg-green-400 text-center place-content-center rounded" onClick={() => setSituationOption("Hit")}>Hit</button>
                        <button className="bg-red-500 hover:bg-red-400 text-center place-content-center rounded" onClick={() => setSituationOption("Groundout")}>Groundout</button>
                        <button className="bg-green-500 hover:bg-green-400 text-center place-content-center rounded">Walk</button>
                        <button className="bg-red-500 hover:bg-red-400 text-center place-content-center rounded" onClick={() => setSituationOption("Flyout")}>Flyout</button>
                        <button className="bg-green-500 hover:bg-green-400 text-center place-content-center rounded">Intentional walk</button>
                        <button className="bg-red-500 hover:bg-red-400 text-center place-content-center rounded" onClick={() => setSituationOption("Strikeout")}>Strikeout</button>
                        <button className="bg-green-500 hover:bg-green-400 text-center place-content-center rounded">Hit by pitch</button>
                        <button className="bg-red-500 hover:bg-red-400 text-center place-content-center rounded">Sacrifice fly</button>
                        <button className="bg-green-500 hover:bg-green-400 text-center place-content-center rounded">Dropped 3rd strike</button>
                        <button className="bg-red-500 hover:bg-red-400 text-center place-content-center rounded">GDP</button>
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-center place-content-center rounded">Fielder's choice</button>
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-center place-content-center rounded">Error</button>
                        <button className="col-span-2 bg-slate-600 hover:bg-slate-500 text-center place-content-center rounded">More...</button>
                    </div>
                </div>
            </div >
            {situationOption !== "" && situationComponents[situationOption]}
        </>)
}