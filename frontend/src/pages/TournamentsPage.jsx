import TournamentList from "../components/Tournaments/TournamentList";
import { TextField } from "@mui/material";
import { useState } from "react";
import InputFormTournament from "../components/InputForms/InputFormTournament";
import useSWR from "swr";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { API } from "../global/API";
import { swrFetcher } from "../global/swrFetcher";
import { addIcon, searchIcon } from "../icons/icons";
export default function TournamentsPage() {
    const [addClicked, setAddClicked] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const tournaments = useSWR(`${API}/tournaments`, swrFetcher);
    useEffect(
        () => { tournaments.mutate() }
        , [addClicked]);
    const { user } = useAuth();
    return (<div className="flex flex-col gap-10 px-10 py-4">
        <div className="flex flex-row  justify-between">
            {user && user.role == "admin" && <button
                onClick={() => setAddClicked(true)}
                className="w-fit inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-white bg-primary_2 hover:bg-primary_3 font-bold text-base sm:text-lg md:text-xl shadow-lg active:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
                {addIcon} CREATE TOURNAMENT
            </button>}
            <TextField value={searchInput} onChange={(e) => setSearchInput(e.target.value)} label={<div className="flex flex-row gap-1 items-center">{searchIcon}<div>Search</div></div>} className="bg-white w-1/3 md:w-1/4 rounded" />
        </div>
        {addClicked && <InputFormTournament close={() => setAddClicked(false)} />}
        {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
        <TournamentList tournaments={tournaments} searchInput={searchInput} />
    </div>)
}