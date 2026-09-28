export function get_query(tournamentIDs, teamIDs, yearsSelect, include_tournament, include_team, include_year) {
    const params = new URLSearchParams();
    if (include_tournament) tournamentIDs.forEach((id) => { params.append("tournament_ids", id) })
    if (include_team) teamIDs.forEach((id) => { params.append("team_ids", id) })
    if (include_year) yearsSelect.forEach((id) => { params.append("years_ids", id) })
    return "?" + params.toString();

}