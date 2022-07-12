const {animals} = require('./data/animals');
const express = require('express');
const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //Save personalityTraits as dedidcated array
        //If personalitytraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
    } else {
        personalityTraitsArray = query.personalityTraits;
    }
    //Loop through each trait in the pesonalityTraits array
    personalityTraitsArray.forEach(trait => {
        //Check the trait against each animal in the filteredResults array
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
    });
    }
if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
}
if (query.sepcies) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);    }
if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
}
//return the filtered results:
return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
app.listen(3001, () => {
    console.log('API server now on port 3001!');
})