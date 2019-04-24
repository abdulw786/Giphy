// when the page load
$(document).ready(function () {
     var sports = ["SOCCER", "FOOTBALL", "TABLE TENNIS", "VOLLEYBALL", "HOCKEY", "BASKETBALL", "BOXING", "HANDBALL",
          "TENNIS", "SWIMMING"
     ];

     function displayGifButtons() {
          $("#areaToAdd").empty();
          for (var i = 0; i < sports.length; i++) {
               var button = $("<button>")
                    .addClass("action")
                    .addClass("btn btn-outline-secondary")
                    .attr("data", sports[i])
                    .text(sports[i]);
               $("#areaToAdd").append(button);
          }
     }

     function addNewButton() {
          $("#addNewGiphy").on("click", function () {
               var newButton = $("#new-giphy").val().trim();
               sports.push(newButton);
               displayGifButtons();
               $("#new-giphy").val("");

          });
     }

     function displayGifs() {
          var action = $(this).attr("data");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action +
               "&api_key=KhUxco9faFSA2HX2y6eEZIG8SowaA2n2&limit=10";
          console.log(queryURL);
          $.ajax({
               url: queryURL,
               method: 'GET'
          }).then(function (response) {
               console.log(response);
               $("#gifs").empty();
               var results = response.data;

               for (var i = 0; i < results.length; i++) {
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still
                         .url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    $("#gifs").prepend(gifRating, gifImage);
               }
          });
     }
     $(document).on("click", ".action", displayGifs);
     $(document).on("click", ".image", function () {
          var state = $(this).attr('data-state');
          if (state == 'still') {
               $(this).attr('src', $(this).data('animate'));
               $(this).attr('data-state', 'animate');
          } else {
               $(this).attr('src', $(this).data('still'));
               $(this).attr('data-state', 'still');
          }
     });
     addNewButton();
     displayGifButtons();
});