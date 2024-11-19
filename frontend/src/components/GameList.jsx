import Game from "./Game";
export default function GameList() {
    const games = [
        { datetime: "2024-01-15T18:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/40x40", teamName: "Levski FC", result: 2 }, away: { logo: "https://placehold.co/40x40", teamName: "CSKA Sofia", result: 1 }, status: "ended" },
        { datetime: "2024-01-16T15:30:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Ludogorets", result: 3 }, away: { logo: "https://placehold.co/40x40", teamName: "Beroe", result: 3 }, status: "live" },
        { datetime: "2024-01-17T20:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/40x40", teamName: "Cherno More", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Lokomotiv Plovdiv", result: 0 }, status: "scheduled" },
        { datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/40x40", teamName: "Arda Kardzhali", result: 2 }, status: "ended" },
        { datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/40x40", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/40x40", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live" },
    ];

    return (
        <div className="flex flex-col gap-6" >
            {
                games.map((game) =>
                    <Game {...game} />
                )
            }

        </div >)
}