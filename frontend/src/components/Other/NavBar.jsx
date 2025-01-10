import { BiBaseball } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoNotificationsOutline, IoReorderThreeOutline } from "react-icons/io5";
import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";
import {
  RiTeamLine,
  RiHome6Line,
  RiCalendarScheduleLine,
  RiUserLine,
  RiMedalLine,
} from "react-icons/ri";
export default function NavBar() {
  const pages = [
    { name: "Home", path: "/", logo: <RiHome6Line size={27} /> },
    {
      name: "Schedule",
      path: "/schedule",
      logo: <RiCalendarScheduleLine size={27} />,
    },
    { name: "Teams", path: "/teams", logo: <RiTeamLine size={27} /> },
    { name: "Players", path: "/players", logo: <BiBaseball size={27} /> },

    {
      name: "Tournaments",
      path: "/tournaments",
      logo: <RiMedalLine size={27} />,
    },
    { name: "Guide", path: "/guide" },
    { name: "Profile", path: "/profile/info", logo: <RiUserLine size={27} /> },
  ];
  const { logout, token } = useAuth();
  const [isExtendClicked, setIsExtendClicked] = useState(false);
  return (
    <header
      className={`w-screen sticky z-10 top-0 ${
        isExtendClicked ? "h-screen" : "h-[10vh]"
      } bg-gradient-to-r from-primary_1 to-primary_3 drop-shadow-2xl`}
    >
      {!isExtendClicked && (
        <nav className="min-w-full h-full flex flex-row justify-between items-center px-12">
          <Link class="flex flex-row gap-2 items-center" to="/">
            <BiBaseball size={32} color="white" />
            <div className="text-base lg:text-xl text-white font-semibold">
              Baseball App
            </div>
          </Link>
          <div className="flex flex-row gap-5 text-white ">
            <div className="lg:flex lg:flex-row lg:gap-1 md:text-sm lg:text-base hidden">
              {pages.map((page) => (
                <Link
                  className=" rounded cursor-pointer content-center px-4 py-2 hover:bg-white hover:text-primary_2 duration-200 ease-in-out font-semibold"
                  to={page.path}
                >
                  {page.name}
                </Link>
              ))}
              {token && (
                <>
                  <button
                    onClick={() => logout()}
                    className="hover:bg-white hover:text-primary_2 p-2 rounded  duration-200 ease-in-out"
                  >
                    <FiLogOut size={27} />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden text-white">
            <IoReorderThreeOutline
              size={30}
              onClick={() => setIsExtendClicked(!isExtendClicked)}
            />
          </div>
        </nav>
      )}

      {isExtendClicked && (
        <nav className="w-full h-full flex flex-col gap-10 px-12 ">
          <div className="h-[10vh] flex flex-row justify-between items-center w-full">
            <Link class="flex flex-row gap-2 items-center" to="/">
              <BiBaseball size={32} color="white" />
              <div className="text-base lg:text-xl text-white font-semibold">
                Baseball App
              </div>
            </Link>
            <div className="md:hidden text-white">
              <IoReorderThreeOutline
                size={30}
                onClick={() => setIsExtendClicked(!isExtendClicked)}
              />
            </div>
          </div>

          <div className=" flex flex-col gap-3 text-white ">
            <div className="flex flex-col w-full mx-2 gap-2 md:hidden text-xl font-semibold">
              {pages.map((page) => (
                <Link
                  onClick={() => setIsExtendClicked(false)}
                  className="flex flex-row rounded cursor-pointer items-center px-3 py-2 hover:bg-white justify-between hover:text-primary_2 duration-200 ease-in-out "
                  to={page.path}
                >
                  {page.name}
                  {page.logo}
                </Link>
              ))}
              {token && (
                <>
                  <button
                    onClick={() => {
                      setIsExtendClicked(false);
                      logout();
                    }}
                    className="flex flex-row justify-between items-center px-3 py-2 hover:bg-white hover:text-primary_2 p-2 rounded  duration-200 ease-in-out"
                  >
                    Log out <FiLogOut size={27} />
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
