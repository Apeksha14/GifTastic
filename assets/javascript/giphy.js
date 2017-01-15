      // cartoons array that stores the intial values for some cartoons
      var cartoons = ["Mickey Mouse", "Looney Toons", "The Powerpuff Girls", "Spongebob","Dexter's Laboratory","Scooby-Doo","Tom and Jerry","Futurama","Pokemon","The Simpsons"];

      // displayInfo function renders the HTML to display the appropriate content
      function displayInfo() {

        // Empty the div cartoons-view to display the new gifs 
        $("#cartoons-view").empty();
        // Empty the text box once the button is clicked to display the cartoon gifs
        $("#giphy-input").val("");
        // get the value of the data-name attribute from the button once it is clicked
        var cartoon = $(this).attr("data-name");
        //queryURL for retrieving the gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+cartoon+"&api_key=dc6zaTOxFJmzC";
        // An array gifArray is declared to store all the animated gifs from the response Object 
        var gifArray = [];
        // An Array imgArray is declared to store all the still images from the response Object
        var imgArray = [];

        // Creates AJAX call for the specific cartoon button being clicked
        $.ajax({
          url: queryURL,
          method: "GET",
          data:{
            limit:"10", // number of results to be retrieved from the url.
           }
        }).done(function(response) {
            
          var ulDiv = $("<ul>"); // create ul element

          // for loop runs through each and every response data
          for(var i=0;i<response.data.length;i++)
          {
            //new element figure is created
            var newDiv = $("<figure>");
            //new element li is created
            var liDiv = $("<li>");
            // new element image is created
            var imgDiv = $("<img>");
            // class img-rounded from bootstrap is added to the image element for css
            imgDiv.addClass("img-rounded");
            // animated gifs url is pushed from the reponse data object into the gifArray variable
            gifArray.push(response.data[i].images.fixed_height.url);
            // still images url is pushed from response data object into the imgArray variable
            imgArray.push(response.data[i].images.fixed_height_still.url);
            // classes gif and hvr-grow-shadow are added to the image element for css
            imgDiv.addClass("gif hvr-grow-shadow");
            // image element's src attribute is initially set to still image from the response object(imgArray)
            imgDiv.attr("src",imgArray[i]);
            // image element's data-still attribute is set to still image form the response object(imgArray)
            imgDiv.attr("data-still",imgArray[i]);
            // image element's data-animate attribute is set to animated gifs from the response object(gifArray)
            imgDiv.attr("data-animate",gifArray[i]);
            // unique id attribute is set to the image element 
            imgDiv.attr("id","img"+i);
            //image element's data-state attribute is initially set to the value still
            imgDiv.attr("data-state","still");
            // appending the Rating detail from the response object to the figure element(newDiv)
            newDiv.append("<p>Rating: "+response.data[i].rating+"</p><br>");
            // appending the image element(imgDiv) to the figure element(newDiv)
            newDiv.append(imgDiv);
            // appending the figure element(newDiv) to the list elements(liDiv)
            liDiv.append(newDiv);
            // appending list elements(liDiv) to the ul element(ulDiv)
            ulDiv.append(liDiv);
            // finally appending the ul element to the cartoons-view div to display the details on the html
            $("#cartoons-view").append(ulDiv);
            
          } // for loop closes

        // onclick events of the each of the image elements from the response objects(gifs)
        // function that defines the play and pause of the gifs

        $('img').on('click', function() {

          // get the state of the image from the data-state attribute of the image that is clicked
          var state = $(this).attr("data-state");
          // get the url of animated gif from the data-animate attribute of the image that is clicked
          var animate = $(this).attr("data-animate");
          // get the static image url from the data-still attribute of the image that is clicked
          var still = $(this).attr("data-still");

            // if the data state is equal to still replace the src of the image from the static image url(still) to the animated gif url (animate)
            // and change the value of data-state attribute to animate.
            // else if data state is equal to animate replace the src of the image from the animated gif url(animate) to the still image url (still)
            // and change the data-state attribute to still.
            // this method defines the play and pause of the gif on click event
            if(state === "still")
                {
                  $(this).attr("src",animate);
                  $(this).attr("data-state","animate");
                }
              else
                {
                  $(this).attr("src",still);
                  $(this).attr("data-state","still");
                }

        // the hover function on the image to stop the gif 
        // when the cursor is moved away  
        $(this).hover(
        function()
        {
            $(this).attr("src", animate);
        },
        function()
        {
            $(this).attr("src", still);
        }); // hover function closes

  }); // image onclick event closes
 
  }); // done function close

    } // displayInfo function close

      // Function for adding the buttons for the  cartoon data
      function renderButtons() {

        // Deletes the cartoons prior to adding new cartoons
        // (this is necessary otherwise it will have repeat buttons)
        $("#buttons-view").empty();


        // Loops through the array of cartoons
        for (var i = 0; i < cartoons.length; i++) {

          // Then dynamicaly generates buttons for each cartoon in the array
          var a = $("<button>");

          // Adds a class of cartoon to our button
          a.addClass("cartoon w3-btn w3-white w3-border w3-border-blue w3-round-xlarge ");
          // Added a data-attribute
          a.attr("data-name", cartoons[i]);
          // Provided the initial button text
          a.text(cartoons[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
          // Clear the text box once button is added
          $("#giphy-input").val("");
        }
      }

      // This function handles events where the add cartoon button is clicked
      $("#add-cartoon").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var cartoon = $("#giphy-input").val().trim();

        // The movie from the textbox is then added to our array
        if(cartoon)
        cartoons.push(cartoon);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "cartoon"
      $(document).on("click", ".cartoon", displayInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      
//JS to create random color grid(background css)

var grid = $('#grid');
var s = 50;  // space between blocks
var n = 5;   // shadow range (space between shadow waves)
var l = 40;  // grid length
// generate random colors 
var rndCol = function() {
    return Math.ceil(Math.random() * 225+30);
};
for (var i = 0; i < l; i++) {
    for (var j = 0; j < l; j++) {
        var r = rndCol();
        var g = rndCol();
        var b = rndCol();
        var a = Math.random();
        var style = {
            'top': i * (s + n) + 'px',
            'left': j * (s + n) + 'px',
            'background': 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')',
            'background-image': 'linear-gradient(top, hsla(255, 255%, 255%, .95), transparent)',
            'animation-delay': ((i + 1) + (j + 1)) * 110 + 'ms'
        };
        var block = $('<div />').addClass('block').css(style);
        grid.append(block);
    }

  }




