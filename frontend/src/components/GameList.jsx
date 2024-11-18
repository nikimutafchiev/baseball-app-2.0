import Game from "./Game";
export default function GameList() {
    const games = [
        { datetime: "2024-01-15T18:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/60x60", teamName: "Levski FC", result: 2 }, away: { logo: "https://placehold.co/60x60", teamName: "CSKA Sofia", result: 1 }, status: "ended" },
        { datetime: "2024-01-16T15:30:00Z", home: { logo: "https://placehold.co/60x60", teamName: "Ludogorets", result: 3 }, away: { logo: "https://placehold.co/60x60", teamName: "Beroe", result: 3 }, status: "live" },
        { datetime: "2024-01-17T20:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/60x60", teamName: "Cherno More", result: 0 }, away: { logo: "https://placehold.co/60x60", teamName: "Lokomotiv Plovdiv", result: 0 }, status: "scheduled" },
        { datetime: "2024-01-18T12:00:00Z", home: { logo: "https://placehold.co/60x60", teamName: "Botev Plovdiv", result: 1 }, away: { logo: "https://placehold.co/60x60", teamName: "Arda Kardzhali", result: 2 }, status: "ended" },
        { datetime: "2024-01-19T19:45:00Z", home: { logo: "https://placehold.co/60x60", teamName: "Slavia Sofia", result: 0 }, away: { logo: "https://placehold.co/60x60", teamName: "Etar Veliko Tarnovo", result: 1 }, status: "live" },
        { datetime: "2024-01-20T14:00:00Z", isAdmin: true, home: { logo: "https://placehold.co/60x60", teamName: "CSKA 1948", result: 1 }, away: { logo: "https://placehold.co/60x60", teamName: "Levski FC", result: 1 }, status: "scheduled" },
        { datetime: "2024-01-21T16:00:00Z", home: { logo: "https://placehold.co/60x60", teamName: "Montana", result: 2 }, away: { logo: "https://placehold.co/60x60", teamName: "Pirin Blagoevgrad", result: 3 }, status: "ended" },
        { datetime: "2024-01-22T18:30:00Z", isAdmin: true, home: { logo: "https://placehold.co/60x60", teamName: "Septemvri Sofia", result: 0 }, away: { logo: "https://placehold.co/60x60", teamName: "Hebar Pazardzhik", result: 0 }, status: "scheduled" },
        { datetime: "2024-01-23T20:00:00Z", home: { logo: "https://placehold.co/60x60", teamName: "Loko Sofia", result: 3 }, away: { logo: "https://placehold.co/60x60", teamName: "CSKA Sofia", result: 3 }, status: "live" },
        { datetime: "2024-01-24T17:15:00Z", isAdmin: true, home: { logo: "https://placehold.co/60x60", teamName: "Ludogorets", result: 0 }, away: { logo: "https://placehold.co/60x60", teamName: "Levski FC", result: 1 }, status: "scheduled" }
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