import { API } from "../../global/API";
import { swrFetcher } from "../../global/swrFetcher";
import { useState } from "react";
import useSWR from "swr";
import StatsCell from "./StatCell";
import { TextField, Autocomplete, CircularProgress, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { get_query } from "../../global/get_stat_query";
import { useParams } from "react-router-dom";

export default function TeamStats() {
    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const { id } = useParams();
    const [overviewOption, setOverviewOption] = useState("Batting");
    const years = useSWR(
        `${API}/team/${id}/years/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, false)}`,
        swrFetcher
    );
    const teams = useSWR(
        `${API}/team/${id}/teams/${get_query(tournamentIDs, teamIDs, yearsSelect, true, false, true)}`,
        swrFetcher
    );
    const tournaments = useSWR(
        `${API}/team/${id}/tournaments/${get_query(tournamentIDs, [], yearsSelect,
            false,
            true,
            true
        )}`,
        swrFetcher
    );
    const stats = useSWR(
        `${API}/team/${id}/stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`,
        swrFetcher
    );
    return <><div className="flex flex-1 flex-row gap-8">
        <div className="flex flex-1 flex-col gap-4 h-fit">
            <div className="flex flex-col md:flex-row justify-around h-40 mb-4 md:h-12">
                <div className="md:w-1/4 rounded drop-shadow-lg">
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
                <div className=" md:w-1/3 rounded  drop-shadow-lg">
                    <Autocomplete
                        multiple
                        limitTags={1}
                        className="absolute inset-0"
                        size="small"
                        options={teams.data ? teams.data : []}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        onChange={(e, newValues) =>
                            setTeamIDs(newValues.map((value) => value.id))
                        }
                        renderInput={(params) => (
                            <TextField
                                label="Opponent teams"
                                className="bg-white rounded h-fit"
                                {...params}
                            />
                        )}
                    />
                </div>
                <div className=" md:w-1/3 rounded  drop-shadow-lg">
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
            <h3 className="text-3xl font-semibold">Stats overview</h3>

            <div className="grid md:grid-cols-2 gap-6">
                {[
                    {
                        label: "Games Played",
                        value: `${stats.data ? stats.data.stats.W + stats.data.stats.L : 0}`,
                        accent: "bg-blue-600",
                        bg: "bg-blue-50/30"
                    },
                    {
                        label: "Win - Loss Record",
                        value: `${stats.data ? stats.data.stats.W : 0} - ${stats.data ? stats.data.stats.L : 0}`,
                        accent: "bg-indigo-600",
                        bg: "bg-indigo-50/30"
                    },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className={`group relative bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1`}
                    >
                        <div className={`absolute top-6 left-8 w-8 h-1 rounded-full ${stat.accent} opacity-40 group-hover:w-16 transition-all duration-500`} />

                        <div className="flex flex-col justify-between h-full pt-4">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    {stat.label}
                                </span>
                                <div className="mt-4 text-6xl font-semibold text-slate-800 tracking-tighter">
                                    {stat.value}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded self-center drop-shadow-lg my-2">
                <ToggleButtonGroup exclusive
                    value={overviewOption}
                    onChange={(e, newValue) => {
                        if (newValue) {
                            setOverviewOption(newValue);
                        }
                    }}>
                    <ToggleButton value="Batting">Batting</ToggleButton>
                    {/* <ToggleButton value="Pitching">Pitching</ToggleButton> */}
                    <ToggleButton value="Fielding">Fielding</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3`}>
                {(overviewOption == "Batting" ? [
                    {
                        label: "AVG",
                        value: stats.data ? (
                            stats.data.stats.AVG.toFixed(3)
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0.0
                        ),
                        coefficient: true
                    },
                    {
                        label: "AB",
                        value: stats.data ? (
                            stats.data.stats.AB
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "OBP",
                        value: stats.data ? (
                            stats.data.stats.OBP.toFixed(3)
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0.0
                        ),
                        coefficient: true
                    },
                    {
                        label: "SO",
                        value: stats.data ? (
                            stats.data.stats.SO
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "BB",
                        value: stats.data ? (
                            stats.data.stats.BB
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "H",
                        value: stats.data ? (
                            stats.data.stats.H
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "1B",
                        value: stats.data ? (
                            stats.data.stats["1B"]
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "2B",
                        value: stats.data ? (
                            stats.data.stats["2B"]
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "3B",
                        value: stats.data ? (
                            stats.data.stats["3B"]
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "HR",
                        value: stats.data ? (
                            stats.data.stats.HR
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "PA",
                        value: stats.data ? (
                            stats.data.stats.PA
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false

                    },
                    {
                        label: "SLG",
                        value: stats.data ? (
                            stats.data.stats.SLG.toFixed(3)
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0.0
                        ),
                        coefficient: true
                    },
                    {
                        label: "HBP",
                        value: stats.data ? (
                            stats.data.stats.HBP
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "R",
                        value: stats.data ? (
                            stats.data.stats.R
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "RBI",
                        value: stats.data ? (
                            stats.data.stats.RBI
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "IBB",
                        value: stats.data ? (
                            stats.data.stats.IBB
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "OPS",
                        value: stats.data ? (
                            stats.data.stats.OPS.toFixed(3)
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: true
                    },
                    {
                        label: "TB",
                        value: stats.data ? (
                            stats.data.stats.TB
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "XBH",
                        value: stats.data ? (
                            stats.data.stats.XBH
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "ROE",
                        value: stats.data ? (
                            stats.data.stats.ROE
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "CS",
                        value: stats.data ? (
                            stats.data.stats.CS
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "SF",
                        value: stats.data ? (
                            stats.data.stats.SF
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    }] : [
                    {
                        label: "PO",
                        value: stats.data ? (
                            stats.data.stats.PO
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "A",
                        value: stats.data ? (
                            stats.data.stats.A
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "E",
                        value: stats.data ? (
                            stats.data.stats.E
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "TC",
                        value: stats.data ? (
                            stats.data.stats.TC
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },
                    {
                        label: "FIP",
                        value: stats.data ? (
                            stats.data.stats.FIP.toFixed(3)
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: true
                    },
                ]).sort((a, b) => a.coefficient == b.coefficient ? a.label.localeCompare(b.label) : b.coefficient - a.coefficient).map((stat, index) => (
                    <StatsCell value={stat.value} label={stat.label} key={index} />
                ))}
            </div></div></div></>;
}
