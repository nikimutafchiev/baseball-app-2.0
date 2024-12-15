import Tournament from "./Tournament";

export default function TournamentList(props) {
    return (<div className="grid grid-cols-2 w-full gap-x-6 gap-y-8">
        {props.tournaments.data && props.tournaments.data.map((tournament) => <Tournament {...tournament} />)}
    </div>)
}