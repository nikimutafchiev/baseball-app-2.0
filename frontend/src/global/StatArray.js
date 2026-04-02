export const get_stat_array = (stat, games) => {
    if (["H", "BB", "SO"].includes(stat))
        return games.map((game) => game.stats[stat]);
    var res = [];
    let temp_stats = {
        PA: 0,
        H: 0,
        AB: 0,
        SO: 0,
        BB: 0,
        HBP: 0,
        AVG: 0,
        SLG: 0,
        "1B": 0,
        "2B": 0,
        "3B": 0,
        HR: 0,
    };
    for (let i = 0; i < games.length; i++) {
        temp_stats["H"] += games[i].stats["H"];
        temp_stats["1B"] += games[i].stats["1B"];
        temp_stats["2B"] += games[i].stats["2B"];
        temp_stats["3B"] += games[i].stats["3B"];
        temp_stats["HR"] += games[i].stats["HR"];
        temp_stats["AB"] += games[i].stats["AB"];
        temp_stats["PA"] += games[i].stats["PA"];
        temp_stats["BB"] += games[i].stats["BB"];
        temp_stats["HBP"] += games[i].stats["HBP"];
        if (stat == "AVG")
            res.push(
                temp_stats["AB"] ? (temp_stats["H"] / temp_stats["AB"]).toFixed(3) : 0
            );
        else if (stat == "SLG")
            res.push(
                temp_stats["AB"]
                    ? (
                        (temp_stats["1B"] +
                            2 * temp_stats["2B"] +
                            3 * temp_stats["3B"] +
                            4 * temp_stats["HR"]) /
                        temp_stats["AB"]
                    ).toFixed(3)
                    : 0
            );
        else if (stat == "OBP") {
            res.push(
                temp_stats["PA"]
                    ? (
                        (temp_stats["H"] +
                            temp_stats["BB"] +
                            temp_stats["HBP"]
                        ) /
                        temp_stats["PA"]
                    ).toFixed(3)
                    : 0
            )
        }

    }
    return res;
};