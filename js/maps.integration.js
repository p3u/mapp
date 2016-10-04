var map;

function initMap() {
  var startingLocation = {lat: -22.9333915, lng: -43.1800884};

  // Creating the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: startingLocation,
    scrollwheel: false,
    zoom: 15
  });
}

function googleError(err) {
  alert("We had a problem loading from Google Maps API. Please refresh the page")
  console.log(err)
}

function infoViewContent(title, id) {
  var contentString =  '<div class="info-view" id=' + id +'>'+
                         '<div data-bind="with: selectedMarker" class="info-view-body">' +
                           '<div class="info-view-image">' +
                           '<img alt=' + title.replace(/\s+/g, '-') + ' data-bind="attr: { src: img }"> ' + 
                           '</div>' +
                           '<h3 class="info-view-title">' + title + '</h3>'+
                           '<div class="info-view-content" data-bind="text: text"> '+
                           '</div>' +
                         '</div>' +
                         '<p class="info-view-attribution">Information from: <a href="https://pt.wikipedia.org/w/index.php?search=' + title + '">'+
                         'Wikipedia</a> '+
                         '</div>'+
                       '</div>';
  return contentString;
}
