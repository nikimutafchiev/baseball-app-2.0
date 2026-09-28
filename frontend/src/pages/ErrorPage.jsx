import { Link } from "react-router-dom";
import { RiErrorWarningLine, RiHome4Line, RiRefreshLine } from "react-icons/ri";

export default function ErrorPage() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-3xl p-8 md:p-10 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">

                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <RiErrorWarningLine size={40} />
                </div>

                <span className="text-xs font-semibold uppercase tracking-widest text-red-500 bg-red-50/80 px-3 py-1 rounded-full mb-3">
                    HTTP 500
                </span>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    Unexpected error occurred
                </h1>

                <p className="text-sm text-gray-500 font-normal mb-8 leading-relaxed">
                    Something went wrong on our end. Don't worry, your data is safe. Try refreshing the page or head back home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white font-medium text-sm shadow-md shadow-gray-900/10 transition-all duration-200"
                    >
                        <RiRefreshLine size={18} />
                        <span>Refresh Page</span>
                    </button>

                    <Link
                        to="/"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 active:scale-[0.98] text-gray-700 font-medium text-sm shadow-sm transition-all duration-200"
                    >
                        <RiHome4Line size={18} />
                        <span>Back Home</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}