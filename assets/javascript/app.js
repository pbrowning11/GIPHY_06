var sportsButtons = ["baseball", "basketball", "football", "hockey", "swimming", "soccer", "lacrosse", "track and field", "rugby", "water polo"]


function makeButtons() {

    $(".buttonHold").html("");

    for (var i = 0; i < sportsButtons.length; i++) {
        console.log(sportsButtons[i]);
        var buttons = $("<button type='button' class='m-2 btn sport-btn btn-danger'>" + sportsButtons[i] + "</button>");
        buttons.attr("data-sport", sportsButtons[i]);
        buttons.appendTo(".buttonHold");
    }
}

$("#find-sport").on("click", function(event) {

    event.preventDefault();

    var userInput = $("#sport-input").val();
    if (!userInput.trim()) return;
    if (sportsButtons.includes(userInput)) {
        return;
    }
    sportsButtons.push(userInput);
    makeButtons();

    $("#sport-input").val("");
  });

function GIFdisplay() {
    var sport = $(this).attr("data-sport");
    $(".GIFview").empty();
    console.log("in");
    var gifURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=OjiHVTd9gKpBSMb0hSoNuLl4XHSd9iZK&limit=10";

    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function(response) {
        console.log(gifURL);
        console.log(response);
        var results = response.data;
        console.log(results);
        for(var s = 0; s < results.length; s++) {

            var gifDIV = $("<div class='col-6'>");

            var rating = results[s].rating;
            var r = $("<p class='text-white'>").text("Rating: " + rating);

            var gifIMG = $("<img class='gif pb-3'>");
            gifIMG.attr("data-src", results[s].images.fixed_height.url);
            gifIMG.attr("src", results[s].images.fixed_height_still.url);



            gifDIV.append(r);
            gifDIV.append(gifIMG);

            $(".GIFview").append(gifDIV);
        }
    })

    
}

$(document).on("click", ".gif", function () {
    console.log("click")
    var move = $(this).attr('data-src')
    var still = $(this).attr('src')
    $(this).attr('src', move)
    $(this).attr('data-src', still)
})
$(document).on("click", ".sport-btn", GIFdisplay);

makeButtons();