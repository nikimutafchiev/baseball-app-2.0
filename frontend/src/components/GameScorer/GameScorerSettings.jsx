
export default function GameScorerSettings(props) {
    return (
        <div className="h-full flex flex-col gap-2 px-4 py-2 text-xl font-bold">
            <div className="rounded flex flex-row  bg-white p-2 border-2 border-gray-300">
                <div className="w-1/3">Max innings:</div> <div className="font-medium ">9</div>
            </div>
            <div className="rounded flex flex-row bg-white p-2 border-2 border-gray-300">
                <div className="w-1/3">Mercy rule:</div> <div className=" font-medium">{[{ inning: 5, points: 15 }, { inning: 7, points: 10 }].map((value) => <div>{`${value.inning} -> ${value.points}`}</div>)}</div>
            </div>
            <div className="rounded flex flex-row  bg-white p-2 border-2 border-gray-300">
                <div className="w-1/3">Max players:</div> <div className=" font-medium ">10</div>
            </div>
        </div>
    );
}