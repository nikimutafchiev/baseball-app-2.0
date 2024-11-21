import { RiLiveLine } from "react-icons/ri"
export default function GameInfo() {
    return (<div className="flex flex-row gap-8">
        <div className="flex flex-col bg-white rounded-2xl drop-shadow-lg h-[80vh] w-1/3 p-10 items-center justify-around">
            <div className="flex flex-col text-gray-500 text-xs font-semibold ">
                <div className="text-center">
                    Porter Park field, Blagoevgrad
                </div>
                <div className="text-center">
                    21-02-2022, 11:30:00
                </div>
            </div>
            <div className="grid grid-cols-3  w-full">
                <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                    <img src="https://placehold.co/80x80"></img>
                    Sofia Blues
                </div>
                <div className="flex flex-row gap-2 items-center justify-center text-2xl font-semibold">
                    <h3>
                        0
                    </h3>
                    -
                    <h3>
                        3
                    </h3>
                </div>
                <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                    <img src="https://placehold.co/80x80"></img>
                    Akademiks Sofia
                </div>
            </div>
            <div className="text-2xl font-semibold text-accent_2 flex flex-row gap-1 items-center">
                <RiLiveLine size={25} />Live
            </div>
            <div className="w-full flex flex-row text-xs font-semibold">
                <div className="w-1/2 text-center">
                    W - Petyo Petkov
                </div>
                <div className="w-1/2 text-center">
                    L - Evgenii Chernozemsky
                </div>
            </div>
            <div className="place-items-center bg-gray-200 px-2 py-1 rounded">
                <table className="table-auto  text-xs">
                    <thead className="border-b-[1px] border-gray-500">
                        <tr>
                            {["Team", 1, 2, 3, 4, 5, 6, 7, 8, 9, "R", "H", "E"].map((value) => <th className="p-1 font-bold">{value}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {["Akademik", 0, 1, 3, 0, 1, 2, 0, 1, 2, 11, 13, 2].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                        </tr>
                        <tr>
                            {["Blues", 0, 1, 3, 0, 1, 2, 0, 1, 2, 11, 13, 2].map((value) => <td className="text-center font-semibold text-2xs">{value}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex flex-1 bg-white rounded-2xl drop-shadow-lg h-[80vh]">

        </div>
    </div >)
}