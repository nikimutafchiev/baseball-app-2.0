import { Link } from "react-router-dom";
import useSWR from "swr";

export default function Player(props) {
  const stats = props.stats
    ? props.stats
    : {
        AVG: "0.0",
        BB: "0",
        ERA: "0.0",
        SO: "0.0",
        H: "0",
        OBP: "0.0",
      };
  return (
    <div className="h-[270px] min-w-[200px]">
      <div className="group h-full w-full ease-in-out duration-1000 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
        <div className="rounded max-h-full absolute inset-0 h-full w-full text-white flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 border-gray-400 border-2  drop-shadow-xl ">
          <h3 className="text-lg font-semibold">
            {props.firstName} {props.lastName}
          </h3>
          {props.image && (
            <img className="w-[180px] h-[200px]" src={props.image} />
          )}
        </div>
        <div className="rounded max-h-full absolute inset-0 h-full w-full px-1 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-around bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 items-center border-gray-400 border-2  drop-shadow-xl  py-2">
          <h3 className="text-lg font-semibold">
            {props.firstName} {props.lastName}
          </h3>
          <div className="w-full py-2 flex flex-col gap-2 font-semibold text-3xs flex-1 justify-center items-center">
            {props.height && <div>Height: {props.height}cm</div>}
            {props.weigth && <div>Weigth: {props.weigth}kg</div>}
            {props.dateOfBirth && (
              <div>
                Birthday: {new Date(props.dateOfBirth).toLocaleDateString()}
              </div>
            )}
            {props.battingSide && props.throwingArm && (
              <div>
                Batting/Throwing: {props.battingSide}/{props.throwingArm}
              </div>
            )}
            {props.country && (
              <div className="text-center col-span-2">
                Birthplace: {props.country}
              </div>
            )}
          </div>
          {/* <div>
                        <div className="text-center text-xs ">All time stats</div>
                        <div className="rounded grid grid-cols-3 gap-y-2 gap-x-1 mt-1 bg-opacity-50 bg-gray-500 text-3xs font-semibold p-2 place-items-center">
                            <div>AVG: {stats.AVG}</div>
                            <div>BB: {stats.BB}</div>
                            <div>ERA: {stats.ERA}</div>
                            <div>H: {stats.H}</div>
                            <div>OBP: {stats.OBP}</div>
                            <div>SO: {stats.SO}</div>
                        </div>
                    </div> */}
          <Link
            className="px-3 py-2 bg-primary_2 hover:bg-white hover:text-primary_2 rounded  font-semibold text-sm"
            to={`${props.id}`}
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}
