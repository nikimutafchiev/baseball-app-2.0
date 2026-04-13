import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiSaveLine } from "react-icons/ri";
import TeamSelectList from "../Other/TeamSelectList";
import { API } from "../../global/API";
import { swrFetcher } from "../../global/swrFetcher";
import TeamStats from "../Stats/TeamStats";
import TeamDetailedStats from "../Stats/TeamDetailedStats";
import TeamH2HStats from "../Stats/TeamH2HStats";
export default function TeamInfo() {
	const { id } = useParams();
	const icons = {
		facebook: <FaFacebook size={30} />,
		instagram: <FaInstagram size={30} />,
		website: <FaLink size={30} />,
		youtube: <FaYoutube size={30} />,
	};
	const [isEdit, setIsEdit] = useState(false);
	const team = useSWR(`${API}/team/${id}`, (url) =>
		fetch(url).then((res) => res.json())
	);



	return (
		<>
			{team.data && (
				<div className="w-full h-full flex flex-col md:flex-row gap-4">

					<div className="w-full md:w-1/5 h-fit ">
						<div className="items-center flex flex-col gap-4 bg-white drop-shadow-lg p-2">

							<div className="w-full flex flex-col items-center gap-4">
								<img className="size-[150px]" src={team.data.image ? team.data.image : "https://placehold.co/150x150"}></img>
								<h3 className="text-xl font-semibold">{team.data.name}</h3>
							</div>
							<hr className="border-t-2 w-full"></hr>
							<div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
								<div>Address: {team.data.address}</div>
								<div>Contact: {team.data.contact}</div>
							</div>
							<hr className="border-t-2 w-full"></hr>
							<div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
								<div>Manager: {team.data.manager}</div>
								<div>Head Coach: {team.data.headCoach}</div>
							</div>
							<div className="w-10/12  flex flex-row justify-around mt-2">
								{Object.entries(team.data.socialMedia)
									.filter(([media, page]) => page !== "")
									.map(([media, page]) => (
										<a href={page} target="_blank">
											{icons[media]}
										</a>
									))}
							</div>
							<button
								className={`flex items-center gap-2 px-4 py-2 text-sm bg-white font-medium rounded border-2 transition ${isEdit
									? "border-green-500 text-green-600 hover:bg-green-50"
									: "border-gray-500 text-gray-600 hover:bg-gray-50"
									}`}
								onClick={() => setIsEdit(!isEdit)}
							>
								{isEdit ? (
									<>
										<RiSaveLine size={20} />
										Save
									</>
								) : (
									<>
										<BiEdit size={20} />
										Edit
									</>
								)}
							</button>
						</div>
					</div>

					<div className="flex flex-1 flex-row gap-8">
						<div className="flex flex-1 flex-col gap-4 h-fit">
							<TeamStats id={id} />

							<hr className="border-t-2 border-line"></hr>
							<TeamDetailedStats id={id
							} />
							<hr className="border-t-2 border-line"></hr>
							<TeamH2HStats id={id} />
							{/* <div>
                  <h6 className="text-lg font-semibold">Last 5 games</h6>
                  <div className="flex flex-col w-full gap-2">
                    {[
                      {
                        id: 1,
                        datetime: "2024-01-15T18:00:00Z",
                        isAdmin: true,
                        home: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Levski FC",
                          result: 2,
                        },
                        away: {
                          logo: "https://placehold.co/40x40",
                          teamName: "CSKA Sofia",
                          result: 1,
                        },
                        status: "ended",
                      },
                      {
                        id: 2,
                        datetime: "2024-01-16T15:30:00Z",
                        home: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Ludogorets",
                          result: 3,
                        },
                        away: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Beroe",
                          result: 3,
                        },
                        status: "live",
                      },
                      {
                        id: 3,
                        datetime: "2024-01-17T20:00:00Z",
                        isAdmin: true,
                        home: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Cherno More",
                          result: 0,
                        },
                        away: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Lokomotiv Plovdiv",
                          result: 0,
                        },
                        status: "scheduled",
                      },
                      {
                        id: 4,
                        datetime: "2024-01-18T12:00:00Z",
                        home: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Botev Plovdiv",
                          result: 1,
                        },
                        away: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Arda Kardzhali",
                          result: 2,
                        },
                        status: "ended",
                      },
                      {
                        id: 5,
                        datetime: "2024-01-19T19:45:00Z",
                        home: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Slavia Sofia",
                          result: 0,
                        },
                        away: {
                          logo: "https://placehold.co/40x40",
                          teamName: "Etar Veliko Tarnovo",
                          result: 1,
                        },
                        status: "live",
                      },
                    ].map((game) => (
                      <div className="w-full flex flex-row justify-around px-8 py-2 rounded items-center text-gray-500 bg-white  font-semibold  drop-shadow-xl">
                        <div className="w-1/5 flex flex-col gap-2 items-center">
                          <div className=" font-semibold text-2xs">
                            {new Date(game.datetime).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-row justify-around items-center w-[70%]">
                          <div className="w-[20%] text-xs flex flex-row gap-4 items-center">
                            <div className="w-1/2 text-center">
                              {game.home.teamName}
                            </div>
                            <img src={game.home.logo}></img>
                          </div>
                          <div className="text-xl font-bold w-[10%]">
                            {game.home.result} - {game.away.result}
                          </div>
                          <div className="w-[20%] text-xs flex flex-row gap-4 items-center">
                            <img src={game.away.logo}></img>
                            <div className="w-1/2 text-center text-xs">
                              {game.away.teamName}
                            </div>
                          </div>
                        </div>
                        <Link
                          className="w-[10%] py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-xs ease-in-out text-center duration-150"
                          to={`/games/${game.id}`}
                        >
                          More Info
                        </Link>
                      </div>
                    ))}
                  </div>
                </div> */}
						</div>
					</div>
				</div>

			)}

		</>
	);
}
