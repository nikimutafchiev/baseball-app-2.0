import RosterCell from "./RosterCell";
import RosterPitcherCell from "./RosterPitcherCell";
import { useState } from "react";
export default function Roster(props) {
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
    const [takenPositions, setTakenPositions] = useState(roster.map((player) => player.position));
    const [takenPlayers, setTakenPlayers] = useState(roster.map((player) => player.id));
    const pitcher = roster.filter((player) => player.position === "P")[0];

    return (
        < div className="w-[36%] bg-white flex flex-col gap-2 rounded-xl shadow-xl p-6" >
            <div className="text-center font-semibold text-xl">
                {props.team.tlc}
            </div>
            {
                roster.filter((player) => player.battingOrder !== "Flex").sort((a, b) => a.battingOrder - b.battingOrder).map((player, index) => <div className="flex flex-row items-center bg-primary_2 hover:bg-primary_2_hover cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                    <div className="w-1/12 text-center font-semibold bg-primary_1 p-1">
                        {index + 1}
                    </div>
                    <RosterCell team={props.team} tournament={props.tournament} player={player}
                        setPosition={(oldValue, newValue) => {
                            let updatedTakenPositions = takenPositions;
                            //асинхронен проблем с useState
                            if (oldValue !== "--") {
                                updatedTakenPositions = takenPositions.filter((value) => value != oldValue);
                                setTakenPositions(updatedTakenPositions);
                            }
                            if (newValue !== "--")
                                setTakenPositions([...updatedTakenPositions, newValue]);
                        }}
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
                        } takenPositions={takenPositions} takenPlayers={takenPlayers} />

                </div>
                )}

            {pitcher && <div className="flex flex-row mt-4 items-center bg-primary_2 hover:bg-primary_2_hover cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                <div className="w-1/12 text-center font-semibold bg-primary_1 p-1">
                    P
                </div>
                <RosterPitcherCell player={pitcher}
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
                    }
                    takenPlayers={takenPlayers}
                />
            </div>}

        </div >
    )
}