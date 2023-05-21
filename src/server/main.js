const fs = require('fs');
const csv = require('csv-parser');

const top10EconomicalBowlers = require('./top10EconomicalBowlers');
const matchPlayedPerYear = require('./matchPlayedPerYear');
const matchWonByEachTeamPerYear = require('./matchWonByEachTeamPerYear');
const extraRunsPerTeam = require('./extraRunsPerTeam');

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

                matchPlayedPerYear(matchesResults);
                matchWonByEachTeamPerYear(matchesResults);
                extraRunsPerTeam(matchesResults, deliveriesResults);
                top10EconomicalBowlers(matchesResults, deliveriesResults);
        })
    });