// Markers observableArray will be filled by a external JSON
// Filter is the observable string that users input on the search-box
// On every input, the function filterMarkers is called
var VM = {
    markers: ko.observableArray(),
    filter: {
              text: ko.observable(),
              filterMarkers: filterMarkers
            }
};

// Centralizes on the clicked location, closes every InfoWindows
// Opens the selected location InfoWindow
// If on small devices, closes the menu
function focusOnMarker(){
  if ($("#menu-toggle").is(":visible")){
    toggleMenu(this.coor, this)
  }
  else {
    map.setCenter(this.coor);
    VM.markers().forEach(function( marker ) {
      marker.mapsInfoWindows.setMap(null);
    })
    this.mapsInfoWindows.open(map, this.mapsMarker);
  }
}


function filterMarkers(){
  var filterText = (this.filter.text());
  // If serached text is not in marker title, filter out. Else, filter in.
  this.markers().forEach( function( marker ){
    if(marker.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1){
      marker.filtered(true);
      marker.mapsMarker.setMap(map);
    }
    else{
      marker.filtered(false);
      marker.mapsInfoWindows.setMap(null);
      marker.mapsMarker.setMap(null);
    }
  })
}

// Loads the markers information from a JSON file and calls a function on them
function loadMarkers( callbackFn, url ) {
  var markersInfo = $.getJSON( url, function( data ) {
    callbackFn( data.markers );
  })
    .fail(function() {
      console.log( "error" );
    })
}


// Creates the markers data model given a JSON file with the data
// Also creates the markers and InfoWindows on the map
function createMarkers( markersData ) {
  var Wikipedia = WikipediaAPI();
  console.log(Wikipedia)
  markersData.forEach( function(x){

    // Creating the markers observables
    var marker = Object.assign({}, x);
    marker.id = Math.random().toString(36).substring(2,6) + String(marker.coor.lat).split(".")[1] + String(marker.coor.lng).split(".")[1]
    marker.filtered = ko.observable(true);
    marker.focusOnMarker = focusOnMarker;
    VM.markers.push(marker);

    // Creating the maps markers
    marker.mapsMarker = new google.maps.Marker({
      map: map,
      position: marker.coor,
      title: marker.title,
    });

    // Creating the maps infowindows
    marker.mapsInfoWindows = new google.maps.InfoWindow({
      content: infoViewContent(marker.title, marker.id)
    })

   //Fetching the content from Wikipedia
   Wikipedia.fetchContent( marker.title, marker.id );

   // Adding a listener to open the InfoWIndow when the marker is clicked
   // By option, all the other InfoWindows are closed
   marker.mapsMarker.addListener('click', function() {
     VM.markers().forEach(function( marker ) {
       marker.mapsInfoWindows.setMap(null);
     })
     marker.mapsInfoWindows.open(map, marker.mapsMarker);
     Wikipedia.fetchContent( marker.title, marker.id , true);
   });

  })
}

function init() {
  ko.applyBindings( VM );
  loadMarkers ( createMarkers, "https://api.myjson.com/bins/2b3wk" );
}

init()
