export function get_query(tournamentIDs, teamIDs, yearsSelect, is_tournament, is_team, is_year, h2h = null) {
    const query_params = {
        tournament_query:
            tournamentIDs.length != 0 ? `tournament_ids=[${tournamentIDs}]` : "",
        team_query: teamIDs.length != 0 ? `team_ids=[${teamIDs}]` : "",
        year_query: yearsSelect.length != 0 ? `years=[${yearsSelect}]` : "",
    };
    var res = "";
    if (is_tournament == true && query_params.tournament_query.length != 0)
        res += `?${query_params.tournament_query}`;
    if (is_team == true && query_params.team_query.length != 0)
        res += `${res.length == 0 ? "?" : "&"}${query_params.team_query}`;
    if (is_year == true && query_params.year_query.length != 0)
        res += `${res.length == 0 ? "?" : "&"}${query_params.year_query}`;
    if (h2h) res += `${res.length == 0 ? "?" : "&"}team_ids=[${h2h}]`;
    return res;

}