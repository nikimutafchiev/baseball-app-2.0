import { RiCloseCircleLine } from "react-icons/ri";
export default function RosterPlayerPicker(props) {

    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 px-6 flex flex-col text-white font-semibold cursor-default bg-white w-1/2 h-4/5  self-center justify-self-center rounded">
            <div className="h-[10%]">
                <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto px-2">
                {[{ id: 121, uniformNumber: 55, firstName: "Nikolay", lastName: "Mutafchiev" },
                { id: 122, uniformNumber: 12, firstName: "Ivan", lastName: "Petrov" },
                { id: 123, uniformNumber: 34, firstName: "Maria", lastName: "Ivanova" },
                { id: 124, uniformNumber: 7, firstName: "Georgi", lastName: "Dimitrov" },
                { id: 125, uniformNumber: 22, firstName: "Anna", lastName: "Kirilova" },
                { id: 126, uniformNumber: 10, firstName: "Peter", lastName: "Stoyanov" },
                { id: 127, uniformNumber: 3, firstName: "Elena", lastName: "Todorova" },
                { id: 128, uniformNumber: 45, firstName: "Viktor", lastName: "Georgiev" },
                { id: 129, uniformNumber: 88, firstName: "Sofia", lastName: "Mladenova" },
                { id: 130, uniformNumber: 99, firstName: "Dimitar", lastName: "Kolev" }
                ]
                    .sort((player) => {
                        if (!props.takenPlayers.includes(player.id)) return -1
                        else return 0
                    }).map((player) =>
                        <button className={`${props.takenPlayers.includes(player.id) ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} flex flex-row py-2 px-4 my-2 rounded items-center gap-6 `}
                            onClick={() => { props.nextPage(); props.setter({ id: player.id, uniformNumber: player.uniformNumber, firstName: player.firstName, lastName: player.lastName }); }}>
                            <img src="https://placehold.co/100x100" />
                            <div className="flex flex-row items-center gap-6">
                                <div className="font-bold text-lg w-12">#{player.uniformNumber}</div>
                                <div className="text-2xl">{player.firstName} {player.lastName}</div>
                            </div>
                        </button>
                    )}
            </div>
        </div >
    </div >)
}