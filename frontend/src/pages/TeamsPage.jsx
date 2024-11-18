import TeamList from "../components/TeamList";
import { RiAddCircleLine } from "react-icons/ri";

export default function TeamsPage() {
    return (<div className="flex flex-col p-10">
        <button className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-4xl">
            {<RiAddCircleLine />} ADD TEAM
        </button>
        <TeamList />
    </div>)
}