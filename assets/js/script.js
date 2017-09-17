$('button').click(function(event) {
	event.preventDefault();
	$(this).attr()
});


// Setting up API call.
var url = 'http://api.giphy.com/v1/gifs/search?&q=' + 'beyonce',
		apiKey = '&api_key=22e070ef831b40b492b87d3a49438799&limit=10',
		param = '';


$.ajax({
	url: url + apiKey,
	method: 'GET'
}).done(function(response) {
	console.log('Success!');

	var result = response.data;
	console.log(result);

	for (var i = 0; i < result.length; i++) {

		var imgStill = result[i].images.fixed_height_still.url,
				imgAnimated = result[i].images.fixed_height.url;
				link = result[i].url,
				rating = 'Rated: ' + result[i].rating.toUpperCase();

		var gifDiv = $('<div>'),
				par = $('<p>').text(rating),
				img = $('<img>').attr({'src': imgStill, 'data-still': imgStill, 'data-animate': imgAnimated});

		// var hyperlink = '<a href=' + link + ' targert="_blank">' + link + '</a>';

		gifDiv.prepend(par);
		gifDiv.prepend(img);
		$('#gifs').prepend(gifDiv z);
	}


	// Toggle between still and animated states of image.
	$('img').click(function() {
		var state = $(this).attr("data-state");

		if ( state === "still") {
			// $(this).attr('data-animate');
			// $(this).attr("src", imgAnimated);
		} else {
			$(this).attr({'data-state': 'still'});
			$(this).attr("src", imgStill);
		}
	});
}).fail(function(err) {
	console.log('API call failed.');
})
