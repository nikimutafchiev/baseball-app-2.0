
export default function Roster() {
    const players = [
        { uniformNumber: 55, firstName: "Nikolay", lastName: "Mutafchiev", position: "CF" },
        { uniformNumber: 12, firstName: "Ivan", lastName: "Petrov", position: "1B" },
        { uniformNumber: 34, firstName: "Maria", lastName: "Ivanova", position: "SS" },
        { uniformNumber: 7, firstName: "Georgi", lastName: "Dimitrov", position: "RF" },
        { uniformNumber: 22, firstName: "Anna", lastName: "Kirilova", position: "2B" },
        { uniformNumber: 10, firstName: "Peter", lastName: "Stoyanov", position: "3B" },
        { uniformNumber: 3, firstName: "Elena", lastName: "Todorova", position: "LF" },
        { uniformNumber: 45, firstName: "Viktor", lastName: "Georgiev", position: "C" },
        { uniformNumber: 88, firstName: "Sofia", lastName: "Mladenova", position: "DH" },
        { uniformNumber: 99, firstName: "Dimitar", lastName: "Kolev", position: "P" },
    ];

    return (
        <div className="bg-gray-200 min-h-[90vh] flex flex-row justify-around p-2 ">
            < div className="w-[36%] bg-white flex flex-col gap-4 rounded-xl shadow-xl p-6" >
                <div className="text-center font-semibold text-xl">
                    HOME
                </div>
                {
                    players.filter((player) => player.position !== "P").map((player, index) => <div className="flex flex-row items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                        <div className="w-1/12 text-center text-xl  bg-sky-700 p-2">
                            {index + 1}
                        </div>
                        <div className="flex flex-row flex-1 px-2 justify-between items-center">
                            <div className="flex flex-row ">
                                <div className="font-bold w-12">#{player.uniformNumber}</div>
                                <div>{player.firstName} {player.lastName}</div>
                            </div>
                            <div className="font-semibold">
                                {player.position}
                            </div>
                        </div>
                    </div>
                    )}
                <div className="flex flex-row mt-4 items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                    <div className="w-1/12 text-center text-xl  bg-sky-700 p-2">
                        P
                    </div>
                    <div className="flex flex-row flex-1 px-2 justify-between items-center">
                        <div className="flex flex-row gap-4">
                            <div className="font-bold w-12">#55</div>
                            <div>Nikolay Mutafchiev</div>
                        </div>
                    </div>
                </div>

            </div >
            < div className="w-[36%] bg-white flex flex-col gap-4 rounded-xl shadow-xl p-6" >
                <div className="text-center font-semibold text-xl">
                    AWAY
                </div>
                {
                    players.filter((player) => player.position !== "P").map((player, index) => <div className="flex flex-row items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                        <div className="w-1/12 text-center text-xl  bg-sky-700 p-2">
                            {index + 1}
                        </div>
                        <div className="flex flex-row flex-1 px-2 justify-between items-center">
                            <div className="flex flex-row gap-4">
                                <div className="font-bold w-12">#{player.uniformNumber}</div>
                                <div>{player.firstName} {player.lastName}</div>
                            </div>
                            <div className="font-semibold">
                                {player.position}
                            </div>
                        </div>
                    </div>
                    )}
                <div className="flex flex-row mt-4 items-center bg-sky-500 hover:bg-sky-400 cursor-pointer overflow-hidden text-white rounded-lg  shadow-md">
                    <div className="w-1/12 text-center text-xl  bg-sky-700 p-2">
                        P
                    </div>
                    <div className="flex flex-row flex-1 px-2 justify-between items-center">
                        <div className="flex flex-row gap-4">
                            <div className="font-bold w-12">#55</div>
                            <div>Nikolay Mutafchiev</div>
                        </div>

                    </div>
                </div>

            </div>
        </div >)
}