function WikipediaAPI(){
  return {
    getArticleText: function( title, id , isOpen) {
      title = title.replace(" ", "_");
      $.ajax({
           type: "GET",
           url: "https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=" + title + "&callback=?",
           contentType: "application/json; charset=utf-8",
           async: true,
           cache: true,
           dataType: "json",
           success: function (data, textStatus, jqXHR) {
               var marker = VM.markers().filter(function(marker){
                 return marker.id === id;
               })[0]

               // Opens the infowindow to input the received text
               if (!isOpen) {
                 marker.mapsInfoWindows.open(map, marker.mapsMarker);
               }
               for (var pageId in data.query.pages) {
                  if (data.query.pages.hasOwnProperty(pageId)) {
                    $( "#" + id + " .info-view-content").html(data.query.pages[pageId].extract);
                  }
              }
               // Closes the infowindow after receiving the input text
               if (!isOpen) {
                 marker.mapsInfoWindows.close();
               }
           },
           error: function (errorMessage) {
             $( "#" + id + " .info-view-content").html("Couldn't fetch contents from Wikipedia. Check you console for more info");
             console.log(errorMessage);
           }
       });
    },

    getArticleImage: function( title, id , isOpen) {
      title = title.replace( " ", "_" );
      $.ajax({
           type: "GET",
           url: "  https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=200&format=json&titles=" + title + "&callback=?",
           contentType: "application/json; charset=utf-8",
           async: true,
           cache: true,
           dataType: "json",
           success: function (data, textStatus, jqXHR) {
               var marker = VM.markers().filter(function(marker){
                 return marker.id === id;
               })[0]

               // Opens the infowindow to input the received image
               if (!isOpen) {
                 marker.mapsInfoWindows.open(map, marker.mapsMarker);
               }
               for (var pageId in data.query.pages) {
                  if (data.query.pages.hasOwnProperty(pageId)) {
                    $( "#" + id + " .info-view-image").html("<img src=" + data.query.pages[pageId].thumbnail.source + ">");
                  }
              }
               // Closes the infowindow after receiving the input image
               if (!isOpen){
                 marker.mapsInfoWindows.close();
                }
           },
           error: function (errorMessage) {
             $( "#" + id + " .info-view-image").html("Couldn't fetch the picture from Wikipedia. Check you console for more info");
             console.log(errorMessage);
           }
       });
     },

    fetchContent: function( title, id , isOpen) {
      var self = this;
      $.ajax({
           type: "GET",
           url: "https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + title + "&srprop=snippet&srinfo=&callback=?&format=json",
           contentType: "application/json; charset=utf-8",
           async: true,
           cache: true,
           dataType: "json",
           success: function (data, textStatus, jqXHR) {
             self.getArticleText(data.query.search[0].title, id, isOpen);
             self.getArticleImage(data.query.search[0].title, id, isOpen);
           },
           error: function (errorMessage) {
             $( "#" + id + " .info-view-content").html("Couldn't fetch contents from Wikipedia. Check you console for more info");
             console.log(errorMessage);
           }
       });
    }
  };
}
