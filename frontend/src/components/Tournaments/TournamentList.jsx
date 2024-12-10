import Tournament from "./Tournament";

export default function TournamentList() {
    return (<div className="grid grid-cols-2 w-full gap-x-6 gap-y-8">
        {["", "", "", "", "", "", "", "", "", ""].map(() => <Tournament />)}
    </div>)
}