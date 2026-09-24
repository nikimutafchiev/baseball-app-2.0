import { useState, useEffect } from "react";
import { API } from "../../global/API";
import useSWR from "swr";
import TeamSelectList from "../Other/TeamSelectList";
import { swrFetcher } from "../../global/swrFetcher";
import { get_query } from "../../global/get_stat_query";
import { useParams } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
export default function TeamH2HStats() {

    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const { id } = useParams();
    const years = useSWR(
        `${API}/team/${id}/years/${get_query(tournamentIDs, [], yearsSelect, true, true, false)}`,
        swrFetcher
    );
    const tournaments = useSWR(
        `${API}/team/${id}/tournaments/${get_query(
            tournamentIDs, [], yearsSelect,
            false,
            true,
            true
        )}`,
        swrFetcher
    );

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
            tournamentIDs, [], yearsSelect,
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
                    tournamentIDs, [], yearsSelect,
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
        <div className="grid grid-cols-2 gap-6 justify-around h-40 mb-4 md:h-12">
            <div className=" rounded drop-shadow-lg">
                <Autocomplete
                    multiple
                    limitTags={1}
                    className="absolute inset-0"
                    size="small"
                    options={years.data ? years.data : []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    onChange={(e, newValues) => setYearsSelect(newValues)}
                    renderInput={(params) => (
                        <TextField
                            label="Year"
                            className="bg-white rounded"
                            {...params}
                        />
                    )}
                />
            </div>

            <div className=" rounded  drop-shadow-lg">
                <Autocomplete
                    multiple
                    limitTags={1}
                    className="absolute inset-0"
                    size="small"
                    options={tournaments.data ? tournaments.data : []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    onChange={(e, newValues) =>
                        setTournamentIDs(newValues.map((value) => value.id))
                    }
                    renderInput={(params) => (
                        <TextField
                            label="Tournament"
                            className="bg-white rounded"
                            {...params}
                        />
                    )}
                />
            </div>
        </div>
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
                            {/* Team 1 Stat Block */}
                            <div
                                className={`flex items-center justify-start pl-6 pr-4 py-3 rounded-l-2xl border-y border-l transition-all duration-300 ${stat.team1 > stat.team2
                                    ? "bg-emerald-50/40 border-emerald-100 text-emerald-700 font-black"
                                    : stat.team1 === stat.team2
                                        ? "bg-blue-50/40 border-blue-100 text-primary_2 font-black"
                                        : "bg-white border-slate-100 text-slate-300 font-medium"
                                    }`}
                            >
                                <span className="text-xl tracking-tighter">{stat.team1}</span>
                            </div>

                            {/* Center Label Block */}
                            <div className="flex items-center justify-center bg-white border-y border-slate-100 px-4 py-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center leading-none">
                                    {stat.type}
                                </span>
                            </div>

                            {/* Team 2 Stat Block */}
                            <div
                                className={`flex items-center justify-end pr-6 pl-4 py-3 rounded-r-2xl border-y border-r transition-all duration-300 ${stat.team2 > stat.team1
                                    ? "bg-emerald-50/40 border-emerald-100 text-emerald-700 font-black"
                                    : stat.team2 === stat.team1
                                        ? "bg-blue-50/40 border-blue-100 text-primary_2 font-black"
                                        : "bg-white border-slate-100 text-slate-300 font-medium"
                                    }`}
                            >
                                <span className="text-xl tracking-tighter">{stat.team2}</span>
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