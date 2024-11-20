import TeamList from "../components/TeamList";
import { RiAddCircleLine } from "react-icons/ri";
import { TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import InputFormTeam from "../components/InputFormTeam";

export default function TeamsPage() {
    const [addClicked, setAddClicked] = useState(false);
    return (<div className="flex flex-col p-10">
        <div className="flex flex-row  justify-between">
            <button className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-2xl" onClick={() => setAddClicked(true)}>
                {<RiAddCircleLine />} ADD TEAM
            </button>
            <TextField label={<div className="flex flex-row gap-1 items-center"><FiSearch /><div>Search</div></div>} className="bg-white w-1/4 rounded" />
        </div>
        {addClicked && <InputFormTeam close={() => setAddClicked(false)} />}
        {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
        <TeamList />
    </div>)
}