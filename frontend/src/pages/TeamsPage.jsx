import TeamList from "../components/Teams/TeamList";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import InputFormTeam from "../components/InputForms/InputFormTeam";
import useSWR from "swr";
import { useAuth } from "../AuthContext";
import { API } from "../global/API";
import { swrFetcher } from "../global/swrFetcher";
import { addIcon, searchIcon } from "../icons/icons";

export default function TeamsPage() {
    const [addClicked, setAddClicked] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const teams = useSWR(`${API}/teams`, swrFetcher);
    useEffect(
        () => { teams.mutate() }
        , [addClicked]);
    const { user } = useAuth();
    return (<div className="flex flex-col px-10 py-4 gap-10">
        <div className="flex flex-row  justify-between">
            {user && user.role == "admin" && <button
                className="w-fit inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-white bg-primary_2 hover:bg-primary_3 font-bold text-base sm:text-lg md:text-xl shadow-lg active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => setAddClicked(true)}>
                {addIcon} CREATE TEAM
            </button>}
            <TextField value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }} label={<div className="flex flex-row gap-1 items-center">{searchIcon}<div>Search</div></div>} className="bg-white w-1/3 md:w-1/4 rounded" />
        </div>
        {addClicked && <InputFormTeam close={() => setAddClicked(false)} />}
        {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
        <TeamList teams={teams} searchInput={searchInput} />
    </div>)
}