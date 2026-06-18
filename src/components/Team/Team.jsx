import Button from '../Button/Button'
export default function TeamCard({data}){
    return (
        <div className="group w-4/12 relative overflow-hidden border border-cyan-500/40 bg-black p-5 transition-all duration-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            {/* Top Status */}
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
                <span className="text-slate-400 font-mono">ID: {data.id}</span>

                <span className="border border-cyan-400 px-3 py-1 text-cyan-400 text-sm font-mono">
                ACTIVE
                </span>
            </div>

            {/* Content */}
            <div className="mt-6 flex gap-6 items-center">
                
                <img
                src={data.url}
                alt={data.name}
                className="
                    h-64 w-48 object-cover
                    grayscale
                    transition-all duration-700
                    group-hover:grayscale-0
                    group-hover:scale-105
                "
                />

                <div>
                    <h2
                        className="
                        text-4xl font-bold font-mono
                        text-cyan-500
                        tracking-wider
                        "
                    >
                        {data.name}
                    </h2>

                    <p className="mt-2 text-slate-500 font-mono tracking-[4px]">
                        // LEAD RESEARCHER
                    </p>
                    <Button children="Instagram"/>
                    <Button children="Linkdin" />
                </div>

            </div>

            {/* Progress */}
            <div className="mt-8">
                <div className="flex justify-between text-slate-500 font-mono">
                <span>SYNC_STATUS</span>
                <span>100%</span>
                </div>

                <div className="mt-2 h-1 bg-slate-800 overflow-hidden">
                <div
                    className="
                    h-full
                    w-0
                    bg-cyan-400
                    transition-all
                    duration-700
                    group-hover:w-full
                    "
                />
                </div>
            </div>

            {/* Hover Line */}
            <div
                className="
                absolute
                bottom-0
                left-0
                h-0,5
                w-0
                bg-cyan-400
                transition-all
                duration-700
                group-hover:w-full
                "
            />
        </div>
    )
}