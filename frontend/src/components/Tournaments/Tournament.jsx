import { Link } from "react-router-dom"
export default function Tournament(props) {

    return (
        <div className="bg-white drop-shadow-lg items-center rounded flex flex-row gap-12  pr-2">
            <img src="https://placehold.co/100x100" />
            <div className="text-sm font-semibold text-gray-700">
                {props.place}
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <div className="font-semibold text-xl">
                    {props.name}
                </div>
                <div className="text-sm ">
                    {new Date(props.startDate).toLocaleDateString()} - {new Date(props.endDate).toLocaleDateString()}
                </div>
            </div>
            <Link className="w-1/5 text-white font-semibold bg-accent_2 hover:bg-accent_3 p-2 rounded text-center" to={`/tournaments/${props.id}/games`}>View more</Link>

        </div>)
}