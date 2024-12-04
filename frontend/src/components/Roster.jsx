import RosterCell from "./RosterCell";
import { useState } from "react";
export default function Roster() {
    const players = [
        { battingOrder: 5, uniformNumber: 55, firstName: "Nikolay", lastName: "Mutafchiev", position: "CF" },
        { battingOrder: 2, uniformNumber: 12, firstName: "Ivan", lastName: "Petrov", position: "1B" },
        { battingOrder: 3, uniformNumber: 34, firstName: "Maria", lastName: "Ivanova", position: "SS" },
        { battingOrder: 4, uniformNumber: 7, firstName: "Georgi", lastName: "Dimitrov", position: "RF" },
        { battingOrder: 7, uniformNumber: 22, firstName: "Anna", lastName: "Kirilova", position: "2B" },
        { battingOrder: 6, uniformNumber: 10, firstName: "Peter", lastName: "Stoyanov", position: "3B" },
        { battingOrder: 1, uniformNumber: 3, firstName: "Elena", lastName: "Todorova", position: "LF" },
        { battingOrder: 8, uniformNumber: 45, firstName: "Viktor", lastName: "Georgiev", position: "C" },
        { battingOrder: 9, uniformNumber: 88, firstName: "Sofia", lastName: "Mladenova", position: "DH" },
        { battingOrder: "P", uniformNumber: 99, firstName: "Dimitar", lastName: "Kolev", position: "P" },
    ];
    const pitcher = players.filter((player) => player.position === "P")[0];

    return (
        <div className="bg-gray-200 min-h-[90vh] flex flex-row justify-around p-2 ">
            < div className="w-[36%] bg-white flex flex-col gap-4 rounded-xl shadow-xl p-6" >
                <div className="text-center font-semibold text-xl">
                    HOME
                </div>
                {
                    players.filter((player) => player.battingOrder !== "").sort((a, b) => a.battingOrder - b.battingOrder).map((player, index) => <div className="flex flex-row items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                        <div className="w-1/12 text-center font-semibold text-xl  bg-sky-700 p-2">
                            {index + 1}
                        </div>
                        <RosterCell player={player} />

                    </div>
                    )}

                <div className="flex flex-row mt-4 items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                    <div className="w-1/12 text-center text-xl font-semibold bg-sky-700 p-2">
                        P
                    </div>
                    <div className="flex flex-row flex-1 px-2 justify-between items-center">
                        <div className="flex flex-row gap-4">
                            <div className="font-bold w-12">#{pitcher.uniformNumber}</div>
                            <div>{pitcher.firstName} {pitcher.lastName}</div>
                        </div>
                    </div>
                </div>

            </div >
            < div className="w-[36%] bg-white flex flex-col gap-4 rounded-xl shadow-xl p-6" >
                <div className="text-center font-semibold text-xl">
                    AWAY
                </div>
                {
                    players.filter((player) => player.battingOrder !== "").sort((a, b) => a.battingOrder - b.battingOrder).map((player, index) => <div className="flex flex-row items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                        <div className="w-1/12 text-center text-xl font-semibold bg-sky-700 p-2">
                            {index + 1}
                        </div>
                        <RosterCell player={player} />
                    </div>
                    )}
                <div className="flex flex-row mt-4 items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                    <div className="w-1/12 text-center text-xl font-semibold bg-sky-700 p-2">
                        P
                    </div>
                    <div className="flex flex-row flex-1 px-2 justify-between items-center">
                        <div className="flex flex-row gap-4">
                            <div className="font-bold w-12">#{pitcher.uniformNumber}</div>
                            <div>{pitcher.firstName} {pitcher.lastName}</div>
                        </div>

                    </div>
                </div>
                {/* <RosterPositionPicker close={() => setPlayerClicked()} /> */}
            </div>
        </div >)
}