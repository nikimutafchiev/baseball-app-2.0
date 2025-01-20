import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <div className="w-full min-h-[90vh] py-10 bg-no-repeat bg-cover place-content-center" style={{ "background-image": "url('baseball_hero.jpg')" }}>
            <div className="mx-auto max-w-2xl py-24 bg-opacity-60 rounded-xl bg-zinc-400 backdrop-blur-sm px-4">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-black ">
                        Система за въвеждане и анализ на бейзболни мачове
                    </h1>
                    {/* <p className="mt-8 text-pretty text-lg font-medium text-gray-700">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat.
                    </p> */}
                    <div className="mt-14 ">
                        <Link
                            to={"/schedule"}
                            className="rounded-md bg-accent_1 px-5 py-2.5 font-semibold text-white text-sm shadow-sm hover:bg-accent_2 duration-150 ease-in-out"
                        >
                            Към игрите
                        </Link>
                    </div>
                </div>
            </div>

        </div>)
}