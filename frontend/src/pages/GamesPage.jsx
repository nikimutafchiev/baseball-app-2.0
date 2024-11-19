import TournamentGamesList from "../components/TournamentGamesList";
import { RiAddCircleLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
export default function GamesPage() {
    return (
        <div className="p-10">
            <div className="flex flex-row  justify-between">
                <button className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-2xl">
                    {<RiAddCircleLine />} ADD TOURNAMENT
                </button>
                <TextField label={<div className="flex flex-row gap-1 items-center"><FiSearch /><div>Search</div></div>} className="bg-white w-1/4" />
            </div>
            <TournamentGamesList />
        </div>)
}