import TeamList from "../Teams/TeamList";

export default function TournamentInfoTeams() {
    return (<div className="w-full">
        <TeamList cols={4} teams={{ data: [{}, {}] }} />
    </div>)
}