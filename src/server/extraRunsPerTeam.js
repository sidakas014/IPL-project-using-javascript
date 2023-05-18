const fs = require('fs');
const csv = require('csv-parser');

const matchesResults = [];
const deliveriesResults = [];

fs.createReadStream('/home/striker/mountblue/JavaScript/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        matchesResults.push(data);
    })
    .on('end', () => {
        fs.createReadStream('/home/striker/mountblue/JavaScript/src/data/deliveries.csv')
            .pipe(csv())
            .on('data', (data) => {
                deliveriesResults.push(data);
            })
            .on('end', () => {
                const extraRuns = new Map();
                for (i = 0; i < matchesResults.length; i++) {
                    for (j = 0; j < deliveriesResults.length; j++) {
                        if (matchesResults[i].id == deliveriesResults[j].match_id && matchesResults[i].season == "2016") {
                            if (extraRuns.has(deliveriesResults[j].batting_team)) {
                                extraRuns.set(deliveriesResults[j].batting_team, extraRuns.get(deliveriesResults[j].batting_team) + parseInt(deliveriesResults[j].extra_runs));
                            }
                            else {
                                if (deliveriesResults[j].batting_team != "") {
                                    extraRuns.set(deliveriesResults[j].batting_team, parseInt(deliveriesResults[j].extra_runs));
                                }
                            }
                        }
                    }
                }
                console.log(extraRuns);

                const jsonObject = Object.fromEntries(extraRuns);
                const jsonString = JSON.stringify(jsonObject, null, 2);

                // Write the string to a file
                fs.writeFile('/home/striker/mountblue/JavaScript/src/public/output/extraRunsPerTeam.json', jsonString, (error) => {
                    if (error) {
                        console.error('Error:', error);
                        return;
                    }
                    console.log('Output JSON file has been written successfully.');
                });
            });
    });
