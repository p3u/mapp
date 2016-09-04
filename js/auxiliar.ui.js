function toggleMenu(coor, clickedMarker){
  var menu = $("#menu");
  var mapDiv = $("#map");
  var menuIsVisible = menu.is(":visible");
  if(!menuIsVisible){
    // Shrink the map to accomodate the menu
    mapDiv.css("width", "calc(100vw - 280px)");
    google.maps.event.trigger(map, "resize");
  }
  // Toggle Menu
  menu.animate({width:'toggle'},300, "swing", function(){
    if(menuIsVisible){
      // Increases map size
      mapDiv.css("width", "");
      google.maps.event.trigger(map, "resize");
      // If menu was toggled after clicking a list item
      if(coor){
        // Center list item and open info window
        map.setCenter(coor);
        VM.markers().forEach(function( marker ) {
          marker.mapsInfoWindows.setMap(null);
          clickedMarker.mapsInfoWindows.open(map, clickedMarker.mapsMarker);
        })
      }
    }
  });
}
