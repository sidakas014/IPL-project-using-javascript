const fs = require('fs');

function matchPlayedPerYear(matchesResults) {
    const matchPlayedPerYear = new Map();
    for (i = 0; i < matchesResults.length; i++) {
        if (matchPlayedPerYear.has(matchesResults[i].season)) {
            matchPlayedPerYear.set(matchesResults[i].season, matchPlayedPerYear.get(matchesResults[i].season) + 1);
        }
        else {
            matchPlayedPerYear.set(matchesResults[i].season, 1);
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
}

module.exports = matchPlayedPerYear;



