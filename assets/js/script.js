console.log('hello world');

$('button').click(function(event) {
	event.preventDefault();
	$(this).attr()
});


// Setting up API call.
var url = 'http://api.giphy.com/v1/gifs/search?q=' + 'beyonce',
		apiKey = '&api_key=22e070ef831b40b492b87d3a49438799',
		param = '';


$.ajax({
	url: url + apiKey,
	method: 'GET'
}).done(function(response) {
	console.log('Success!');

	var imgStill = response.data[0].images.fixed_height_still.url,
			imgAnimated = response.data[0].images.fixed_height.url;
			link = response.data[0].url,
			rating = 'Rated: ' + response.data[0].rating.toUpperCase();

	var gifDiv = $('<div>'),
			par = $('<p>').text(rating),
			img = $('<img>').attr({'src': imgStill, 'data-state': 'still'}),
			imgA = $('<img>').attr('src', imgAnimated);

	// var hyperlink = '<a href=' + link + ' targert="_blank">' + link + '</a>';

	gifDiv.prepend(par);
	gifDiv.prepend(img);
	// gifDiv.prepend(imgA);

	$('#gifs').prepend(gifDiv);


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
}).fail(function(err) {
	console.log('API call failed.');
})
