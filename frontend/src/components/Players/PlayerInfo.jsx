

import { useParams } from "react-router-dom";
import { useState } from "react";


import useSWR from "swr";
import PlayerSelectList from "../Other/PlayerSelectList";
import { API } from "../../global/API";
import { swrFetcher } from "../../global/swrFetcher";
import PlayerDetailedStats from "../Stats/PlayerDetailedStats";
import PlayerStats from "../Stats/PlayerStats";
import PlayerH2HStats from "../Stats/PlayerH2HStats";
export default function PlayerInfo() {
	//const [isEdit, setIsEdit] = useState(false);
	const { id } = useParams();
	const player = useSWR(`${API}/player/${id}`, (url) =>
		fetch(url).then((res) => res.json())
	);

	return (
		<div>
			{player.data && (
				<div className="flex flex-col md:flex-row w-full gap-8 text-white text-sm ">
					<div className="relative md:w-1/5">
						<div className="flex flex-col h-fit bg-gradient-to-br p-4 gap-4 justify-between items-center min-h-[80vh] from-accent_3 via-accent_2 to-accent_1 rounded ">

							<h3 className="text-xl font-semibold">
								{player.data.firstName} {player.data.lastName}
							</h3>
							<img
								className="w-[180px] h-[200px]"
								src={
									player.data.image
										? player.data.image
										: "http://placehold.co/180x200"
								}
							/>
							<div className="flex flex-col gap-0.5 items-center w-full">
								{player.data.height && (
									<div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50">
										<div>Height:</div>{" "}
										<div className="w-fit flex flex-row gap-1">
											<div>{player.data.height}</div>
											<div> cm</div>
										</div>
									</div>
								)}
								{player.data.weigth && (
									<div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50">
										<div>Weigth:</div> <div>{player.data.weigth} kg</div>
									</div>
								)}
								{player.data.dateOfBirth && (
									<div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50">
										<div>Birthday:</div>{" "}
										<div>
											{new Date(player.data.dateOfBirth).toLocaleDateString()}
										</div>
									</div>
								)}
								{player.data.country && (
									<div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50 text-nowrap">
										<div>Birthplace:</div> <div>{player.data.country}</div>
									</div>
								)}
								{player.data.battingSide && player.data.throwingArm && (
									<div className="font-semibold flex flex-row justify-between w-full bg-gray-400 px-2 py-1 rounded bg-opacity-50">
										<div>Batting/Throwing:</div>
										<div>
											{player.data.battingSide}/{player.data.throwingArm}
										</div>{" "}
									</div>
								)}
							</div>
							{/* <button
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
							</button> */}
						</div>
					</div>

					<div className="flex flex-row flex-1 gap-8">
						<div className="flex flex-col flex-1 text-black gap-4 h-fit">
							<PlayerStats id={id} />
							<hr className="border-t-2 border-line"></hr>
							<PlayerDetailedStats id={id} />
							<hr className="border-t-2 border-line"></hr>
							<PlayerH2HStats id={id} player={player.data} />
						</div>
						{/* {isEdit && <InputFormPlayer close={() => setIsEdit(false)} isEdit={true} player={player.data ? player.data : {}} />}
						{isEdit && <div className="fixed inset-0 z-10 bg-black bg-opacity-50" ></div>} */}
					</div >
				</div >
			)
			}

		</div>
	);
}
