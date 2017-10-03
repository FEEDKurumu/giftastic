var topics = ["cat", "dog", "bird", "panda", "taco", "ramen", "burger", "sushi", "game", "sport", "drink", "phone", "chair", "plant", "spongebob"];

function renderButtons() {
  $("#buttons-area").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]).attr("class", "topicButton").attr("data-value", topics[i]);
    newButton.addClass("btn-danger", "btn-lg")
    $("#buttons-area").append(newButton);
  }
}

$("#add-topic").on("click", function() {
  var newTopic = $("#input").val();
  if (newTopic.length !== 0) {
    topics.push(newTopic);
    renderButtons();
  }
})

$(document).on("click", ".topicButton", function() {
  $("#gif-area").empty();
  var searchTerm = $(this).attr("data-value");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6gLz2z5pmbVYL5tJdbvfNbGrnOL34qZv&q=" + searchTerm + 
  "&limit=10&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 10; i++) {
      var newDiv = $("<div>");
      var newImg = $("<img>");
      var newP = $("<p>");

      newP.text("Rating: " + response.data[i].rating);
      newImg.addClass("gif");
      newImg.attr("src", response.data[i].images.fixed_height_still.url);
      newImg.attr("data-still", response.data[i].images.fixed_height_still.url);
      newImg.attr("data-animate", response.data[i].images.fixed_height.url);
      newImg.attr("data-state", "still");

      newDiv.append(newP, newImg);
      $("#gif-area").after(newDiv);
      //i can't get the gifs to appear on the right side of the previous gif
      //they get added under the previous gif
    }
  })
})

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  var stillLink = $(this).attr("data-still");
  var animateLink = $(this).attr("data-animate");

  if (state === "still") {
    $(this).attr("src", animateLink);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillLink);
    $(this).attr("data-state", "still");
  }
})

renderButtons();

//buttons top row
//dynamically created from array of strings -> function
//buttons created with data-value
//var topics =[]; etc
//for loop through buttons array
//create <button>
//add data-value. make equal to topic in array
//on click for that class:
//send ajax to search for button val()
//create img with class data-still data-animate
