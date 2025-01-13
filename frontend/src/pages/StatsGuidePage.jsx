export default function StatsGuidePage() {
	return (
		<div className="min-h-[90vh] p-4">
			<h1 className="text-5xl font-semibold mb-4">
				Stats guide
			</h1>
			<div className="w-full p-2 h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
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
						formula: "2B + 3B + HR",
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
						formula: "TB/AB",
						seeAlso: ["TB", "AB"]
					},
					{
						abbreviation: "AB",
						name: "At bat",
						description: (
							<div>
								An official at-bat comes when a batter reaches base via a fielder's choice, hit or an error (not including catcher's interference) or when a batter is put out on a non-sacrifice.</div>
						),
						seeAlso: ["FC", "H", "ROE"]
					},
					{
						abbreviation: "CS",
						name: "Caught stealing",
						description: (
							<div>
								A caught stealing occurs when a runner attempts to steal but is tagged out before reaching second base, third base or home plate.</div>
						)
					},
					{
						abbreviation: "GSH",
						name: "Grand slam",
						description: (
							<div>
								A grand slam occurs when a batter hits a home run with men on first base, second base and third base. Four runs score on a grand slam -- the most possible on one play -- and a batter is awarded four RBIs.</div>
						)
					},
					{
						abbreviation: "IBB",
						name: "Intentional walk",
						description: (
							<div>
								An intentional walk occurs when the defending team elects to walk a batter on purpose, putting him on first base instead of letting him try to hit.</div>
						)
					},
					{
						abbreviation: "LOB",
						name: "Left on base",
						description: (
							<div>
								In an individual batter's case, it refers to how many men remain on base after that batter makes an out at the plate, as the batter has failed to do his job to score those runners -- or at least put himself in a position to score.
								In a team's case or in an individual pitcher's case, it refers to the number of men who remain on base at the end of an inning.</div>
						)
					},
					{
						abbreviation: "OPS",
						name: "On-base plus slugging",
						description: (
							<div>
								OPS adds on-base percentage and slugging percentage to get one number that unites the two. It's meant to combine how well a hitter can reach base, with how well he can hit for average and for power.</div>
						),
						formula: "(OBP + SLG)/2",
						seeAlso: ["OBP", "SLG"]
					},
					{
						abbreviation: "ROE",
						name: "Reached on error",
						description: (
							<div>
								A batter receives a reached on error when he reaches base because of a defensive error - meaning he wouldn't have otherwise reached.</div>
						)
					},
					{
						abbreviation: "R",
						name: "Run",
						description: (
							<div>
								A player is awarded a run if he crosses the plate to score his team a run.</div>
						)
					},
					{
						abbreviation: "RBI",
						name: "Runs batted in",
						description: (
							<div>
								A batter is credited with an RBI in most cases where the result of his plate appearance is a run being scored. There are a few exceptions, however. A player does not receive an RBI when the run scores as a result of an error or ground into double play.</div>
						)
					},
					{
						abbreviation: "SB",
						name: "Stolen base",
						description: (
							<div>
								A stolen base occurs when a baserunner advances by taking a base to which he isn't entitled. This generally occurs when a pitcher is throwing a pitch, but it can also occur while the pitcher still has the ball or is attempting a pickoff, or as the catcher is throwing the ball back to the pitcher.</div>
						)
					},
					{
						abbreviation: "TB",
						name: "Total bases",
						description: (
							<div>
								Total bases refer to the number of bases gained by a batter through his hits.</div>
						),
						formula: "1B + 2*2B + 3*3B + 4*HR",
						seeAlso: ["1B", "2B", "3B", "HR"]
					},
					{
						abbreviation: "PO",
						name: "Putout",
						description: (
							<div>
								A fielder is credited with a putout when he is the fielder who physically records the act of completing an out -- whether it be by stepping on the base for a forceout, tagging a runner, catching a batted ball, or catching a third strike. A fielder can also receive a putout when he is the fielder deemed by the official scorer to be the closest to a runner called out for interference.</div>
						),
					},
					{
						abbreviation: "A",
						name: "Assist",
						description: (
							<div>
								An assist is awarded to a fielder who touches the ball before a putout is recorded by another fielder.</div>
						),
					},
					{
						abbreviation: "E",
						name: "Error",
						description: (
							<div>
								A fielder is given an error if, in the judgment of the official scorer, he fails to convert an out on a play that an average fielder should have made. Fielders can also be given errors if they make a poor play that allows one or more runners to advance on the bases.</div>
						),
					},
					{
						abbreviation: "FIP",
						name: "Fielding percentage",
						description: (
							<div>
								Fielding percentage answers the question: How often does a fielder or team make the play when tasked with fielding a batted ball, throwing a ball, or receiving a thrown ball for an out.</div>
						),
						formula: "(PO + A)/TC",
						seeAlso: ["PO", "A", "TC"]
					},
					{
						abbreviation: "TC",
						name: "Total chances",
						description: (
							<div>
								In theory, a defender's total chances represent the number of opportunities he has to record an out.</div>
						),
						formula: "PO + A + E",
						seeAlso: ["PO", "A", "E"]
					},
					{
						abbreviation: "SF",
						name: "Sacrifice fly",
						description: (
							<div>
								A sacrifice fly occurs when a batter hits a fly-ball out to the outfield or foul territory that allows a runner to score. The batter is given credit for an RBI.</div>
						),
					},
					{
						abbreviation: "BABIP",
						name: "Batting average on balls in play",
						description: (
							<div>
								In theory, a defender's total chances represent the number of opportunities he has to record an out.</div>
						),
						formula: "(H - HR)/(AB - SO - HR + SF)",
						seeAlso: ["H", "HR", "AB", "SO", "SF"]
					},
					{
						abbreviation: "RC",
						name: "Runs created",
						description: (
							<div>
								Runs Created estimates a player's offensive contribution in terms of total runs. It combines a player's ability to get on base with his ability to hit for extra bases.</div>
						),
						formula: "TB x (H + BB) / (AB + BB)",
						seeAlso: ["TB", "H", "BB", "AB"]
					},



				]
					.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation))
					.map((stat) => (
						<div
							className="bg-white py-6 px-4 rounded-xl drop-shadow-lg flex flex-col gap-3 scroll-mt-[12vh] p-1"
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
										{stat.seeAlso.sort((a, b) => a.localeCompare(b)).map((a) => <a onClick={() => {
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
