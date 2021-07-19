const express = require('express');
const { animals } = require('./data/animals');

 // instantiate the server
const PORT = process.env.PORT || 3001;
const app = express();


 //create routes that the front-end can request data from

function filterByQuery(query, animalsArray){
	let personalityTraitsArray = [];
	let filteredResults = animalsArray;

	if(query.personalityTraits){
		// Save personalityTraits as a dedicated array.
	    // If personalityTraits is a string, place it into a new array and save.
	    if (typeof query.personalityTraits === 'string') {
	      personalityTraitsArray = [query.personalityTraits];
	    } else {
	      personalityTraitsArray = query.personalityTraits;
	    }

	    // Loop through each trait in the personalityTraits array:
	    personalityTraitsArray.forEach(trait => {
	      // Check the trait against each animal in the filteredResults array.
	      // Remember, it is initially a copy of the animalsArray,
	      // but here we're updating it for each trait in the .forEach() loop.
	      // For each trait being targeted by the filter, the filteredResults
	      // array will then contain only the entries that contain the trait,
	      // so at the end we'll have an array of animals that have every one 
	      // of the traits when the .forEach() loop is finished.
	      filteredResults = filteredResults.filter(
	        animal => animal.personalityTraits.indexOf(trait) !== -1
	      );
    	});
	}



	if(query.diet){
		filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
	}
	if (query.species) {
    	filteredResults = filteredResults.filter(animal => animal.species === query.species);
  	}
  	if (query.name) {
    	filteredResults = filteredResults.filter(animal => animal.name === query.name);
    
  	}
  	

  	console.log("filteredResults=", filteredResults);

  	return filteredResults; 

}

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

app.get('/api/animals', (req, res) => {
	// res.send("Hello!");
	//res.json(animals);
	
	let results = animals;
	// console.log("results = ", results);
	console.log(req.query);
	if(req.query){
		results = filterByQuery(req.query, results);
	}
	res.json(results);
});

// to make our server listen

app.listen(PORT, () => {
	console.log("API server now on port 3001!");
});



