const topics = ["Beyonce", "Japan", "Kittens", "Cupcakes"];

// Makes a button for each topic in the array
topics.forEach(topic => {
	let topicBtn = $("<button>")
		.attr({
			"class": "btn",
			"value": topic
		})
		.html(topic);

		$("#topic-btn").append(topicBtn);
});

// Capture user input
$("#create-topic").click(event => {
	event.preventDefault();

	const userInput = $("#search-field").val();
	topics.push(userInput);

	// TODO Clear search field after form submit

	// Add new topic buttons
	const newTopicBtn = $("<button>")
		.attr({
			"class": "btn",
			"value": userInput
		})
		.append(userInput);

	$("#topic-btn").append(newTopicBtn);
});

$(document.body).on("click", ".btn", (event) => {

	// this not working properly... use event instead
	const makeRequest = $(event.currentTarget).attr("value");
	searchForGifs(makeRequest);
})


//Execute API call
const searchForGifs = request => {
	// Setting up API call.
	const queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&q=' + request;
	const apiKey = '&api_key=LvdlbUxQi7tdpWDVBVbRROSDOxfVuSMb';

	$.ajax({
		url: queryURL + apiKey,
		method: 'GET'
	})
	.done(res => {

		res.data.map(gif => {

			let imgTitle = gif.title.toUpperCase();
			let previewImg = gif.images.fixed_height_still.url;
			let animatedImg = gif.images.fixed_height.url;
			let imgURL = gif.bitly_gif_url;
			let rating = gif.rating.toUpperCase();

			let card = $(
				`<div class="card">
					<div>
						<img src="${animatedImg}" alt="${imgTitle}">
					</div>
					<p>
						<a href="${imgURL}" target="_blank">${imgTitle}</a>
						<br>
						Rating: ${rating}
					</p>
				</div>`
			);

			$("#cards").prepend(card);
		})
	})
	.fail(err => console.log('API call failed. ', err))
}
