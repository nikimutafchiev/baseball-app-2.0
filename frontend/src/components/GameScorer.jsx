import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import GameScorerHitOptions from "./GameScorerHitOptions";
import { useEffect, useState } from "react";
import GameScorerQuickOptions from "./GameScorerQuickOptions";
import GameScorerStrikeoutOptions from "./GameScorerStrikeoutOptions";
import GameScorerOutOptions from "./GameScorerOutOptions";
import GameScorerFlyoutOptions from "./GameScorerFlyoutOptions";
import GameScorerWalkOptions from "./GameScorerWalkOptions";
import GameScorerErrorOptions from "./GameScorerErrorOptions";
import GameScorerDroppedStrikeoutOptions from "./GameScorerDroppedStrikeoutOptions";
import GameScorerMoreOptions from "./GameScorerMoreOptions";
import { Tooltip, Zoom } from "@mui/material";
import GameScorerRunnerOptions from "./GameScorerRunnerOptions";
export default function GameScorer() {


    const [situationOption, setSituationOption] = useState("");
    const clearOption = () => setSituationOption("");
    const [roster, setRoster] = useState([
        { id: 121, battingOrder: 5, uniformNumber: 55, firstName: "Nikolay", lastName: "Mutafchiev", position: "CF" },
        { id: 122, battingOrder: 2, uniformNumber: 12, firstName: "Ivan", lastName: "Petrov", position: "1B" },
        { id: 123, battingOrder: 3, uniformNumber: 34, firstName: "Maria", lastName: "Ivanova", position: "SS" },
        { id: 124, battingOrder: 4, uniformNumber: 7, firstName: "Georgi", lastName: "Dimitrov", position: "RF" },
        { id: 125, battingOrder: 7, uniformNumber: 22, firstName: "Anna", lastName: "Kirilova", position: "2B" },
        { id: 126, battingOrder: 6, uniformNumber: 10, firstName: "Peter", lastName: "Stoyanov", position: "3B" },
        { id: 127, battingOrder: 1, uniformNumber: 3, firstName: "Elena", lastName: "Todorova", position: "LF" },
        { id: 128, battingOrder: 8, uniformNumber: 45, firstName: "Viktor", lastName: "Georgiev", position: "C" },
        { id: 129, battingOrder: 9, uniformNumber: 88, firstName: "Sofia", lastName: "Mladenova", position: "DH" },
        { id: 130, battingOrder: "Flex", uniformNumber: 99, firstName: "Dimitar", lastName: "Kolev", position: "P" },
    ]);
    const positionAbbrevations = {
        pitcher: "P",
        catcher: "C",
        firstBaseman: "1B",
        secondBaseman: "2B",
        thirdBaseman: "3B",
        shortstop: "SS",
        leftFielder: "LF",
        centerFielder: "CF",
        rightFielder: "RF"
    }
    const [inning, setInning] = useState(1);
    const [inningHalf, setInningHalf] = useState("UP");
    const [offense, setOffense] = useState({
        batter: null,
        firstBaseRunner: null,
        secondBaseRunner: null,
        thirdBaseRunner: null
    });
    const [defense, setDefense] = useState(
        {
            pitcher: {

            },
            catcher: {

            },
            firstBaseman: {

            },
            secondBaseman: {

            },
            thirdBaseman: {

            },
            shortstop: {

            },
            leftFielder: {

            },
            centerFielder: {

            },
            rightFielder: {

            }
        }
    )
    const switchTeams = () => {
        const newDefense = {};
        Object.keys(defense).forEach((position) => newDefense[position] = roster.filter((player) => player.position === positionAbbrevations[position])[0]);
        setDefense(newDefense);
        const newOffense = {
            batter: roster.filter((player) => player.battingOrder == 1)[0],
            firstBaseRunner: null,
            secondBaseRunner: null,
            thirdBaseRunner: null
        };
        setOffense(newOffense);
    }
    useEffect((() => switchTeams()), [inningHalf])
    const situationComponents = {
        "Hit": <GameScorerHitOptions close={clearOption} />,
        "Quick": <GameScorerQuickOptions close={clearOption} />,
        "Strikeout": <GameScorerStrikeoutOptions close={clearOption} />,
        "Groundout": <GameScorerOutOptions close={clearOption} />,
        "Flyout": <GameScorerFlyoutOptions close={clearOption} situation="Flyout" situationCode="F" />,
        "Sac flyout": <GameScorerFlyoutOptions close={clearOption} situation="Sacrifice fly" situationCode="SF" />,
        "Linedrive": <GameScorerFlyoutOptions close={clearOption} situation="Linedrive" situationCode="L" />,
        "Foul fly": <GameScorerFlyoutOptions close={clearOption} situation="Foul fly" situationCode="FF" />,
        "Pop fly": <GameScorerFlyoutOptions close={clearOption} situation="Pop fly" situationCode="P" />,
        "Infield fly": <GameScorerFlyoutOptions close={clearOption} situation="Infield fly" situationCode="IF" />,
        "Walk": <GameScorerWalkOptions close={clearOption} />,
        "Dropped 3rd": <GameScorerDroppedStrikeoutOptions close={clearOption} />,
        "Fielder's choice": <GameScorerOutOptions close={clearOption} />,
        "Sac bunt": <GameScorerOutOptions close={clearOption} />,
        "GDP": <GameScorerOutOptions close={clearOption} />,
        "Error": <GameScorerErrorOptions close={clearOption} />,
        "Runner": <GameScorerRunnerOptions close={clearOption} />,
        "More": <GameScorerMoreOptions close={clearOption} changeOption={(newOption) => setSituationOption(newOption)} />
    }
    return (
        <>
            <div className="w-full h-full flex flex-row">
                <div className="w-7/12 h-full flex flex-col bg-white">
                    <div className="h-fit w-full flex flex-row p-2 shadow-md">
                        <div className="w-1/5 flex flex-col bg-gray-100">
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div className="flex flex-row items-center font-semibold  gap-2">
                                    <img src="https://placehold.co/25x25">
                                    </img>
                                    <div>AKA</div>
                                </div>
                                <div className="font-semibold text-lg">
                                    0
                                </div>
                            </div>
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div className="flex flex-row items-center font-semibold gap-2">
                                    <img src="https://placehold.co/25x25">
                                    </img>
                                    <div>BLU</div>
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
                            <div className="w-[12%] bg-blue-400 text-white flex flex-col items-center justify-around font-semibold">
                                <div className=" flex flex-row items-center">
                                    {inning} {inningHalf == "UP" ? <FaCaretUp /> : <FaCaretDown />}
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
                    <div className="flex-1 flex flex-row  items-center justify-center ">
                        <div className="w-[71%]  bg-clip-padding mask-mas grid grid-cols-[repeat(30,minmax(0,1fr))] text-white font-semibold">
                            <div style={{ gridColumn: "span 14/ span 14" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.centerFielder.firstName} {defense.centerFielder.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.centerFielder.uniformNumber}
                                </Tooltip>
                            </div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.leftFielder.firstName} {defense.leftFielder.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.leftFielder.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 22/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.rightFielder.firstName} {defense.rightFielder.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.rightFielder.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.shortstop.firstName} {defense.shortstop.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.shortstop.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div onClick={() => { if (offense.secondBaseRunner) setSituationOption("Runner") }} className={`${offense.secondBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.secondBaseRunner && <Tooltip
                                    title={<div className="text-xs">Nikolay Mutafchiev</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}

                                >
                                    32
                                </Tooltip>
                                }
                            </div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.secondBaseman.firstName} {defense.secondBaseman.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.secondBaseman.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.thirdBaseman.firstName} {defense.thirdBaseman.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.thirdBaseman.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 12/ span 12" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.firstBaseman.firstName} {defense.firstBaseman.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.firstBaseman.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className={`${offense.thirdBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.thirdBaseRunner && <Tooltip
                                    title={<div className="text-xs">Nikolay Mutafchiev</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}
                                >
                                    31
                                </Tooltip>}</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.pitcher.firstName} {defense.pitcher.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.pitcher.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div className={`${offense.secondBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.firstBaseRunner && <Tooltip
                                    title={<div className="text-xs">Nikolay Mutafchiev</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}
                                >
                                    31
                                </Tooltip>}</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>

                            <div style={{ gridColumn: "span 11/ span 11" }}></div>
                            <div className={`${offense.batter ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.batter && <Tooltip
                                    title={<div className="text-xs">{offense.batter.firstName} {offense.batter.lastName}</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}
                                >
                                    {offense.batter.uniformNumber}
                                </Tooltip>}</div>
                            <div style={{ gridColumn: "span 1/ span 1" }}></div>
                            <div className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
                                <Tooltip
                                    title={<div className="text-xs"> {defense.catcher.firstName} {defense.catcher.lastName}</div>}
                                    arrow
                                    placement='top' slots={
                                        {
                                            transition: Zoom,
                                        }}
                                >
                                    {defense.catcher.uniformNumber}
                                </Tooltip>
                            </div>
                            <div style={{ gridColumn: "span 1/ span 1" }}></div>
                            {/* <div className="bg-accent_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md"><Tooltip
                                title={<div className="text-xs">Nikolay Mutafchiev</div>}
                                arrow
                                placement='top'
                                slots={{
                                    transition: Zoom,
                                }}
                            >
                                31
                            </Tooltip></div> */}
                            <div style={{ gridColumn: "span 11/ span 11" }}></div>

                        </div>
                    </div>


                </div>
                <div className="border-l-[1.5px] border-black w-5/12 flex flex-col bg-gray-100">
                    <div className="w-full h-full grid grid-cols-2 grid-rows-9 px-2 py-4 gap-x-1 gap-y-3 text-xl font-semibold text-white">
                        <Link to={"roster"} className="col-span-2 bg-slate-500 hover:bg-slate-400 text-center content-center rounded ">
                            ROSTERS
                        </Link>
                        <button className="bg-blue-500 hover:bg-blue-400 text-center place-content-center rounded col-span-2" onClick={() => setSituationOption("Quick")}>Quick</button>
                        <button className="bg-primary_2 hover:bg-primary_2_hover flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Hit")}><div>H</div><div>Hit</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Groundout")}><div></div><div>Groundout</div></button>
                        <button className="bg-primary_2 hover:bg-primary_2_hover  flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Walk")}><div>BB</div><div>Walk</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Flyout")}><div>F</div><div>Flyout</div></button>
                        <button className="bg-primary_2 hover:bg-primary_2_hover  flex flex-row px-2 justify-between items-center rounded"><div>HBP</div><div>Hit by pitch</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Strikeout")}><div>K</div><div>Strikeout</div></button>
                        <button className="bg-primary_2 hover:bg-primary_2_hover  flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Dropped 3rd")}><div></div><div>Dropped 3rd strike</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Sac flyout")}><div>SF</div><div>Sacrifice fly</div></button>
                        <button className="bg-yellow-500 hover:bg-yellow-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Fielder's choice")}><div>FC</div><div>Fielder's choice</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Linedrive")}><div>L</div><div>Linedrive</div></button>
                        <button className="bg-yellow-500 hover:bg-yellow-400 flex flex-row px-2 justify-between items-center rounded " onClick={() => setSituationOption("Error")}><div>E</div><div>Error</div></button>
                        <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("GDP")}><div></div><div>GDP</div></button>

                        <button className="col-span-2 bg-slate-500 hover:bg-slate-400 text-center place-content-center rounded" onClick={() => setSituationOption("More")}>More...</button>
                        <div className="grid grid-cols-2 gap-x-1">
                            <button className="bg-primary_2 hover:bg-primary_2_hover  py-1 text-center place-content-center rounded text-base">Ball</button>
                            <button className="bg-yellow-500 hover:bg-yellow-400 py-1 text-center place-content-center rounded text-base">Foulball</button>
                        </div>
                        <div className="grid grid-cols-2 gap-x-1">
                            <button className="bg-red-500 hover:bg-red-400 py-1 text-center place-content-center rounded text-base">Called strike</button>
                            <button className="bg-red-500 hover:bg-red-400 py-1 text-center place-content-center rounded text-base">Swinging strike</button>
                        </div>
                    </div>
                </div>
            </div >
            {situationOption !== "" && situationComponents[situationOption]
            }
        </>)
}