// Initial array of gifs
var gifs = [""];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var anime = $(this).attr("data-anime");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  anime + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
  // var movie = $(this).attr("data-name");
  // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=Ki0QGdOKlAo4nnTTSIuyDb5R1c0zwrts&limit=10&rating=pg"
  // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the gif
    var gifDiv = $("<div class='movie'>");

    // Storing the rating data
    var rating = response.data;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    gifDiv.append(pOne);

 var results = response.data;

// Looping through each result item
for (var i = 0; i < results.length; i++) {

// Creating and storing a div tag
var animeDiv = $("<div style='height:400px; display:inline-block'>");


// Creating a paragraph tag with the result item's rating
var p = $("<p>").text("Rating: " + results[i].rating);

// Creating and storing an image tag
var animeImage = $("<img>");
// Setting the src attribute of the image to a property pulled off the result item
animeImage.attr("src", results[i].images.fixed_height.url);
var moving = animeImage.attr("data-animate", results[i].images.fixed_height.url);
var still = animeImage.attr("data-still", results[i].images.fixed_height_still.url);
var dataState = animeImage.attr("data-state", "animate");
var gifClass = animeImage.addClass("gif");

gifClass.on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
});

// Appending the paragraph and image tag to the animeDiv
animeDiv.append(p);
animeDiv.append(animeImage);

// Prependng the animeDiv to the HTML page in the "#gifs-appear-here" div
$("#movies-view").prepend(animeDiv);

}




    // Putting the entire movie above the previous gifs

  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("movie-btn");
    // Adding a data-attribute
    a.attr("data-anime", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  gifs.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();


});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();