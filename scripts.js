const pf = new petfinder.Client({apiKey: "HB4E0LPBodtgXJlBVOYvZSDaxgGSCA7Li7Eq6tqb6uVDRfzAp4", secret: "ACCq1YmJ2XzZxT6WrvbSU9voepnbCllw0NmSF363"});


function getType(animalType){
	pf.animal.search({type: animalType})
    .then(function (response) {
        // Do something with `response.data.animals`
		var numAnimals = Object.keys(response.data.animals).length;
		var animals = response.data.animals;

		for (var i = 0; i < numAnimals; i++){
			var currentSlot = document.getElementById(i);
			currentSlot.innerHTML = animals[i].name;
			currentSlot.innerHTML += ", " + animals[i].breeds.primary;
		}
		
		console.log(animals[0]);

		
    })
    .catch(function (error) {
        // Handle the error
    });

}



