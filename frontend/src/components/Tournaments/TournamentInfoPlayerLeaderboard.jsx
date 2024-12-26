import { ToggleButton, ToggleButtonGroup } from "@mui/material"
export default function TournamentInfoPlayerLeaderboard() {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded self-center drop-shadow-lg">
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                >
                    <ToggleButton>Batting</ToggleButton>
                    <ToggleButton>Pitching</ToggleButton>
                    <ToggleButton>Fielding</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-6 gap-y-10">
                {["AVG", "OBP", "OPS", "H", "BB", "SO"].map((stat) => (
                    <div className="w-full flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{stat}</h3>
                        <div className="w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="flex flex-col bg-primary_2  hover:bg-primary_2_hover p-4 cursor-pointer ">
                                <h4 className="text-xl font-semibold text-white mb-2">
                                    #1 - Evgenii Chernozemsky
                                </h4>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Top Player"
                                        className="size-10 rounded-full border border-gray-300"
                                    />
                                    <div className="text-sm text-white">Blues Sofia</div>
                                </div>
                                <div className="text-2xl font-bold text-white text-right mt-2">
                                    0.999
                                </div>
                            </div>
                            {[
                                {
                                    leaderboardPlace: 2,
                                    name: "Petar Petrov",
                                    teamName: "CSKA Sofia",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.689,
                                },
                                {
                                    leaderboardPlace: 3,
                                    name: "Georgi Georgiev",
                                    teamName: "Levski Sofia",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.675,
                                },
                                {
                                    leaderboardPlace: 4,
                                    name: "Dimitar Dimitrov",
                                    teamName: "Ludogorets Razgrad",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.662,
                                },
                                {
                                    leaderboardPlace: 5,
                                    name: "Todor Todorov",
                                    teamName: "Cherno More",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.650,
                                },
                                {
                                    leaderboardPlace: 6,
                                    name: "Nikolay Nikolov",
                                    teamName: "Botev Plovdiv",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.639,
                                },
                                {
                                    leaderboardPlace: 7,
                                    name: "Kiril Kirilov",
                                    teamName: "Lokomotiv Plovdiv",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.625,
                                },
                                {
                                    leaderboardPlace: 8,
                                    name: "Vasil Vasilev",
                                    teamName: "Slavia Sofia",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.612,
                                },
                                {
                                    leaderboardPlace: 9,
                                    name: "Stanislav Stanev",
                                    teamName: "Septemvri Sofia",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.600,
                                },
                                {
                                    leaderboardPlace: 10,
                                    name: "Atanas Atanasov",
                                    teamName: "Beroe Stara Zagora",
                                    teamLogo: "https://placehold.co/20x20",
                                    statValue: 0.585,
                                },
                            ].map((player) => (
                                <div
                                    className="flex flex-row items-center justify-between px-4 py-3 hover:bg-gray-50 transition duration-200 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-500 font-semibold">
                                            {player.leaderboardPlace}
                                        </div>
                                        <img
                                            src={player.teamLogo}
                                            className="size-5 rounded-full"
                                        />
                                        <div className="flex flex-col text-sm">
                                            <div className="font-medium text-gray-800">{player.name}</div>
                                            <div className="text-xs text-gray-500">{player.teamName}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {player.statValue.toFixed(3)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </div>)
}