import { RiLiveLine } from "react-icons/ri"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function GameInfo() {
    const stats = [
        {
            "Order": 1,
            "Name": "Andersson, Erik CF",
            "AB": 4,
            "R": 1,
            "H": 2,
            "RBI": 1,
            "BB": 0,
            "SO": 0,
            "AVG": 0.500,
            "OPS": 1.200
        },
        {
            "Order": 2,
            "Name": "Karlsson, Johan LF",
            "AB": 3,
            "R": 0,
            "H": 0,
            "RBI": 0,
            "BB": 1,
            "SO": 2,
            "AVG": 0.000,
            "OPS": 0.333
        },
        {
            "Order": 3,
            "Name": "Svensson, Lars SS",
            "AB": 5,
            "R": 2,
            "H": 3,
            "RBI": 2,
            "BB": 0,
            "SO": 1,
            "AVG": 0.600,
            "OPS": 1.500
        },
        {
            "Order": 4,
            "Name": "Nilsson, Mats 1B",
            "AB": 4,
            "R": 1,
            "H": 1,
            "RBI": 0,
            "BB": 1,
            "SO": 1,
            "AVG": 0.250,
            "OPS": 0.850
        },
        {
            "Order": 5,
            "Name": "Johansson, Fredrik DH",
            "AB": 3,
            "R": 0,
            "H": 1,
            "RBI": 0,
            "BB": 0,
            "SO": 2,
            "AVG": 0.333,
            "OPS": 0.600
        },
        {
            "Order": 6,
            "Name": "Olsson, Peter C",
            "AB": 4,
            "R": 2,
            "H": 2,
            "RBI": 3,
            "BB": 0,
            "SO": 0,
            "AVG": 0.500,
            "OPS": 1.800
        },
        {
            "Order": 7,
            "Name": "Pettersson, Oskar 3B",
            "AB": 2,
            "R": 0,
            "H": 0,
            "RBI": 0,
            "BB": 1,
            "SO": 1,
            "AVG": 0.000,
            "OPS": 0.250
        },
        {
            "Order": 8,
            "Name": "Lindberg, Henrik RF",
            "AB": 3,
            "R": 1,
            "H": 1,
            "RBI": 1,
            "BB": 0,
            "SO": 0,
            "AVG": 0.333,
            "OPS": 0.900
        },
        {
            "Order": 9,
            "Name": "Berg, Thomas 2B",
            "AB": 4,
            "R": 0,
            "H": 2,
            "RBI": 0,
            "BB": 0,
            "SO": 1,
            "AVG": 0.500,
            "OPS": 1.100
        }
    ];
    const { id } = useParams();
    const game = useSWR(`http://localhost:6363/game/${id}`, (url) => fetch(url).then((res) => res.json()));
    return (<>{
        game.data && <div className="flex flex-row gap-8">
            <div className="flex flex-col bg-white rounded-2xl drop-shadow-lg h-[80vh] w-1/3 p-10 items-center justify-between">
                <div className="flex flex-col text-gray-500 text-xs font-semibold ">
                    <div className="text-center">
                        {game.data.venue}
                    </div>
                    <div className="text-center">
                        {new Date(game.data.startTime).toLocaleString()}
                    </div>
                </div>
                <div className="grid grid-cols-3  w-full">
                    <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                        <img src="https://placehold.co/80x80"></img>
                        {game.data.homeTeam.name}
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center text-2xl font-semibold">
                        <h3>
                            {game.data.homeResult}
                        </h3>
                        -
                        <h3>
                            {game.data.awayResult}
                        </h3>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                        <img src="https://placehold.co/80x80"></img>
                        {game.data.awayTeam.name}
                    </div>
                </div>
                <div className="text-xl font-semibold text-accent_2 flex flex-row gap-1 items-center">
                    <RiLiveLine size={25} /><div>{game.data.status}</div>
                </div>
                <div className="w-full flex flex-row text-xs font-semibold">
                    <div className="w-1/2 text-center">
                        W - Petyo Petkov
                    </div>
                    <div className="w-1/2 text-center">
                        L - Evgenii Chernozemsky
                    </div>
                </div>
                <div className="place-items-center  px-2 py-1 rounded">
                    <table className="table-auto">
                        <thead className="border-b-[1px] border-gray-500 ">
                            <tr>
                                {["Team", 1, 2, 3, 4, 5, 6, 7, 8, 9, "R", "H", "E"].map((value) => <th className="p-1 font-bold">{value}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {[game.data.awayTeam.tlc, 0, 1, 3, 0, 1, 2, 0, 1, 2, 11, 13, 2].map((value) => <td className="text-center font-semibold text-sm p-1">{value}</td>)}
                            </tr>
                            <tr>
                                {[game.data.homeTeam.tlc, 0, 1, 3, 0, 1, 2, 0, 1, 2, 11, 13, 2].map((value) => <td className="text-center font-semibold text-sm p-1">{value}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col p-2 flex-1 bg-white rounded-2xl drop-shadow-lg min-h-[80vh]">

                <div className="w-1/2 self-center">
                    <ToggleButtonGroup
                        color="primary"
                        exclusive
                        size="small"
                        className="w-full"
                    >
                        <ToggleButton className="w-1/2" sx={{ borderColor: "black", borderWidth: "1px" }}><div>Home</div></ToggleButton>
                        <ToggleButton className="w-1/2" sx={{ borderColor: "black", borderWidth: "1px" }}>Away</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Player name</TableCell>
                                    <TableCell>AB</TableCell>
                                    <TableCell>R</TableCell>
                                    <TableCell>H</TableCell>
                                    <TableCell>RBI</TableCell>
                                    <TableCell>BB</TableCell>
                                    <TableCell>SO</TableCell>
                                    <TableCell>AVG</TableCell>
                                    <TableCell>OPS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stats.map((row) => (
                                    <TableRow

                                        key={row.Order}

                                    >

                                        <TableCell component="th" scope="row">
                                            {row.Order}
                                        </TableCell>
                                        <TableCell ><div className={row.Order == 8 ? "ml-8" : ""}>{row.Name}</div></TableCell>
                                        <TableCell>{row.AB}</TableCell>
                                        <TableCell>{row.R}</TableCell>
                                        <TableCell>{row.H}</TableCell>
                                        <TableCell>{row.RBI}</TableCell>
                                        <TableCell>{row.BB}</TableCell>
                                        <TableCell>{row.SO}</TableCell>
                                        <TableCell>{row.AVG}</TableCell>
                                        <TableCell>{row.OPS}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div >
    }</>)
}