
import TournamentTeamList from "./TournamentTeamList";

export default function TournamentInfoTeams() {
    return (<div className="w-full">
        <TournamentTeamList teams={{ data: [{ id: 1 }, { id: 2 }] }} />
    </div>)
}