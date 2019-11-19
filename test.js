
var mapLoaded = false;

$(document).ready(function() {
   populateProjects(1, "Completionist", "314owen", "An app that allows you to find others nearby who are interested in working on projects with you.", 69, 43.0846, -77.6743);
   populateProjects(2, "GeoTrash", "Anisa", "Find that trash wooo!", 22, 43.0945, -77.6747);
   populateProjects(3, "Refugee something", "Matt", "I need refugees to work for me with no pay at all b/c you are refugees", 60, 43.0752, -77.6641);
   populateProjects(4, "I forget the name", "M2tt", "The matt that actaully does stuff", 12, 43.0894, -77.6834);

   //addMarkers();
});

var projects = [];
var map;

// Basic function that populates list of projects
function populateProjects(id, projectName, userName, desc, percent, lat, long) {
    $( "#projects" ).append("<div class='p-2 m-2 request'> <h5 class='text-white'> " +
        projectName + " </h5> <p class='text-white m-0 p-0'> " + desc +
        "</p> <div class='progress my-3'> <div class='progress-bar' role='progressbar' style='width: " + percent + "%' aria-valuenow='" + percent +
        "' aria-valuemin='0' aria-valuemax='100'>" + percent + "%</div> </div> <p class='float-left text-white'> Created by <a href=''>" + userName + "</a></p> <button class='btn btn-outline-primary btn-custom float-right'> I can help! </button> </div>")
    projects.push({id: id, lat: lat, long: long});
}

function initMap() {
    var uloc = {lat: 43.0846, lng: -77.6743}; // User's location
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: uloc});

    mapLoaded = true;
}



$("#create").click(function(e) {
	e.preventDefault();
	var ulat, ulng = 0;
	navigator.geolocation.getCurrentPosition(function(position) {
            ulat = position.coords.latitude;
			ulng = position.coords.longitude;
			populateProjects(5, "Test", "test", "Test", 75, ulat, ulng);
			new google.maps.Marker({position: {lat: ulat, lng: ulng}, map: map});
        });
		
});

function addMarkers() {
    if (mapLoaded) {
        for (var i = 0; i < projects.length; i++) {
            var marker = new google.maps.Marker({position: {lat: projects[i].lat, lng: projects[i].long}, map: map});
        }
    } else {
        setTimeout(function() {
            addMarkers();
        }, 200);
    }
}