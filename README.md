# nodejs-leaflet
A simple ExpressJS app that includes a Leaflet example. This is a modified lesson from a Udemy class I was taking. It uses the jade templating language and pulls in Bootstrap and Mapbox libraries.

The mapbox library and token is for a version of my styled mobile map. Displays the standard map using OSM data that is themed for UC Santa Cruz. More about the Mapbox theming is found at http://petermcmillan.com/

# CruzID Blue Authentication
Using the LDAP blue server managed by SoE, this app uses PassportJS to authenticate against the LDAP.

# Full Sized Map
The real secret to getting 100% height and width via Bootstrap 3 was to restructure the divs and classes a little and add some specific CSS overwrites to handle default padding and margins found in Bootstrap 3.

Start the app with ```npm start``` from the command line to intall and launch the app.

<img src="expressjs-leaflet.png" alt="ExpressJS Leaflet screen shot">


```
<div class="container-fluid">
	<h1>ExpressJS Leaflet</h1>
		<div class="row">
			<div id="map"></div>
		</div>
</div>
```

The CSS secret is found in stackoverflow and Leaflet Tips book.

```
html, body, #map
{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

body {
  padding-top: 50px;
}

.container-fluid {
  height: 100%;
  width: 100%;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
  height: 100%;
}
```






