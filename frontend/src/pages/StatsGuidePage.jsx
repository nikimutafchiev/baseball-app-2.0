export default function StatsGuidePage() {
	return (
		<div className="min-h-[90vh] p-4">
			<h1 className="text-5xl font-semibold mb-4">
				Stats guide
			</h1>
			<div className="w-full p-2 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5">
				{[
					{
						abbreviation: "AVG",
						name: "Average",
						description: (
							<div>
								Average is calculated by dividing player's hits <strong>(H)</strong> to player's at-bats <strong>(AB)</strong>
							</div>
						),
						formula: "H/AB",
						seeAlso: ["H", "AB"]
					},
					{
						abbreviation: "H",
						name: "Hit",
						description: (
							<div>
								A hit occurs when a batter hits the baseball into fair territory and reaches base without doing so via an error or a fielder's choice.
							</div>
						),
					},
					{
						abbreviation: "1B",
						name: "Single", description: (
							<div>
								A single occurs when a batter hits the ball and reaches first base without the help of an intervening error or attempt to put out another baserunner.
							</div>
						),

					},
					{
						abbreviation: "2B",
						name: "Double",
						description: (
							<div>
								A batter is credited with a double when he hits the ball into play and reaches second base without the help of an intervening error or attempt to put out another baserunner.
							</div>
						)
					}, {
						abbreviation: "3B",
						name: "Triple",
						description: (
							<div>
								A triple occurs when a batter hits the ball into play and reaches third base without the help of an intervening error or attempt to put out another baserunner.</div>
						)
					},
					{
						abbreviation: "HR",
						name: "Homerun",
						description: (
							<div>
								A home run occurs when a batter hits a fair ball and scores on the play without being put out or without the benefit of an error.</div>
						)
					},
					{
						abbreviation: "XBH",
						name: "Extra base hit",
						description: (
							<div>
								An extra-base hit is defined as any hit that is not a single, meaning doubles, triples and home runs are all considered extra-base hits.</div>
						),
						seeAlso: ["2B", "3B", "HR"]
					},
					{
						abbreviation: "PA",
						name: "Plate appearance",
						description: (
							<div>
								A plate appearance refers to a batter's turn at the plate.</div>
						)
					},
					{
						abbreviation: "OBP",
						name: "On-base percentage",
						description: (
							<div>
								OBP refers to how frequently a batter reaches base per plate appearance. Times on base include hits, walks and hit-by-pitches, but do not include errors, times reached on a fielder's choice or a dropped third strike. </div>
						),
						formula: "(H + BB + HBP)/PA",
						seeAlso: ["H", "BB", "HBP", "PA"]
					},
					{
						abbreviation: "BB",
						name: "Walk",
						description: (
							<div>
								A walk (or base on balls) occurs when a pitcher throws four pitches out of the strike zone, none of which are swung at by the hitter.</div>
						)
					},
					{
						abbreviation: "HBP",
						name: "Hit by pitch",
						description: (
							<div>
								A hit-by-pitch occurs when a batter is struck by a pitched ball without swinging at it.</div>
						)
					},
					{
						abbreviation: "SLG",
						name: "Slugging percentage",
						description: (
							<div>
								Slugging percentage represents the total number of bases a player records per at-bat.</div>
						),
						formula: "(1B + 2*2B + 3*3B + 4*HR)/AB",
						seeAlso: ["1B", "2B", "3B", "HR", "AB"]
					}

				]
					.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
					.map((stat) => (
						<div
							className="bg-white py-6 px-4 rounded-xl drop-shadow-lg flex flex-col gap-3 scroll-mt-[11vh] p-1"
							id={`guide-${stat.abbreviation}`}
						>
							<div className="flex flex-col gap-1 w-fit">
								<div className="flex flex-row gap-8 items-center px-2">
									<h3 className="text-2xl font-semibold">
										{stat.abbreviation}
									</h3>
									<h6 className="text-sm text-gray-600 font-semibold">
										{stat.name}
									</h6>
								</div>
								<hr className="border-t-2 border-gray-200"></hr>
							</div>

							<div className="text-sm px-2">{stat.description}</div>
							{stat.formula && <div className="font-semibold flex flex-row gap-4 items-center px-2"><div>Formula:</div><div className="text-gray-800 bg-gray-100 p-1 px-2 rounded text-sm">{stat.abbreviation} = {stat.formula}</div></div>}
							{stat.seeAlso &&
								< div className="flex flex-row items-center gap-4 px-2">

									<div className="font-semibold">See also: </div>
									<div className="flex flex-row flex-wrap gap-2">
										{stat.seeAlso.map((a) => <a onClick={() => {
											const element = document.getElementById(`guide-${a}`);
											if (element) {
												element.style.animation = "none";
												void element.offsetHeight; //re-render-ва компонента
												element.style.animation = "glow 2s linear";
											}
										}} className="font-semibold cursor-pointer text-blue-500 hover:text-blue-400 " href={`#guide-${a}`}>
											{a}
										</a>)
										}
									</div>
								</div>}
						</div>
					))}
			</div>
		</div >
	);
}
