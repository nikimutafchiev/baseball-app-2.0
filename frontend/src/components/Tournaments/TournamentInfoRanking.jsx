import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
export default function TournamentInfoRanking() {
    return (<div className="w-full bg-white rounded p-4">
        <h2 className="text-3xl font-semibold mb-4">Rankings</h2>
        <TableContainer >
            <Table sx={{ minWidth: "100 %" }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>W</TableCell>
                        <TableCell>L</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[
                        {
                            "rank": 1,
                            "name": "Akademik Sofia",
                            "logo": "https://placehold.co/40x40",
                            "w": 20,
                            "l": 5
                        },
                        {
                            "rank": 2,
                            "name": "CSKA Sofia",
                            "logo": "https://placehold.co/40x40",
                            "w": 18,
                            "l": 7
                        },
                        {
                            "rank": 3,
                            "name": "Levski Sofia",
                            "logo": "https://placehold.co/40x40",
                            "w": 17,
                            "l": 8
                        },
                        {
                            "rank": 4,
                            "name": "Ludogorets Razgrad",
                            "logo": "https://placehold.co/40x40",
                            "w": 16,
                            "l": 9
                        },
                        {
                            "rank": 5,
                            "name": "Cherno More",
                            "logo": "https://placehold.co/40x40",
                            "w": 15,
                            "l": 10
                        },
                        {
                            "rank": 6,
                            "name": "Botev Plovdiv",
                            "logo": "https://placehold.co/40x40",
                            "w": 13,
                            "l": 12
                        },
                        {
                            "rank": 7,
                            "name": "Lokomotiv Plovdiv",
                            "logo": "https://placehold.co/40x40",
                            "w": 12,
                            "l": 13
                        },
                        {
                            "rank": 8,
                            "name": "Slavia Sofia",
                            "logo": "https://placehold.co/40x40",
                            "w": 10,
                            "l": 15
                        },
                        {
                            "rank": 9,
                            "name": "Septemvri Sofia",
                            "logo": "https://placehold.co/40x40",
                            "w": 8,
                            "l": 17
                        },
                        {
                            "rank": 10,
                            "name": "Beroe Stara Zagora",
                            "logo": "https://placehold.co/40x40",
                            "w": 7,
                            "l": 18
                        }
                    ]
                        .map((row) => (

                            <TableRow
                                key={row.rank}
                            >

                                <TableCell component="th" scope="row">
                                    <div className="font-semibold">{row.rank}</div>
                                </TableCell>
                                <TableCell><div className="flex flex-row items-center gap-4"><img src={`${row.logo}`}></img>{row.name}</div></TableCell>
                                <TableCell>{row.w}</TableCell>
                                <TableCell>{row.l}</TableCell>

                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>


    </div>)
}