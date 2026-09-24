import { useState } from "react";
import { MenuItem, TableCell, TableBody, ToggleButton, ToggleButtonGroup, TableRow, TableContainer, Table, TableHead, TableFooter, TextField } from "@mui/material";
import { swrFetcher } from "../../global/swrFetcher";
import { API } from "../../global/API";
import { get_stat_array } from "../../global/StatArray";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import useSWR from "swr";
import { get_query } from "../../global/get_stat_query";
import { useParams } from "react-router-dom";
export default function TeamDetailedStats() {
    const [tableOption, setTableOption] = useState("Games");
    const [sortColumn, setSortColumn] = useState("startTime");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [graphStat, setGraphStat] = useState("AVG");
    const { id } = useParams();
    const stats = useSWR(
        `${API}/team/${id}/stats/${get_query([], [], [], true, true, true)}`,
        swrFetcher
    );

    return <>
        <div className="flex flex-1 flex-row gap-8">
            <div className="flex flex-1 flex-col gap-4 h-fit">

                <h3 className="text-3xl font-semibold">Detailed stats</h3>
                <div className="flex flex-row items-center justify-around">
                    <TextField
                        size="small" className="w-1/6 bg-white overflow-hidden rounded"
                        select
                        onChange={(e) => { setTableOption(e.target.value); if (e.target.value == "Games") { setSortColumn("startTime"); setSortOrder("DESC"); } else { setSortColumn("firstName"); setSortOrder("ASC"); } }}
                        value={tableOption}
                    >
                        {["Games", "Players"].map((option) => (
                            <MenuItem key={option} value={option}>
                                {<div className="text-sm">{option}</div>}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div className="bg-white rounded drop-shadow-lg">

                        <ToggleButtonGroup color="primary" exclusive>
                            <ToggleButton>Batting</ToggleButton>
                            <ToggleButton>Pitching</ToggleButton>
                            <ToggleButton>Fielding</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
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

                    {stats.data && tableOption == "Games" &&
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
                                                title: "OBP",
                                                id: "OBP"
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
                                        {[...stats.data.games_stats].sort((a, b) => { const res = ["homeTeam", "awayTeam"].includes(sortColumn) ? b[sortColumn].localeCompare(a[sortColumn]) : sortColumn == 'startTime' ? new Date(b[sortColumn]) - new Date(a[sortColumn]) : b.stats[sortColumn] - a.stats[sortColumn]; if (sortOrder == "ASC") return -res; return res; }).map((row) => (
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
                                                <TableCell>{row.stats.OBP.toFixed(3)}</TableCell>
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
                                                    {stats.data ? stats.data.stats.AB : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.R : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.H : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.RBI : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.BB : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.SO : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.AVG.toFixed(3) : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.OBP.toFixed(3) : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.SLG.toFixed(3) : 0}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        )}
                    {stats.data && tableOption == "Players" &&
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
                                            {[{
                                                title: "First name",
                                                id: "firstName"
                                            },
                                            {
                                                title: "Last name",
                                                id: "lastName"
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
                                                title: "OBP",
                                                id: "OBP"
                                            },
                                            {
                                                title: "SLG",
                                                id: "SLG"
                                            },
                                            ].map((column) =>
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
                                        {[...stats.data.players_stats].sort((a, b) => { const res = ["firstName", "lastName"].includes(sortColumn) ? b[sortColumn].localeCompare(a[sortColumn]) : b.stats[sortColumn] - a.stats[sortColumn]; if (sortOrder == "ASC") return -res; return res; }).map((row) => (
                                            <TableRow key={row.id}>
                                                {/* <TableCell component="th" scope="row">
                                                                        {row.battingOrder}
                                                                    </TableCell> */}
                                                <TableCell>{row.firstName}</TableCell>
                                                <TableCell>{row.lastName}</TableCell>
                                                <TableCell>{row.stats.AB}</TableCell>
                                                <TableCell>{row.stats.R}</TableCell>
                                                <TableCell>{row.stats.H}</TableCell>
                                                <TableCell>{row.stats.RBI}</TableCell>
                                                <TableCell>{row.stats.BB}</TableCell>
                                                <TableCell>{row.stats.SO}</TableCell>
                                                <TableCell>{row.stats.AVG.toFixed(3)}</TableCell>
                                                <TableCell>{row.stats.OBP.toFixed(3)}</TableCell>
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
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.AB : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.R : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.H : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.RBI : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.BB : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.SO : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.AVG.toFixed(3) : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.OBP.toFixed(3) : 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-black text-sm">
                                                    {stats.data ? stats.data.stats.SLG.toFixed(3) : 0}
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
                    {stats.data && (
                        <LineChart
                            xAxis={[
                                {
                                    data: stats.data.games_stats.map(
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
                                        stats.data.games_stats.sort(
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
                </div></div></div>
    </>;
}