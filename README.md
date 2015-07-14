# nodejs-leaflet
A simple ExpressJS app that includes a Leaflet example. This is a modified lesson from a Udemy class I was taking.

Added the mapbox library and tokens for a version of my styled mobile map. Displays the standard map using OSM data that is themed for UC Santa Cruz.

The real secret to getting 100% height and width via Bootstrap 3 was to restructure the divs and classes a little and add some specific overwrites to handle default padding and margins found in Bootstrap 3.

```
<div class="container-fluid">
	<h1>ExpressJS Leaflet</h1>
		<div class="row">
			<div id="map"></div>
		</div>
</div>
```



<img src="expressjs-leaflet.png" alt="ExpressJS Leaflet screen shot">
