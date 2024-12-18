import TournamentList from "../components/Tournaments/TournamentList";
import { RiAddCircleLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import InputFormTournament from "../components/InputForms/InputFormTournament";
import useSWR from "swr";
import { useEffect } from "react";
export default function TournamentsPage() {
    const [addClicked, setAddClicked] = useState(false);
    const tournaments = useSWR("http://localhost:6363/tournaments", (url) => fetch(url).then((res) => res.json()));
    useEffect(
        () => { tournaments.mutate() }
        , [addClicked]);
    return (<div className="flex flex-col gap-10 px-10 py-4">
        <div className="flex flex-row  justify-between">
            <button onClick={() => setAddClicked(true)} className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-2xl">
                {<RiAddCircleLine />} CREATE TOURNAMENT
            </button>
            <TextField label={<div className="flex flex-row gap-1 items-center"><FiSearch /><div>Search</div></div>} className="bg-white w-1/4 rounded" />
        </div>
        {addClicked && <InputFormTournament close={() => setAddClicked(false)} />}
        {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
        <TournamentList tournaments={tournaments} />
    </div>)
}