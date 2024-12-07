import { Link } from "react-router-dom";
import Roster from "../components/Roster";

export default function RosterPage() {
    return (<div className="bg-gray-200 min-h-[90vh] flex flex-row justify-around p-2 ">
        <Link className="rounded font-semibold bg-accent_2 hover:bg-accent_3 text-white drop-shadow-lg h-fit p-2" to={".."} relative="path">Back</Link>
        <Roster team="Home - (AKA)" />
        <Roster team="Away - (BLU)" />
        <Link className="rounded font-semibold bg-blue-500 hover:bg-blue-400 text-white drop-shadow-lg h-fit p-2" to={".."} relative="path">Save</Link>
    </div>)
}