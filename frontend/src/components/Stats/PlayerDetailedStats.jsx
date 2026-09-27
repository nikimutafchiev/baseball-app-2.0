import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import {
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    MenuItem,
} from "@mui/material";
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useState } from "react";
import { API } from "../../global/API";
import { swrFetcher } from "../../global/swrFetcher";
import { get_query } from "../../global/get_stat_query";
import { get_stat_array } from "../../global/StatArray";
import useSWR from "swr";
import { useParams } from "react-router-dom";
export default function PlayerDetailedStats() {
    const [graphStat, setGraphStat] = useState("AVG");
    const [sortColumn, setSortColumn] = useState("startTime");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const { id } = useParams();
    const games_stats = useSWR(
        `${API}/player/${id}/games_stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`,
        swrFetcher
    );
    const stats = useSWR(
        `${API}/player/${id}/stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`,
        swrFetcher
    );
    return <>
        <h3 className="text-3xl font-semibold">Detailed stats</h3>
        {/* <div className="flex flex-col md:flex-row justify-around mb-4 h-40 md:h-12">
                            <div className="md:w-1/4 rounded drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={years}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Year" className="bg-white rounded"{...params} />
                                    )}
                                />
                            </div>
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={teams}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Team" className="bg-white rounded h-fit"{...params} />
                                    )}
                                />
                            </div>
                            <div className=" md:w-1/3 rounded  drop-shadow-lg">
                                <Autocomplete
                                    multiple
                                    limitTags={1}
                                    className="absolute inset-0"
                                    size="small"
                                    options={tournaments}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Tournament" className="bg-white rounded"{...params} />
                                    )}
                                />
                            </div>
                        </div> */}
        <div className="bg-white rounded self-center drop-shadow-lg">
            <ToggleButtonGroup color="primary" exclusive>
                <ToggleButton>Batting</ToggleButton>
                <ToggleButton>Pitching</ToggleButton>
                <ToggleButton>Fielding</ToggleButton>
            </ToggleButtonGroup>
        </div>

        <div className="w-full drop-shadow-lg h-96">
            {/* <div className="bg-white rounded">
                                <ToggleButtonGroup
                                    color="primary"
                                    exclusive
                                >
                                    <ToggleButton>Graph</ToggleButton>
                                    <ToggleButton>Table</ToggleButton>
                                </ToggleButtonGroup>
                            </div> */}
            {games_stats.data &&
                (
                    <TableContainer
                        style={{
                            maxWidth: "100%",
                            minHeight: "100%",
                            maxHeight: "100%",
                            overflowY: "auto",
                            backgroundColor: "white",
                            borderRadius: "16px",
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[{ title: "Start time", id: "startTime" }, {
                                        title: "Home team",
                                        id: "homeTeam"
                                    },
                                    {
                                        title: "Away team",
                                        id: "awayTeam"
                                    },
                                    {
                                        title: "AB",
                                        id: "AB"
                                    },
                                    {
                                        title: "R",
                                        id: "R"
                                    },
                                    {
                                        title: "H",
                                        id: "H"
                                    },
                                    {
                                        title: "RBI",
                                        id: "RBI"
                                    },
                                    {
                                        title: "BB",
                                        id: "BB"
                                    },
                                    {
                                        title: "SO",
                                        id: "SO"
                                    },
                                    {
                                        title: "AVG",
                                        id: "AVG"
                                    },
                                    {
                                        title: "SLG",
                                        id: "SLG"
                                    }].map((column) =>
                                        <TableCell onClick={() => { if (sortColumn == column.id) setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC"); else { setSortColumn(column.id); setSortOrder("DESC") } }}>
                                            <div className="flex flex-row items-center cursor-pointer min-w-fit gap-0.5">
                                                <div className="text-sm font-semibold">
                                                    {column.title}
                                                </div>
                                                <div className={`${sortColumn == column.id ? "visible" : "invisible"}`}> {sortOrder == "ASC" && <FaArrowUp size={10} />}
                                                    {sortOrder == "DESC" && <FaArrowDown size={10} />}
                                                </div></div></TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflowY: "auto" }}>
                                {[...games_stats.data].sort((a, b) => { const res = ["homeTeam", "awayTeam"].includes(sortColumn) ? b[sortColumn].localeCompare(a[sortColumn]) : sortColumn == 'startTime' ? new Date(b[sortColumn]) - new Date(a[sortColumn]) : b.stats[sortColumn] - a.stats[sortColumn]; if (sortOrder == "ASC") return -res; return res; }).map((row) => (
                                    <TableRow key={row.id}>
                                        {/* <TableCell component="th" scope="row">
																{row.battingOrder}
															</TableCell> */}
                                        <TableCell>
                                            {new Date(row.startTime).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{row.homeTeam}</TableCell>
                                        <TableCell>{row.awayTeam}</TableCell>
                                        <TableCell>{row.stats.AB}</TableCell>
                                        <TableCell>{row.stats.R}</TableCell>
                                        <TableCell>{row.stats.H}</TableCell>
                                        <TableCell>{row.stats.RBI}</TableCell>
                                        <TableCell>{row.stats.BB}</TableCell>
                                        <TableCell>{row.stats.SO}</TableCell>
                                        <TableCell>{row.stats.AVG.toFixed(3)}</TableCell>
                                        <TableCell>{row.stats.SLG.toFixed(3)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter
                                sx={{
                                    position: "sticky",
                                    bottom: 0,
                                    zIndex: 1,
                                    backgroundColor: "white",
                                }}
                            >
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.AB : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.R : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.H : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.RBI : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.BB : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.SO : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.AVG.toFixed(3) : 0}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-black text-sm">
                                            {stats.data ? stats.data.SLG.toFixed(3) : 0}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                )}
        </div>
        <div className="w-full  drop-shadow-lg min-h-96 bg-white rounded-2xl p-2">
            <TextField
                size="small"
                className="w-1/6"
                select
                onChange={(e) => {
                    setGraphStat(e.target.value);
                }}
                value={graphStat}
            >
                {["AVG", "SLG", "OBP"].map((option) => (
                    <MenuItem key={option} value={option}>
                        {<div className="text-sm">{option}</div>}
                    </MenuItem>
                ))}
            </TextField>
            {games_stats.data && (
                <LineChart
                    xAxis={[
                        {
                            data: games_stats.data.map(
                                (game) => new Date(game.startTime)
                            ),
                            valueFormatter: (date) =>
                                new Date(date).toLocaleDateString(),
                        },
                    ]}
                    series={[
                        {
                            data: get_stat_array(
                                graphStat,
                                games_stats.data.sort(
                                    (a, b) =>
                                        new Date(a.startTime) - new Date(b.startTime)
                                )
                            ),
                            label: graphStat,
                            color: "#6A994E",
                            area: true,
                            id: "stat",
                        },
                    ]}
                    grid={{ horizontal: true }}
                    height={400}
                    sx={{
                        "--Charts-lineArea-opacity": 1,
                        "& .MuiAreaElement-series-stat": {
                            fill: "url('#gradient')",
                        },
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor="#84b867"
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="100%"
                                stopColor="#84b867"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                </LineChart>
            )}
        </div>
    </>
}