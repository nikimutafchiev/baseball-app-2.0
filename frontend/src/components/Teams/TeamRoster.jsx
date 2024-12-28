import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import PlayerSelectList from "../Other/PlayerSelectList";
import useSWR from "swr";
export default function TeamRoster() {
    const [addClicked, setAddClicked] = useState(false);
    const { team_id, id } = useParams();
    const roster = useSWR(`http://localhost:6363/team_tournament/roster/?team_id=${team_id}&tournament_id=${id}`, (url) => fetch(url).then((res) => res.json()));
    const players = useSWR("http://localhost:6363/players", (url) => fetch(url).then((res) => res.json()));
    const taken_players = useSWR(`http://localhost:6363/tournament/taken_players/?tournament_id=${id}`, (url) => fetch(url).then((res) => res.json()));
    const select_list = players.data && taken_players.data ? players.data.filter((player) => !taken_players.data.includes(player.id)) : [];
    useEffect(
        () => { console.log(taken_players.data); roster.mutate() }, [addClicked, taken_players]
    )
    return (<div className="h-fit flex flex-col w-full gap-4 p-4">
        <button className="w-fit flex flex-row self-end items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold " onClick={() => setAddClicked(true)}>
            {<RiAddCircleLine />} ADD PLAYER
        </button>
        <div className="flex flex-col gap-4">
            {roster.data && roster.data.sort((a, b) => a.uniformNumber - b.uniformNumber).map((player) => (
                <div
                    className="bg-white rounded-lg shadow-sm  flex flex-row items-center justify-between gap-4 p-4"
                >
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center justify-center size-12 bg-primary_1 text-white text-xl font-semibold rounded-full">
                            {player.uniformNumber}
                        </div>

                        <div className="flex flex-col">
                            <div className="text-xl font-semibold">
                                {player.firstName} {player.lastName}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {new Date(player.dateOfBirth).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="text-sm font-medium content-center text-gray-800 bg-gray-200 py-1 px-3 rounded-full">
                            {player.country}
                        </div>
                        <Link className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded  font-semibold text-sm" to={``}>View more</Link>
                    </div>
                </div>

            ))}
            {roster.data && roster.data.length == 0 && <div className="text-2xl">Oops, no players here yet.</div>}
        </div>
        {addClicked && <PlayerSelectList close={() => setAddClicked(false)} players={select_list} />}
        {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}</div>
    );

}