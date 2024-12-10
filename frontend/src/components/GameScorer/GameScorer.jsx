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
import { FiSettings } from "react-icons/fi";
import FieldCell from "./FieldCell";
import { GoDotFill } from "react-icons/go";
import GameScorerPlayByPlay from "./GameScorerPlayByPlay";
import GameScorerSettings from "./GameScorerSettings";

export default function GameScorer() {
    const [situationOption, setSituationOption] = useState("");
    const [points, setPoints] = useState({
        home: Array(9).fill("X"), away: Array(9).fill("X")
    });
    const [menuOption, setMenuOption] = useState(0);
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
    const [ballCount, setBallCount] = useState(0);
    const [strikeCount, setStrikeCount] = useState(0);
    const [homePoints, setHomePoints] = useState(0);
    const [awayPoints, setAwayPoints] = useState(0);
    const [batterTurn, setBatterTurn] = useState(1);
    const [outs, setOuts] = useState(0);
    const [situations, setSituations] = useState([]);
    const nextBatter = () => { setBatterTurn(batterTurn >= 9 ? 1 : batterTurn + 1) };

    const positionTextToAbbreviations = {
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
    const positionAbbrevationsToValues = {
        "P": 1,
        "C": 2,
        "1B": 3,
        "2B": 4,
        "3B": 5,
        "SS": 6,
        "LF": 7,
        "CF": 8,
        "RF": 9
    }
    const positionValuesToAbbrevations = {
        "1": "P",
        "2": "C",
        "3": "1B",
        "4": "2B",
        "5": "3B",
        "6": "SS",
        "7": "LF",
        "8": "CF",
        "9": "RF"
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
    const [takenPlayers, setTakenPlayers] = useState(roster.map((player) => player.id));

    const clearCount = () => {
        setStrikeCount(0);
        setBallCount(0);
    }
    const incrementOuts = () => {
        if (outs + 1 == 3) {
            setOuts(0);
            if (inningHalf == "DOWN")
                setInning(inning + 1);
            setInningHalf(inningHalf == "UP" ? "DOWN" : "UP");
        }
        else
            setOuts(outs + 1);
    }
    const addSituation = (outs, type) => {
        setSituations([{ batter: offense.batter, inning: inning, inningHalf: inningHalf, outs: outs, situation: type, runs: 1 }, ...situations]);
    }
    const [runnerWindowCount, setRunnerWindowCount] = useState(0);
    const [runnersToMove, setRunnersToMove] = useState([]);
    const moveRunners = (bases) => {
        const situationPoints = getScoringRunners(bases).length;
        // if (inningHalf == "UP") {
        //     const newPoints = points.away;
        //     newPoints[inning - 1] = points.away[inning - 1] + situationPoints;
        //     setAwayPoints(awayPoints + situationPoints); setPoints({ home: points.home, away: newPoints })
        // } else {
        //     const newPoints = points.home;
        //     newPoints[inning - 1] = points.home[inning - 1] + situationPoints;
        //     setHomePoints(homePoints + situationPoints);
        //     setPoints({ home: newPoints, away: points.away })
        // }
        if (bases != 0) {
            const runnersMove = [getMovedRunner("1B", bases), getMovedRunner("2B", bases), getMovedRunner("3B", bases), ...getScoringRunners(bases),].filter((value) => !!value);
            setRunnersToMove(runnersMove);
            console.log(runnersMove);
            setRunnerWindowCount(runnersMove.length);
            console.log(runnersMove);
            if (runnersMove.length >= 0) {
                setSituationOption("Runner");
            }
            else
                setSituationOption("");
        }
        else {
            setSituationOption("");
        }
        const newOffense = { batter: roster.filter((player) => player.battingOrder == (batterTurn >= 9 ? 1 : batterTurn + 1))[0], firstBaseRunner: getMovedRunner("1B", bases), secondBaseRunner: getMovedRunner("2B", bases), thirdBaseRunner: getMovedRunner("3B", bases) }
        clearCount();

        setOffense(newOffense);
        nextBatter();
    }
    const getScoringRunners = (bases) => {
        const isFirstOccupied = !!offense.firstBaseRunner, isSecondOccupied = !!offense.secondBaseRunner, isThirdOccupied = !!offense.thirdBaseRunner;
        switch (bases) {
            case 1: {
                if (isSecondOccupied && isThirdOccupied && isFirstOccupied)
                    return [offense.thirdBaseRunner];
                return [];
            }
            case 2: {
                if (isThirdOccupied && isSecondOccupied && isFirstOccupied)
                    return [offense.thirdBaseRunner, offense.secondBaseRunner];
                else if (isSecondOccupied && isFirstOccupied)
                    return [offense.secondBaseRunner]
                else if (isThirdOccupied && isSecondOccupied)
                    return [offense.thirdBaseRunner];
                return [];
            }
            case 3: {
                if (isThirdOccupied && isSecondOccupied && isFirstOccupied)
                    return [offense.thirdBaseRunner, offense.secondBaseRunner, offense.firstBaseRunner];
                else if (isThirdOccupied && isSecondOccupied)
                    return [offense.thirdBaseRunner, offense.secondBaseRunner];
                else if (isThirdOccupied && isFirstOccupied)
                    return [offense.thirdBaseRunner, offense.firstBaseRunner];
                else if (isSecondOccupied && isFirstOccupied)
                    return [offense.secondBaseRunner, offense.firstBaseRunner];
                else if (isThirdOccupied)
                    return [offense.thirdBaseRunner];
                else if (isSecondOccupied)
                    return [offense.secondBaseRunner];
                else if (isFirstOccupied)
                    return [offense.firstBaseRunner];
                else return [];

            }
            case 4: {
                return Object.entries(offense).filter(([key, value]) => !!value).map(([key, value]) => value);
            }
            default:
                return [];
        }
    }
    const getMovedRunner = (position, bases) => {
        switch (position) {
            case "1B":
                return bases == 1 ? offense.batter : bases > 1 ? null : offense.firstBaseRunner;
            case "2B":
                return offense.firstBaseRunner && bases == 1 ? offense.firstBaseRunner : bases == 2 ? offense.batter : bases > 2 ? null : offense.secondBaseRunner;
            case "3B": {
                if (offense.firstBaseRunner && offense.secondBaseRunner && bases == 1)
                    return offense.secondBaseRunner
                else if (offense.firstBaseRunner && bases == 2)
                    return offense.firstBaseRunner
                else if (offense.secondBaseRunner && bases == 2)
                    return offense.secondBaseRunner
                else if (bases == 3)
                    return offense.batter
                else if (bases == 4)
                    return null;
                else
                    return offense.thirdBaseRunner;
            }
        }
    };

    const switchTeams = () => {
        if (inningHalf == "UP") {
            const newPoints = points.away;
            newPoints[inning - 1] = 0; setPoints({ home: points.home, away: newPoints })
        } else {
            const newPoints = points.home;
            newPoints[inning - 1] = 0;
            setPoints({ home: newPoints, away: points.away })
        }
        const newDefense = {};
        Object.keys(defense).forEach((position) => newDefense[position] = roster.filter((player) => player.position === positionTextToAbbreviations[position])[0]);
        setDefense(newDefense);
        const newOffense = {
            batter: roster.filter((player) => player.battingOrder == batterTurn)[0],
            firstBaseRunner: null,
            secondBaseRunner: null,
            thirdBaseRunner: null
        };
        setOffense(newOffense);
    }
    useEffect((() => console.log(situationOption)), [situationOption]);
    useEffect((() => switchTeams()), [inningHalf]);

    const situationComponents = {
        "Hit": <GameScorerHitOptions close={clearOption} situationFunction={(bases, hitType) => {
            addSituation(outs, hitType);
            moveRunners(bases);
        }} />,
        "Quick": <GameScorerQuickOptions close={clearOption} incrementOuts={() => incrementOuts()} moveRunners={(bases) => moveRunners(bases)} addSituation={(outsInc, type) => addSituation(outs + outsInc, type)} />,
        "Strikeout": <GameScorerStrikeoutOptions close={clearOption}
            situationFunction={(strikeoutType) => {
                addSituation(outs + 1, strikeoutType);
                moveRunners(0)
                incrementOuts();
            }}
        />,
        "Groundout": <GameScorerOutOptions close={clearOption} situationFunction={(positions) => {
            addSituation(outs + 1, `Groundout ${positions}`);
            incrementOuts();
            moveRunners(0);
        }} />,
        "Flyout": <GameScorerFlyoutOptions close={clearOption} situation="Flyout" situationCode="F" situationFunction={(position) => {
            addSituation(outs + 1, `Flyout ${positionValuesToAbbrevations[position]}`);
            incrementOuts();
            moveRunners(0);
        }} />,
        "Sac flyout": <GameScorerFlyoutOptions close={clearOption} situation="Sacrifice fly" situationCode="SF" situationFunction={(position) => {
            addSituation(outs + 1, `Sacrificise flyout ${positionValuesToAbbrevations[position]}`);
            incrementOuts();
            moveRunners(0);
        }} />,
        "Linedrive": <GameScorerFlyoutOptions close={clearOption} situation="Linedrive" situationCode="L" situationFunction={(position) => {
            addSituation(outs + 1, `Linedrive ${positionValuesToAbbrevations[position]}`)
            incrementOuts();
            moveRunners(0);
        }
        } />,
        "Foul fly": <GameScorerFlyoutOptions close={clearOption} situation="Foul fly" situationCode="FF" situationFunction={(position) => {
            addSituation(outs + 1, `Foul flyout ${positionValuesToAbbrevations[position]}`);
            incrementOuts();
            moveRunners(0);
        }} />,
        "Pop fly": <GameScorerFlyoutOptions close={clearOption} situation="Pop fly" situationCode="P" situationFunction={(position) => {
            addSituation(outs + 1, `Pop flyout${positionValuesToAbbrevations[position]}`)
            incrementOuts();
            moveRunners(0);
        }} />,
        "Infield fly": <GameScorerFlyoutOptions close={clearOption} situation="Infield fly" situationCode="IF" situationFunction={(position) => {
            addSituation(outs + 1, `Infield flyout ${positionValuesToAbbrevations[position]}`)
            incrementOuts();
            moveRunners(0);
        }} />,
        "Walk": <GameScorerWalkOptions close={clearOption} situationFunction={(walkType) => {
            addSituation(outs, walkType);
            moveRunners(1);
        }} />,
        "Dropped 3rd": <GameScorerDroppedStrikeoutOptions close={clearOption} situationFunction={(droppedType) => {
            addSituation(outs, droppedType)
            moveRunners(1);
        }} />,
        "Fielder's choice": <GameScorerOutOptions close={clearOption} />,
        "Sac bunt": <GameScorerOutOptions close={clearOption} />,
        "GDP": <GameScorerOutOptions close={clearOption} />,
        "Error": <GameScorerErrorOptions close={clearOption} />,
        "Runner": <GameScorerRunnerOptions close={() => {
            if (runnerWindowCount > 1)
                setRunnerWindowCount(runnerWindowCount - 1);
            else
                setSituationOption("");
        }} runner={runnersToMove[runnerWindowCount - 1]} />,
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
                                    {awayPoints}
                                </div>
                            </div>
                            <div className="h-1/2 flex flex-row items-center justify-between p-2">
                                <div className="flex flex-row items-center font-semibold gap-2">
                                    <img src="https://placehold.co/25x25">
                                    </img>
                                    <div>BLU</div>
                                </div>
                                <div className="font-semibold text-lg">
                                    {homePoints}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 flex flex-col w-1/4 text-sm font-semibold">
                            {Object.keys(defense.pitcher).length != 0 &&
                                < div className="h-1/2 flex flex-row items-center justify-between p-2">
                                    <div>
                                        {defense.pitcher.lastName}
                                    </div>
                                    <div>
                                        P: 14
                                    </div>
                                </div>
                            }
                            {offense.batter &&
                                <div className="h-1/2 flex flex-row items-center justify-between p-2">

                                    <div>
                                        {offense.batter.battingOrder}. {offense.batter.lastName}
                                    </div>
                                    <div>
                                        1 for 3
                                    </div>
                                </div>}
                        </div>
                        <div className="flex-1 h-full flex flex-row">
                            <div className="relative bg-gray-400 w-1/5 ">
                                <div className="mt-4 flex flex-row  items-center justify-center">
                                    <div className={`${offense.thirdBaseRunner ? "bg-yellow-400" : "border-2 border-yellow-400"} size-4 rotate-45 items-center justify-center`}>
                                    </div>
                                    <div className={`${offense.secondBaseRunner ? "bg-yellow-400" : "border-2 border-yellow-400"} mb-8 size-4 rotate-45 items-center justify-center`}>
                                    </div>
                                    <div className={`${offense.firstBaseRunner ? "bg-yellow-400" : "border-2 border-yellow-400"} size-4 rotate-45 items-center justify-center`}>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center text-yellow-400">
                                    <GoDotFill size={15} className={`${outs > 0 ? "visible" : "invisible"}`} />
                                    <GoDotFill size={15} className={`${outs > 1 ? "visible" : "invisible"}`} />
                                </div>

                            </div>
                            <div className="w-[12%] bg-blue-400 text-white flex flex-col items-center justify-around font-semibold">
                                <div className=" flex flex-row items-center">
                                    {inning} {inningHalf == "UP" ? <FaCaretUp /> : <FaCaretDown />}
                                </div>
                                <div className="flex flex-row">
                                    {ballCount}-{strikeCount}
                                </div>
                            </div>
                            <div className="flex flex-1 px-2">
                                <table className="w-full table-auto  text-xs">
                                    <thead className="border-b-[1px] border-gray-500">
                                        <tr>
                                            {["Team", 1, 2, 3, 4, 5, 6, 7, 8, 9, "R", "H", "E", "LOB"].map((value) => <th className="p-1 font-bold">{value}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {["AKA", ...points.away, awayPoints, 13, 2, 1].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                                        </tr>
                                        <tr>
                                            {["BLU", ...points.home, homePoints, 13, 2, 1].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row  items-center justify-center ">
                        <div className="w-[71%]  grid grid-cols-[repeat(30,minmax(0,1fr))] text-white font-semibold">
                            <div style={{ gridColumn: "span 14/ span 14" }}></div>
                            <FieldCell player={defense.centerFielder} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <FieldCell player={defense.leftFielder} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 22/ span 2" }}></div>
                            <FieldCell player={defense.rightFielder} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>
                            <FieldCell player={defense.shortstop} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <div onClick={() => { if (offense.secondBaseRunner) setSituationOption("Runner") }} className={`${offense.secondBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.secondBaseRunner && <Tooltip
                                    title={<div className="text-xs">{offense.secondBaseRunner.firstName} {offense.secondBaseRunner.lastName}</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}

                                >
                                    {offense.secondBaseRunner.uniformNumber}
                                </Tooltip>
                                }
                            </div>
                            <div style={{ gridColumn: "span 2/ span 2" }}></div>
                            <FieldCell player={defense.secondBaseman} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 10/ span 10" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>
                            <FieldCell player={defense.thirdBaseman} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 12/ span 12" }}></div>
                            <FieldCell player={defense.firstBaseman} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 7/ span 7" }}></div>

                            <div className="size-4" style={{ gridColumn: "span 30/ span 30" }}></div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div onClick={() => {
                                if (offense.thirdBaseRunner)
                                    setSituationOption("Runner")
                            }} className={`${offense.thirdBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.thirdBaseRunner && <Tooltip
                                    title={<div className="text-xs">{offense.thirdBaseRunner.firstName} {offense.thirdBaseRunner.lastName}</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}
                                >
                                    {offense.thirdBaseRunner.uniformNumber}
                                </Tooltip>}</div>
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <FieldCell player={defense.pitcher} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
                            <div style={{ gridColumn: "span 6/ span 6" }}></div>
                            <div onClick={() => { if (offense.firstBaseRunner) setSituationOption("Runner") }} className={`${offense.firstBaseRunner ? "bg-accent_1" : "border-4 border-accent_1"} col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md`}>
                                {offense.firstBaseRunner && <Tooltip
                                    title={<div className="text-xs">{offense.firstBaseRunner.firstName} {offense.firstBaseRunner.lastName}</div>}
                                    arrow
                                    placement='top'
                                    slots={{
                                        transition: Zoom,
                                    }}
                                >
                                    {offense.firstBaseRunner.uniformNumber}
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
                            <FieldCell player={defense.catcher} takenPlayers={takenPlayers}
                                setPlayer={(oldValue, newValue) => {
                                    let updatedTakenPlayers = takenPlayers;
                                    //асинхронен проблем с useState
                                    if (oldValue !== -1) {
                                        updatedTakenPlayers = takenPlayers.filter((value) => value != oldValue);
                                        setTakenPlayers(updatedTakenPlayers);
                                    }
                                    if (newValue !== -1)
                                        setTakenPlayers([...updatedTakenPlayers, newValue]);
                                }
                                } />
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
                <div className="border-l-[1.5px] border-black w-5/12 flex flex-col  bg-gray-100">
                    <div className="flex flex-row justify-between gap-2 text-white font-semibold text-xl mx-2 my-2 ">
                        <Link to={"roster"} className="w-2/5 bg-cyan-600 hover:bg-cyan-500 text-center content-center rounded  py-1">
                            ROSTERS
                        </Link>
                        <button className="w-2/5 bg-cyan-600 hover:bg-cyan-500 text-center content-center rounded py-1" onClick={() => setMenuOption(menuOption == 0 ? 1 : 0)}>
                            {!menuOption ? "PLAY BY PLAY" : "SCORE MENU"}
                        </button>
                        <button className=" bg-cyan-600 hover:bg-cyan-500  text-center content-center rounded  p-2" onClick={() => setMenuOption(2)}>
                            <FiSettings size={20} />
                        </button>
                    </div>
                    {menuOption == 0 && <>
                        <div className="flex flex-row border-2 min-h-[70px] max-h-[90px] justify-between items-center border-gray-300 rounded mx-2 p-3 bg-white drop-shadow-sm text-xs font-semibold ">
                            {situations[0] && <> <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-6 ">
                                    <div>
                                        Situation: {situations[0].situation}
                                    </div>
                                    {situations[0].batter && <div>
                                        Batter: #{situations[0].batter.uniformNumber} {situations[0].batter.lastName}
                                    </div>
                                    }
                                </div>
                                <div className="text-2xs">
                                    #21 Zhelev advances to third
                                </div>
                            </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row justify-center">
                                        {situations[0].inning} {situations[0].inningHalf == "UP" ? <FaCaretUp className="text-green-500" size={15} /> : <FaCaretDown className="text-red-500" size={15} />}
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <div>
                                            Runs: 1
                                        </div>
                                        <div>
                                            Outs: {situations[0].outs}
                                        </div>
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                        <div className="w-full h-full grid grid-cols-2 grid-rows-8 px-2 py-4 gap-x-1 gap-y-3 text-xl font-semibold text-white">
                            <button className="bg-primary_2 hover:bg-primary_2_hover flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Hit")}><div>H</div><div>Hit</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Groundout")}><div></div><div>Groundout</div></button>
                            <button className="bg-primary_2 hover:bg-primary_2_hover  flex flex-row px-2 justify-between items-center rounded"
                                onClick={() => {
                                    setSituationOption("Walk")
                                }}
                            ><div>BB</div><div>Walk</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Flyout")}><div>F</div><div>Flyout</div></button>
                            <button className="bg-primary_2 hover:bg-primary_2_hover  flex flex-row px-2 justify-between items-center rounded" onClick={() => {
                                addSituation(outs, "Hit by pitch");
                                moveRunners(1);
                            }}><div>HBP</div><div>Hit by pitch</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Strikeout")}><div>K</div><div>Strikeout</div></button>
                            <button className={`${!offense.firstBaseRunner || (!!offense.firstBaseRunner && outs == 2) ? "bg-primary_2 hover:bg-primary_2_hover" : "bg-primary_1 text-gray-400 pointer-events-none"}  flex flex-row px-2 justify-between items-center rounded`} onClick={() => setSituationOption("Dropped 3rd")}><div></div><div>Dropped 3rd strike</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Sac flyout")}><div>SF</div><div>Sacrifice fly</div></button>
                            <button className="bg-yellow-500 hover:bg-yellow-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Fielder's choice")}><div>FC</div><div>Fielder's choice</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("Linedrive")}><div>L</div><div>Linedrive</div></button>
                            <button className="bg-yellow-500 hover:bg-yellow-400 flex flex-row px-2 justify-between items-center rounded " onClick={() => setSituationOption("Error")}><div>E</div><div>Error</div></button>
                            <button className="bg-red-500 hover:bg-red-400 flex flex-row px-2 justify-between items-center rounded" onClick={() => setSituationOption("GDP")}><div></div><div>GDP</div></button>
                            <button className="bg-blue-500 hover:bg-blue-400 text-center place-content-center rounded" onClick={() => setSituationOption("Quick")}>Quick</button>

                            <button className="bg-slate-500 hover:bg-slate-400 text-center place-content-center rounded" onClick={() => setSituationOption("More")}>More...</button>
                            <div className="grid grid-cols-2 gap-x-1">
                                <button className="bg-primary_2 hover:bg-primary_2_hover  py-1 text-center place-content-center rounded text-base" onClick={() => {
                                    if (ballCount == 3) {
                                        addSituation(outs, "Walk");
                                        moveRunners(1);
                                    }
                                    else
                                        setBallCount(ballCount + 1)
                                }}>Ball</button>
                                <button className="bg-yellow-500 hover:bg-yellow-400 py-1 text-center place-content-center rounded text-base" onClick={() => { if (strikeCount < 2) setStrikeCount(strikeCount + 1) }}>Foulball</button>
                            </div>
                            <div className="grid grid-cols-2 gap-x-1">
                                <button className="bg-red-500 hover:bg-red-400 py-1 text-center place-content-center rounded text-base" onClick={() => {
                                    if (strikeCount == 2) {
                                        addSituation(outs, "Strikeout looking");
                                        moveRunners(0);
                                        incrementOuts();
                                    }
                                    else
                                        setStrikeCount(strikeCount + 1)
                                }}>Called strike</button>
                                <button className="bg-red-500 hover:bg-red-400 py-1 text-center place-content-center rounded text-base" onClick={() => {
                                    if (strikeCount == 2) {
                                        addSituation(outs, "Strikeout swinging");
                                        moveRunners(0);
                                        incrementOuts();
                                    }
                                    else
                                        setStrikeCount(strikeCount + 1)
                                }}>Swinging strike</button>
                            </div>
                        </div>
                    </>}
                    {menuOption == 1 && <GameScorerPlayByPlay situations={situations} />}
                    {menuOption == 2 && <GameScorerSettings />}
                </div>
            </div >
            {situationOption !== "" && situationComponents[situationOption]}
        </>)
}