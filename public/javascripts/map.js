
// Provide your access token
// L.mapbox.accessToken = 'pk.eyJ1IjoicGV0ZXJtOTUwMTgiLCJhIjoiTWpFVTFVNCJ9.02rGGMIWgLdCfbVinaSZeQ';
// // Create a map in the div #map
// L.mapbox.map('map', 'peterm95018.kfmd8j0i');


var map = L.map('map').setView([36.9914, -122.0609], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);