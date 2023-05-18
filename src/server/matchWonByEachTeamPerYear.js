const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('/home/striker/mountblue/JavaScript/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {

        const seasonArray = [];
        for (i = 0; i < results.length; i++) {
            if (!(seasonArray.includes(results[i].season))) {
                seasonArray.push(results[i].season);
            }
        }

        const matchWonByEachTeamPerYear = new Map();
        for (i = 0; i < seasonArray.length; i++) {
            const matchWonByEachTeam = new Map();
            for (j = 0; j < results.length; j++) {
                if (seasonArray[i] == results[j].season) {
                    if (matchWonByEachTeam.has(results[j].winner)) {
                        matchWonByEachTeam.set(results[j].winner, matchWonByEachTeam.get(results[j].winner) + 1);
                    }
                    else {
                        if (results[j].winner != "") {
                            matchWonByEachTeam.set(results[j].winner, 1);
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


    });




