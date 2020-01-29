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

function showInfo(petID, row){
	console.log(petID);
	let profiles = document.getElementsByClassName('pf');
	var currentSlot = profiles[row];
	if (currentSlot.style.display=='none') {
		pf.animal.show(petID).then(
			function (response){
				console.log(response.data.animal);
				var pet = response.data.animal;
				if (pet.photos.length > 0)
					var image = pet.photos[0].small;
				else
					var image = "";
				currentSlot.innerHTML = `<td> <img alt='no image found' style="margin:0; padding:0;" src="${image}"></td>`
				currentSlot.innerHTML += `<td colspan='3'>Meet ${pet.name}<br>${pet.description}!<br>
									      Breed: ${pet.breeds.primary} <br>
									      Gender: ${pet.gender} <br>
										  Age: ${pet.age}</td>`;
			}
		);

		currentSlot.style.display = 'table-row';
	} else {
		currentSlot.style.display = 'none';

	}
}
