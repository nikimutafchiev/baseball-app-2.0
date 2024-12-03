import TournamentGamesList from "../components/TournamentGamesList";
import { RiAddCircleLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import InputFormTournament from "../components/InputFormTournament";
export default function GamesPage() {
    const [addClicked, setAddClicked] = useState(false);
    return (
        <div className="flex flex-col gap-10 p-10">
            <div className="flex flex-row  justify-between">
                <button onClick={() => setAddClicked(true)} className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-2xl">
                    {<RiAddCircleLine />} CREATE TOURNAMENT
                </button>
                <TextField label={<div className="flex flex-row gap-1 items-center"><FiSearch /><div>Search</div></div>} className="bg-white w-1/4 rounded" />
            </div>
            {addClicked && <InputFormTournament close={() => setAddClicked(false)} />}
            {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
            <TournamentGamesList />
        </div>)
}