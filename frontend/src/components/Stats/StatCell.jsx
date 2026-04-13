
export default function StatsCell({ label, value }) {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white/70 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl transition-all group-hover:scale-150" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <a
                            href="/guide"
                            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-indigo-600"
                        >
                            {label}
                        </a>
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-16" />
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-3xl font-semibold text-slate-800 ">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}