const fs = require('fs');

function top10EconomicalBowlers(matchesResults, deliveriesResults) {
    const bowlerTotalBowls = new Map();
    const bowlerTotalRuns = new Map();
    const bowlerEconomy = new Map();
    for (i = 0; i < matchesResults.length; i++) {
        for (j = 0; j < deliveriesResults.length; j++) {
            if (matchesResults[i].id == deliveriesResults[j].match_id && matchesResults[i].season == "2015") {
                if (bowlerTotalBowls.has(deliveriesResults[j].bowler)) {
                    bowlerTotalBowls.set(deliveriesResults[j].bowler, bowlerTotalBowls.get(deliveriesResults[j].bowler) + 1);
                }
                else {
                    if (deliveriesResults[j].bowler != "") {
                        bowlerTotalBowls.set(deliveriesResults[j].bowler, 1);
                    }
                }
            }
        }
    }

    for (i = 0; i < matchesResults.length; i++) {
        for (j = 0; j < deliveriesResults.length; j++) {
            if (matchesResults[i].id == deliveriesResults[j].match_id && matchesResults[i].season == "2015") {
                if (bowlerTotalRuns.has(deliveriesResults[j].bowler)) {
                    bowlerTotalRuns.set(deliveriesResults[j].bowler, bowlerTotalRuns.get(deliveriesResults[j].bowler) + parseInt(deliveriesResults[j].total_runs));
                }
                else {
                    if (deliveriesResults[j].bowler != "") {
                        bowlerTotalRuns.set(deliveriesResults[j].bowler, parseInt(deliveriesResults[j].total_runs));
                    }
                }
            }
        }
    }

    for (i = 0; i < matchesResults.length; i++) {
        for (j = 0; j < deliveriesResults.length; j++) {
            if (matchesResults[i].id == deliveriesResults[j].match_id && matchesResults[i].season == "2015") {
                if (bowlerTotalBowls.has(deliveriesResults[j].bowler)) {
                    economy = parseFloat(bowlerTotalRuns.get(deliveriesResults[j].bowler)) * 6 / parseFloat(bowlerTotalBowls.get(deliveriesResults[j].bowler));
                    bowlerEconomy.set(deliveriesResults[j].bowler, economy);
                }
            }
        }
    }

    const sortedBowlerEconomy = new Map([...bowlerEconomy.entries()].sort((a, b) => a[1] - b[1]));
    const top10EconomicalBowlers = new Map();

    var count = 0;
    for (const [key, value] of sortedBowlerEconomy) {
        count++;
        if (count > 10) {
            break;
        }
        console.log(key, value);
        top10EconomicalBowlers.set(key, value);
    }

    const jsonObject = Object.fromEntries(top10EconomicalBowlers);
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Write the string to a file
    fs.writeFile('/home/striker/mountblue/JavaScript/src/public/output/top10EconomicalBowlers.json', jsonString, (error) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
        console.log('Output JSON file has been written successfully.');
    });
}

module.exports = top10EconomicalBowlers;
    



