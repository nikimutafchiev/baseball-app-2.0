import PlayerList from "../components/PlayerList";
import { RiAddCircleLine } from "react-icons/ri";
import { useState } from "react";
import InputFormPlayer from "../components/InputFormPlayer";
export default function PlayersPage() {
    const [addClicked, setAddClicked] = useState(false);
    return (
        <div className="flex flex-col p-10">
            <button className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-white bg-primary_2 hover:bg-primary_3 font-semibold text-2xl" onClick={() => setAddClicked(true)}>
                {<RiAddCircleLine />} ADD PLAYER
            </button>
            {addClicked && <InputFormPlayer close={() => setAddClicked(false)} />}
            {addClicked && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>}
            <PlayerList />
        </div>)
}