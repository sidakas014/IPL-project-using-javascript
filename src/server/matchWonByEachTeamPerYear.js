const fs = require('fs');

function matchWonByEachTeamPerYear(matchesResults) {
    const seasonArray = [];
    for (i = 0; i < matchesResults.length; i++) {
        if (!(seasonArray.includes(matchesResults[i].season))) {
            seasonArray.push(matchesResults[i].season);
        }
    }

    const matchWonByEachTeamPerYear = new Map();
    for (i = 0; i < seasonArray.length; i++) {
        const matchWonByEachTeam = new Map();
        for (j = 0; j < matchesResults.length; j++) {
            if (seasonArray[i] == matchesResults[j].season) {
                if (matchWonByEachTeam.has(matchesResults[j].winner)) {
                    matchWonByEachTeam.set(matchesResults[j].winner, matchWonByEachTeam.get(matchesResults[j].winner) + 1);
                }
                else {
                    if (matchesResults[j].winner != "") {
                        matchWonByEachTeam.set(matchesResults[j].winner, 1);
                    }
                }
            }
        }
        const newMatchWonByEachTeam = Array.from(matchWonByEachTeam);
        matchWonByEachTeamPerYear.set(seasonArray[i], newMatchWonByEachTeam);

        console.log(seasonArray[i]);
        console.log(newMatchWonByEachTeam);

    }
    const jsonObject = Object.fromEntries(matchWonByEachTeamPerYear);
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Write the string to a file
    fs.writeFile('/home/striker/mountblue/JavaScript/src/public/output/matchWonByEachTeamPerYear.json', jsonString, (error) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
        console.log('Output JSON file has been written successfully.');
    });
}

module.exports = matchWonByEachTeamPerYear;




