$('#search-btn').click(function(event) {
	event.preventDefault();

	// Stores the user's input.
	userInput = $('#search-field').val();
	console.log(userInput);

	// Creates a dynamic button in the search-term div.
	var createdBtn = $('<button>').attr({'class': 'btn', 'data-input': userInput}).html(userInput);
	createdBtn.appendTo('#search-terms');
});


$('.btn').click(function() {
	var trigger = $(this).attr('data-input');
	callSearch(trigger);
});

//Executes the API call.
function callSearch(apiRequest) {
	var randomNum = Math.floor(Math.random() * 1000);

		// Setting up API call.
	var queryURL = 'http://api.giphy.com/v1/gifs/search?limit=10&offset=' + randomNum + '&q=' + apiRequest,
			apiKey = '&api_key=22e070ef831b40b492b87d3a49438799';

	$.ajax({
		url: queryURL + apiKey,
		method: 'GET'
	}).done(function(response) {
		console.log('Success!');
		postGifs(response);

	}).fail(function(err) {
		console.log('API call failed.');
	})
}


function postGifs(response) {
	var result = response.data;

	for (var i = 0; i < result.length; i++) {
		var imgStill = result[i].images.fixed_height_still.url,
			imgAnimated = result[i].images.fixed_height.url;
			link = result[i].url,
			rating = 'Rated: ' + result[i].rating.toUpperCase();

		var gifDiv = $('<div class="item">'),
			par = $('<p>').text(rating),
			img = $('<img>').attr({'src': imgStill, 'data-state': 'still'});

		// var hyperlink = '<a href=' + link + ' targert="_blank">' + link + '</a>';

		gifDiv.prepend(par);
		gifDiv.prepend(img);

		$('#gifs').prepend(gifDiv);
	}

// Toggle between still and animated states of image.
$('img').click(function() {
	var state = $(this).attr("data-state");

	if ( state === "still") {
		$(this).attr({'data-state': 'animate'});
		$(this).attr("src", imgAnimated);
	} else {
		$(this).attr({'data-state': 'still'});
		$(this).attr("src", imgStill);
	}
});
	
}



function toggleGifs() {

}

