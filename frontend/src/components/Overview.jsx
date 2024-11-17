
const stats = [
    { id: 1, name: "Отбори ползват нашата система", value: 12345 },
    { id: 2, name: "Отбори ползват нашата система", value: 12345 },
    { id: 3, name: "Отбори ползват нашата система", value: 12345 }]


export default function Overview() {
    return (<div className="py-12 px-6">
        <div >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-xl text-gray-600">{stat.name}</dt>
                        <dd className="order-first text-7xl font-semibold tracking-tight text-gray-900">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>)
}