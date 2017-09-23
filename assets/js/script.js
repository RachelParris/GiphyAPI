var topics = ['Beyonce', 'Rihanna', 'Adele', 'Katy Perry'];

// Creates inital search buttons.
topics.forEach(function(item) {
	var createdBtn = $('<button>').attr({'class': 'btn', 'data-input': item}).html(item);
	createdBtn.appendTo('#search-terms');
	});

$('#search-btn').click(function(event) {
	event.preventDefault();

	// Stores the user's input.
	var userInput = $('#search-field').val(),
			addTopics = topics.push(userInput);
	console.log(topics);

	$(topics).empty();

	var createdBtn = $('<button>').attr({'class': 'btn', 'data-input': userInput}).append(userInput);
	createdBtn.appendTo('#search-terms');
});


$(document.body).on("click", ".btn", function() {
	var trigger = $(this).attr('data-input');
	callSearch(trigger);
});

//Executes the API call.
function callSearch(apiRequest) {
	// Random number generator from 0-1000.
	var randomNum = Math.floor(Math.random() * 1001);

		// Setting up API call.
	var queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&offset=' + randomNum + '&q=' + apiRequest,
			apiKey = '&api_key=LvdlbUxQi7tdpWDVBVbRROSDOxfVuSMb';

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
			giphyLink = $('<p>').html('<a href=' + link + ' target="_blank">Link</a>'),
			img = $('<img>').attr({'src': imgStill, 'class' : 'test',  'data-state': 'still', 'data-animate': imgAnimated, 'data-still': imgStill});

		gifDiv.prepend(par);
		gifDiv.prepend(giphyLink)
		gifDiv.prepend(img);

		$('#gifs').prepend(gifDiv);
	}
}

// Toggle between still and animated states of image.
$(document).on("click", 'img', function() {
	var state = $(this).attr("data-state");
	if ( state === "still") {
		$(this).attr({'data-state': 'animate'});
		$(this).attr("src", $(this).attr("data-animate"));
	} else {
		$(this).attr({'data-state': 'still'});
		$(this).attr("src", $(this).attr("data-still"));
	}
});
