import { useState, useEffect } from "react";
import { API } from "../../global/API";
import useSWR from "swr";
import TeamSelectList from "../Other/TeamSelectList";
import { swrFetcher } from "../../global/swrFetcher";
export default function TeamH2HStats({ id }) {

    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const query_params = {
        tournament_query:
            tournamentIDs.length != 0 ? `tournament_ids=[${tournamentIDs}]` : "",
        team_query: teamIDs.length != 0 ? `team_ids=[${teamIDs}]` : "",
        year_query: yearsSelect.length != 0 ? `years=[${yearsSelect}]` : "",
    };
    const get_query = (tournament, team, year, h2h = null) => {
        var res = "";
        if (tournament == true && query_params.tournament_query.length != 0)
            res += `?${query_params.tournament_query}`;
        if (team == true && query_params.team_query.length != 0)
            res += `${res.length == 0 ? "?" : "&"}${query_params.team_query}`;
        if (year == true && query_params.year_query.length != 0)
            res += `${res.length == 0 ? "?" : "&"}${query_params.year_query}`;
        if (h2h) res += `${res.length == 0 ? "?" : "&"}team_ids=[${h2h}]`;
        return res;
    };


    const teamsToSelect = useSWR(`${API}/teams`, (url) =>
        fetch(url).then((res) => res.json())
    );
    const team = useSWR(`${API}/team/${id}`, (url) =>
        fetch(url).then((res) => res.json())
    );
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedTeamStats, setSelectedTeamStats] = useState(null);
    const [selectClicked, setSelectClicked] = useState(false);
    const teamH2Hstats = useSWR(
        `${API}/team/${id}/stats/${get_query(
            true,
            false,
            true,
            selectedTeam ? selectedTeam.id : null
        )}`,
        swrFetcher
    );


    useEffect(() => {
        if (selectedTeam)
            fetch(
                `${API}/team/${selectedTeam.id}/stats/${get_query(
                    true,
                    false,
                    true,
                    team.data ? team.data.id : null
                )}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setSelectedTeamStats(data);
                })
                .catch((error) => console.error(error));
        else setSelectedTeamStats(null);
    }, [selectedTeam, tournamentIDs, yearsSelect]);
    return <>
        <h3 className="text-3xl font-semibold">Team H2H</h3>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <button
                    className={`${selectedTeam ? "visible" : "invisible"
                        } text-sm p-2 rounded drop-shadow-lg bg-accent_2 hover:bg-accent_3 text-white font-semibold`}
                    onClick={() => setSelectedTeam(null)}
                >
                    CLEAR
                </button>
                <button
                    className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-base sm:text-lg md:text-xl"
                    onClick={() => setSelectClicked(true)}
                >
                    SELECT TEAM
                </button>
            </div>
            <div className="bg-white p-4 h-28 rounded-2xl shadow-lg flex flex-col justify-between w-1/2 items-center self-center">
                <div className="text-2xl font-bold text-gray-800">W-L</div>
                {teamH2Hstats.data && selectedTeamStats && (
                    <div className="text-5xl font-semibold text-gray-700">
                        {teamH2Hstats.data.stats.W}-{selectedTeamStats.stats.W}
                    </div>
                )}
            </div>
            <div>
                {/* <h5 className="text-2xl font-semibold">H2H stats</h5> */}
                <div className="grid grid-cols-3  font-semibold text-xl my-2">
                    <div className="text-center">{team.data.name}</div>
                    <div></div>
                    {selectedTeam && (
                        <div className="text-center">{selectedTeam.name}</div>
                    )}
                </div>
                <div className="grid grid-cols-3 font-semibold bg-white px-6 py-3 rounded drop-shadow-lg">
                    {[
                        {
                            team1: teamH2Hstats.data ? teamH2Hstats.data.stats.AB : 0,
                            type: "AB",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.AB
                                    : undefined,
                        }, , {
                            team1: teamH2Hstats.data ? teamH2Hstats.data.stats.H : 0,
                            type: "H",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.H
                                    : undefined,
                        },
                        {
                            team1: teamH2Hstats.data
                                ? teamH2Hstats.data.stats.AVG.toFixed(3)
                                : 0,
                            type: "AVG",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.AVG.toFixed(3)
                                    : undefined,
                        },
                        {
                            team1: teamH2Hstats.data
                                ? teamH2Hstats.data.stats.OBP.toFixed(3)
                                : 0,
                            type: "OBP",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.OBP.toFixed(3)
                                    : undefined,
                        },
                        {
                            team1: teamH2Hstats.data
                                ? teamH2Hstats.data.stats.SLG.toFixed(3)
                                : 0,
                            type: "SLG",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.SLG.toFixed(3)
                                    : undefined,
                        },
                        {
                            team1: teamH2Hstats.data
                                ? teamH2Hstats.data.stats.FIP.toFixed(3)
                                : 0,
                            type: "FIP",
                            team2:
                                selectedTeam && selectedTeamStats
                                    ? selectedTeamStats.stats.FIP.toFixed(3)
                                    : undefined,
                        }
                    ].map((stat) => (
                        <>
                            <div
                                className={`text-left border-r-2 p-1.5 ${stat.team1 > stat.team2
                                    ? "bg-green-100"
                                    : stat.team1 == stat.team2
                                        ? "bg-blue-100"
                                        : ""
                                    }`}
                            >
                                {stat.team1}
                            </div>
                            <div className="text-center p-1.5">{stat.type}</div>
                            <div
                                className={`text-right border-l-2  p-1.5 ${stat.team1 < stat.team2
                                    ? "bg-green-100"
                                    : stat.team2 == stat.team1
                                        ? "bg-blue-100"
                                        : ""
                                    }`}
                            >
                                {stat.team2}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>



        {
            selectClicked && (
                <TeamSelectList
                    teams={
                        teamsToSelect.data
                            ? teamsToSelect.data.filter((a) => a.id != team.data.id)
                            : []
                    }
                    close={(team) => {
                        setSelectedTeam(team);
                        setSelectClicked(false);
                    }}
                    adder={false}
                />
            )
        }
    </>
}