var pf = new petfinder.Client({apiKey: "my-api-key", secret: "my-api-secret"});

pf.animal.search()
    .then(function (response) {
        // Do something with `response.data.animals`
		console.log("help");
    })
    .catch(function (error) {
        // Handle the error
    });