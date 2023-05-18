const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('/home/striker/mountblue/JavaScript/src/data/matches.csv')
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {
        const matchPlayedPerYear = new Map();
        for (i = 0; i < results.length; i++) {
            if (matchPlayedPerYear.has(results[i].season)) {
                matchPlayedPerYear.set(results[i].season, matchPlayedPerYear.get(results[i].season) + 1);
            }
            else {
                matchPlayedPerYear.set(results[i].season, 1);
            }
        }
        console.log(matchPlayedPerYear);

        const jsonObject = Object.fromEntries(matchPlayedPerYear);
        const jsonString = JSON.stringify(jsonObject, null, 2);

        // Write the string to a file
        fs.writeFile('/home/striker/mountblue/JavaScript/src/public/output/matchPlayedPerYear.json', jsonString, (error) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            console.log('Output JSON file has been written successfully.');
        });
    });




