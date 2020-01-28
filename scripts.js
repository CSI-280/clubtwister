const pf = new petfinder.Client({
	apiKey: "HB4E0LPBodtgXJlBVOYvZSDaxgGSCA7Li7Eq6tqb6uVDRfzAp4",
	secret: "ACCq1YmJ2XzZxT6WrvbSU9voepnbCllw0NmSF363"
});


function getType(animalType) {
	pf.animal.search({
			type: animalType
		})
		.then(function (response) {
			// Do something with `response.data.animals`
			var numAnimals = Object.keys(response.data.animals).length;
			var animals = response.data.animals;

			for (var i = 0; i < numAnimals; i++) {
				var currentSlot = document.getElementById(i);
				currentSlot.innerHTML = `<td><button id='pfbtn' onclick="showInfo(${animals[i].id}, ${i})">${animals[i].name}</button></td>`;
				currentSlot.innerHTML += `<td>${animals[i].breeds.primary}</td>`;
				currentSlot.innerHTML += `<td>${animals[i].age}</td>`;
				currentSlot.innerHTML += `<td>${animals[i].contact.address.city}, ${animals[i].contact.address.state}</td>`;
			}

			console.log(animals[0]);


		})
		.catch(function (error) {
			// Handle the error
		});

}

// function showInfo(petID, row){
// 	var profile = document.getElementsByClassName(`pf ${row}`);
// 	pf.animal.search({id: petID}).then(
// 		function (response){
// 			let pet = response.data.animals[0];
// 			console.log(pet)
// 			profile[0].style.display = 'table-row'
// 		}
// 	)
// }