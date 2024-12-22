
const stats = [
    { id: 1, name: "Отбори ползват нашата система", value: 12345 },
    { id: 2, name: "Отбори ползват нашата система", value: 12345 },
    { id: 3, name: "Отбори ползват нашата система", value: 12345 }]


export default function Overview() {
    return (<div className="py-12 px-6">
        <div >
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 text-center ">
                {stats.map((stat) => (
                    <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className=" text-gray-600">{stat.name}</dt>
                        <dd className="order-first text-5xl font-semibold tracking-tight text-line">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>)
}