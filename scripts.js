const pf = new petfinder.Client({
	apiKey: "xFBAu7j4v4mKSyXNLQEMJfwcK2c8QzPqNCzhEpqFRUc8lUANP5",
	secret: "Y1cVOMkc2Pkry9cYXPpR9fUfSCYVaBUdia2XJaiV"
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

function search(){
	
	var rawParametersArr = document.getElementsByTagName("input");
	var parameters = new Object;
	for (var i = 0; i < rawParametersArr.length; i++){
		currentInput = rawParametersArr[i];
		if (currentInput.name in parameters){
			continue;
		}
		if (currentInput.type == "checkbox"){
			var checkboxGroup = document.getElementsByName(currentInput.name);
			checkedArr = [];
			for (var j = 0; j < checkboxGroup.length; j++){
				if (checkboxGroup[j].checked == true){
					checkedArr.push(checkboxGroup[j].value);
				}
			}
			if (checkedArr.length > 0){
				parameters[currentInput.name] = checkedArr;
			}
		}
		else if (currentInput.type == "radio"){
			if (currentInput.checked && currentInput.value){
				parameters[currentInput.name] = currentInput.value;
			}
		}
		else{
			if (currentInput.value){
				parameters[currentInput.name] = currentInput.value;
			}
		}
	}

	pf.animal.search(parameters).then(function (response) { 
		document.getElementById("hidden").visibility = "visible";
		var numAnimals = Object.keys(response.data.animals).length;
		var animals = response.data.animals;
		for (var i = 0; i < numAnimals; i++) {
			var currentSlot = document.getElementById(i);
			currentSlot.innerHTML = `<td><button id='pfbtn' onclick="showInfo(${animals[i].id}, ${i})">${animals[i].name}</button></td>`;
			currentSlot.innerHTML += `<td>${animals[i].breeds.primary}</td>`;
			currentSlot.innerHTML += `<td>${animals[i].age}</td>`;
			currentSlot.innerHTML += `<td>${animals[i].contact.address.city}, ${animals[i].contact.address.state}</td>`;
		}
	});
}

function getBreeds(type){
	breeds = "Potential breeds for " + type + ": ";
	pf.animalData.breeds(type).then(resp => {
    // Do something with resp.data.breeds
		for (var i = 0; i < resp.data.breeds.length; i++){
			breeds += (resp.data.breeds[i].name)
			if (i == resp.data.breeds.length - 1){
				breeds += " ";
			}else{
				breeds += ", "
			}
		}
	})
	.catch(function (error) {
		// Handle the error
		breeds += "Error, none found";
	});
	setTimeout(() => { document.getElementById("tooltiptext").innerHTML = breeds; }, 2000);
}

