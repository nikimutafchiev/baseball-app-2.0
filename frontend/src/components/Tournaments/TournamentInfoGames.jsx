import GameList from "../Games/GameList";
import { RiAddCircleLine } from "react-icons/ri";

export default function TournamentInfoGames() {
    return (<div className="flex flex-col w-full gap-4">
        <button className="w-fit flex flex-row self-end items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold ">
            {<RiAddCircleLine />} ADD GAME
        </button>
        <GameList size="small" />
    </div>)
}