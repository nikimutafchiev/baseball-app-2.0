import { useState, useEffect } from "react";
import { swrFetcher } from "../../global/swrFetcher";
import { API } from "../../global/API";
import { get_query } from "../../global/get_stat_query";
import useSWR from "swr";
import {
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import PlayerSelectList from "../Other/PlayerSelectList";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
export default function PlayerH2HStats() {
    const [player] = useOutletContext();
    const [teamIDs, setTeamIDs] = useState([]);
    const [tournamentIDs, setTournamentIDs] = useState([]);
    const [yearsSelect, setYearsSelect] = useState([]);
    const [selectClicked, setSelectClicked] = useState(false);
    const { id } = useParams();
    const players = useSWR(`${API}/players`, (url) =>
        fetch(url).then((res) => res.json())
    );
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const stats = useSWR(
        `${API}/player/${id}/stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`,
        swrFetcher
    );
    const [selectedPlayerStats, setSelectedPlayerStats] = useState([]);
    useEffect(() => {
        if (selectedPlayer)
            fetch(
                `${API}/player/${selectedPlayer.id}/stats/${get_query(tournamentIDs, teamIDs, yearsSelect, true, true, true)}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setSelectedPlayerStats(data);
                })
                .catch((error) => console.error(error));
        else setSelectedPlayerStats(null);
    }, [selectedPlayer]);
    return <>
        <h3 className="text-3xl font-semibold">Player comparison</h3>
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
                <button
                    className={`${selectedPlayer ? "visible" : "invisible"
                        } text-sm p-2 rounded drop-shadow-lg bg-accent_2 hover:bg-accent_3 text-white font-semibold`}
                    onClick={() => setSelectedPlayer(null)}
                >
                    CLEAR
                </button>
                <button
                    className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-base sm:text-lg md:text-xl"
                    onClick={() => setSelectClicked(true)}
                >
                    SELECT PLAYER
                </button>
            </div>
            <div className="bg-white rounded self-center drop-shadow-lg">
                <ToggleButtonGroup color="primary" exclusive>
                    <ToggleButton>Batting</ToggleButton>
                    <ToggleButton>Pitching</ToggleButton>
                    <ToggleButton>Fielding</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="grid grid-cols-3 font-semibold text-xl ">
                <div className="text-center ">
                    {player && <div>{player.firstName}  {player.lastName}</div>}
                </div>
                <div></div>
                {selectedPlayer && (
                    <div className="text-center">
                        {selectedPlayer.firstName} {selectedPlayer.lastName}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-3 font-semibold bg-white px-6 py-3 rounded drop-shadow-lg">
                {[
                    {
                        player_1: stats.data ? stats.data.AB : 0,
                        type: "AB",
                        player_2:
                            selectedPlayer && selectedPlayerStats
                                ? selectedPlayerStats.AB
                                : undefined,
                    }, {
                        player_1: stats.data ? stats.data.H : 0,
                        type: "H",
                        player_2:
                            selectedPlayer && selectedPlayerStats
                                ? selectedPlayerStats.H
                                : undefined,
                    },
                    {
                        player_1: stats.data ? stats.data.AVG.toFixed(3) : 0,
                        type: "AVG",
                        player_2:
                            selectedPlayer && selectedPlayerStats
                                ? selectedPlayerStats.AVG.toFixed(3)
                                : undefined,
                    },
                    {
                        player_1: stats.data ? stats.data.OBP.toFixed(3) : 0,
                        type: "OBP",
                        player_2:
                            selectedPlayer && selectedPlayerStats
                                ? selectedPlayerStats.OBP.toFixed(3)
                                : undefined,
                    },
                    {
                        player_1: stats.data ? stats.data.SLG.toFixed(3) : 0,
                        type: "SLG",
                        player_2:
                            selectedPlayer && selectedPlayerStats
                                ? selectedPlayerStats.SLG.toFixed(3)
                                : undefined,
                    },
                ].map((stat) => (
                    <>
                        <div
                            className={`text-left border-r-2 p-1.5 ${stat.player_1 > stat.player_2
                                ? "bg-green-100"
                                : stat.player_1 == stat.player_2
                                    ? "bg-blue-100"
                                    : ""
                                }`}
                        >
                            {stat.player_1}
                        </div>
                        <div className="text-center p-1.5">{stat.type}</div>
                        <div
                            className={`text-right border-l-2  p-1.5 ${stat.player_1 < stat.player_2
                                ? "bg-green-100"
                                : stat.player_1 == stat.player_2
                                    ? "bg-blue-100"
                                    : ""
                                }`}
                        >
                            {stat.player_2}
                        </div>
                    </>
                ))}
            </div>
        </div>
        {selectClicked && (
            <PlayerSelectList
                close={(player) => {
                    setSelectClicked(false);
                    setSelectedPlayer(player);
                }}
                players={
                    players.data
                        ? players.data.filter((a) => a.id != id)
                        : []
                }
                rosterSelect={false}
            />
        )}
        {selectClicked && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50"></div>
        )}
    </>
}