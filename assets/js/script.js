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

$(document.body).on("click", ".btn", function() {
	$("#cards").empty();
	const makeRequest = $(this).attr("value");
	searchForGifs(makeRequest);
})


//Execute API call
const searchForGifs = request => {
	// Setting up API call.
	const offset = "&offset=" + Math.floor(Math.random() * 100);
	const queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&q=' + request + offset;
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
						<img 
							src="${previewImg}" 
							alt="${imgTitle}"
							data-state="preview"
							data-preview=${previewImg}
							data-animate=${animatedImg}>
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

		$("img").click(function () {
			console.log("trigger")
			const state = $(this).attr("data-state");

			if (state === "preview") {
				$(this).attr({"data-state": "animate"});
				$(this).attr("src", $(this).attr("data-animate"));
			} else {
				$(this).attr({"data-state": "preview"});
				$(this).attr("src", $(this).attr("data-preview"));
			}
		});
		
	})
	.fail(err => console.log('API call failed. ', err))
}
