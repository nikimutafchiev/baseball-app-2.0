import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa";

import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { RiSaveLine } from "react-icons/ri";
import { API } from "../../global/API";
import { Outlet, Link } from "react-router-dom";
export default function TeamInfo() {
  const { id } = useParams();
  const icons = {
    facebook: <FaFacebook size={25} />,
    instagram: <FaInstagram size={25} />,
    website: <FaLink size={25} />,
    youtube: <FaYoutube size={25} />,
  };
  const [isEdit, setIsEdit] = useState(false);
  const team = useSWR(`${API}/team/${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );



  return (
    <>
      {team.data && (
        <div className="w-full h-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[30%] flex flex-col gap-2 h-fit">
            <div className="flex flex-col items-center bg-white drop-shadow-lg rounded-sm p-4">
              <div className="w-full flex flex-col items-center gap-4">
                <div className="relative group">
                  <img
                    className="size-[50px] object-cover rounded-full border-2 border-gray-100"
                    src={team.data.image ? team.data.image : "https://placehold.co/50x50"}
                    alt="Team Logo"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{team.data.name}</h3>
              </div>

              <hr className="my-4 border-t w-full"></hr>

              <div className="w-full grid grid-cols-2 text-gray-500 gap-3 text-xs">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-400 uppercase tracking-wider">Contact Details</span>
                  <p>Address: {team.data.address}</p>
                  <p>Contact: {team.data.contact}</p>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-gray-400 uppercase tracking-wider">Staff</span>
                  <p>Manager: {team.data.manager}</p>
                  <p>Head Coach: {team.data.headCoach}</p>
                </div>
              </div>

              <div className="w-full flex flex-row justify-center gap-4 my-3">
                {Object.entries(team.data.socialMedia)
                  .filter(([_, page]) => page !== "")
                  .map(([media, page]) => (
                    <a key={media} href={page} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                      {icons[media]}
                    </a>
                  ))}
              </div>

              {/* <button
                className={`w-1/2 flex items-center justify-center gap-2 px-2 py-1.5 text-sm font-bold rounded transition-all duration-200 border-2 ${isEdit
                  ? "border-green-500 bg-green-500 text-white shadow-md"
                  : "border-gray-800 bg-gray-800 text-white hover:bg-white hover:text-gray-800"
                  }`}
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? (
                  <><RiSaveLine size={18} /> Save Changes</>
                ) : (
                  <><BiEdit size={18} /> Edit Profile</>
                )}
              </button> */}
            </div>

            <div className="bg-white drop-shadow-lg rounded-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Team Analytics</span>
              </div>
              <nav className="flex flex-col">
                <Link
                  to={"stats"}
                  className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-l-4 border-transparent hover:border-blue-500 transition-all"
                >
                  Team Stats
                </Link>
                <Link
                  to={"detailed_stats"}
                  className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-l-4 border-transparent hover:border-blue-500 transition-all"
                >
                  Detailed Stats
                </Link>
                <Link
                  to={"h2h"}
                  className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-l-4 border-transparent hover:border-blue-500 transition-all"
                >
                  H2H Stats
                </Link>
              </nav>
            </div>

          </div>



          <div className="flex flex-1 flex-row gap-8">
            <div className="flex flex-1 flex-col gap-4 h-fit">
              <Outlet />
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
