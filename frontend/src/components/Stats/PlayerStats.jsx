import {
    Autocomplete,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import StatsCell from "./StatCell";
import { API } from "../../global/API";
import { get_query } from "../../global/get_stat_query";
import { swrFetcher } from "../../global/swrFetcher";
import { useState } from "react";
import useSWR from "swr";


export default function PlayerStats({ id }) {
    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const [overviewOption, setOverviewOption] = useState("Batting");
    const stats = useSWR(
        `${API}/player/${id}/stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`,
        swrFetcher
    );
    const years = useSWR(
        `${API}/player/${id}/years/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, false)}`,
        swrFetcher
    );
    const teams = useSWR(
        `${API}/player/${id}/teams/${get_query(tournamentIDs, teamIDs, yearsSelect, true, false, true)}`,
        swrFetcher
    );
    const tournaments = useSWR(
        `${API}/player/${id}/tournaments/${get_query(tournamentIDs, [], yearsSelect,
            false,
            true,
            true
        )}`,
        swrFetcher
    );
    return <>
        <div className="flex flex-row flex-1 gap-8">
            <div className="flex flex-col flex-1 text-black gap-4 h-fit">
                <div className="flex flex-col md:flex-row justify-around  h-40 md:h-12">
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
                                setTeamIDs([...newValues.map((value) => value.id)])
                            }
                            renderInput={(params) => (
                                <TextField
                                    label="Team"
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
                                setTournamentIDs([...newValues.map((value) => value.id)])
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
                <div className="bg-white rounded self-center drop-shadow-lg mb-4">
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
                <div className={`grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-6 gap-3`}>
                    {(overviewOption == "Batting" ? [
                        {
                            label: "G",
                            value: stats.data ? (
                                stats.data.G
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
                            label: "AVG",
                            value: stats.data ? (
                                stats.data.AVG.toFixed(3)
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
                                stats.data.AB
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
                                stats.data.OBP.toFixed(3)
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
                                stats.data.SO
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
                                stats.data.BB
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
                                stats.data.H
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
                                stats.data["1B"]
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
                                stats.data["2B"]
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
                                stats.data["3B"]
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
                                stats.data.HR
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
                                stats.data.PA
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
                                stats.data.SLG.toFixed(3)
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
                                stats.data.HBP
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
                                stats.data.R
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
                                stats.data.RBI
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
                                stats.data.IBB
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
                                stats.data.OPS.toFixed(3)
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
                            label: "SB",
                            value: stats.data ? (
                                stats.data.SB
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
                            label: "TB",
                            value: stats.data ? (
                                stats.data.TB
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
                                stats.data.XBH
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
                                stats.data.ROE
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
                                stats.data.CS
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
                                stats.data.SF
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
                            label: "BABIP",
                            value: stats.data ? (
                                stats.data.BABIP.toFixed(3)
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
                            label: "RC",
                            value: stats.data ? (
                                stats.data.RC.toFixed(3)
                            ) : stats.isLoading ? (
                                <div >
                                    <CircularProgress color="success" />
                                </div>
                            ) : (
                                0
                            ),
                            coefficient: true
                        },


                    ] : [{
                        label: "PO",
                        value: stats.data ? (
                            stats.data.PO
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
                            stats.data.A
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
                            stats.data.E
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
                            stats.data.FIP.toFixed(3)
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
                        label: "TC",
                        value: stats.data ? (
                            stats.data.TC
                        ) : stats.isLoading ? (
                            <div >
                                <CircularProgress color="success" />
                            </div>
                        ) : (
                            0
                        ),
                        coefficient: false
                    },]).sort((a, b) => b.label === "G" ? 1 : a.coefficient == b.coefficient ? a.label.localeCompare(b.label) : b.coefficient - a.coefficient).map((stat, index) => (
                        <StatsCell value={stat.value} label={stat.label} key={index} />
                    ))}
                </div>
            </div>
        </div>
    </>
}