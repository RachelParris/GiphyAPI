const topics = ['Beyonce', 'Rihanna', 'Adele', 'Katy Perry'];

// Creates inital search buttons.
topics.forEach(item => {
	const createdBtn = $('<button>').attr({'class': 'btn', 'data-input': item}).html(item);
	createdBtn.appendTo('#search-terms');
});

$('#search-btn').click(event => {
	event.preventDefault();

	// Stores the user's input.
	const userInput = $('#search-field').val();
	const addTopics = topics.push(userInput);
	console.log(topics);

	$(topics).empty();

	const createdBtn = $('<button>').attr({'class': 'btn', 'data-input': userInput}).append(userInput);
	createdBtn.appendTo('#search-terms');
});


$(document.body).on("click", ".btn", () => {
	const trigger = $(this).attr('data-input');
	callSearch(trigger);
});

//Executes the API call.
const callSearch = apiRequest => {
	// Random number generator from 0-1000.
	const randomNum = Math.floor(Math.random() * 1001);

		// Setting up API call.
	const queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&offset=' + randomNum + '&q=' + apiRequest;
	const apiKey = '&api_key=LvdlbUxQi7tdpWDVBVbRROSDOxfVuSMb';

	$.ajax({
		url: queryURL + apiKey,
		method: 'GET'
	})
	.done(response => postGifs(response))
	.fail(err => console.log('API call failed.'))
}

const postGifs = response => {
	const result = response.data;

	for (let i = 0; i < result.length; i++) {
		let imgStill = result[i].images.fixed_height_still.url;
		let imgAnimated = result[i].images.fixed_height.url;
		let link = result[i].url;
		let rating = 'Rated: ' + result[i].rating.toUpperCase();

		let gifDiv = $('<div class="item">');
		let par = $('<p>').text(rating);
		let giphyLink = $('<p>').html('<a href=' + link + ' target="_blank">Link</a>');
		let img = $('<img>').attr({'src': imgStill, 'class' : 'test',  'data-state': 'still', 'data-animate': imgAnimated, 'data-still': imgStill});

		gifDiv.prepend(par);
		gifDiv.prepend(giphyLink);
		gifDiv.prepend(img);

		$('#gifs').prepend(gifDiv);
	}
}

// Toggle between still and animated states of image.
$(document).on("click", 'img', () => {
	const state = $(this).attr("data-state");
	if ( state === "still") {
		$(this).attr({'data-state': 'animate'});
		$(this).attr("src", $(this).attr("data-animate"));
	} else {
		$(this).attr({'data-state': 'still'});
		$(this).attr("src", $(this).attr("data-still"));
	}
});
