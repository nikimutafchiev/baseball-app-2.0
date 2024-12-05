import Roster from "../components/Roster";

export default function RosterPage() {
    return (<div className="bg-gray-200 min-h-[90vh] flex flex-row justify-around p-2 ">
        <Roster team="Home - (AKA)" />
        <Roster team="Away - (BLU)" />
    </div>)
}