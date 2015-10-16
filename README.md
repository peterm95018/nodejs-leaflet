# nodejs-leaflet
A simple ExpressJS app that includes a Leaflet example. This is a modified lesson from a Udemy class I was taking. It uses the jade templating language and pulls in Bootstrap and Mapbox libraries.

To make it more useful, I changed the local authentication to use our LDAP. 

The mapbox library and token is for a version of my styled mobile map. Displays the standard map using OSM data that is themed for UC Santa Cruz. More about the Mapbox theming is found at http://petermcmillan.com/

The real secret to getting 100% height and width via Bootstrap 3 was to restructure the divs and classes a little and add some specific CSS overwrites to handle default padding and margins found in Bootstrap 3.

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

# Starting Up
node ./bin/www

In the bin/www file you'll see the configuration for getting the https server configured. 

# Authentication
We've installed passport-ldapauth and some dependencies THe secret here was setting the bindDN to '' and then querying the ldap server. We run this all via SSL, so that entailed setting up ldap.conf to point to our LDAP and issuing a valid InCommon cert for my development workstation. 

So the basics are that the login form posts our username and password. The passport-ldapauth strategy does a passport.authenticate call. If the we don't fail with a 401 unauthorized error, we are authenticated via the LDAP bind process for the users uid that was passed in.

THere's the differences in connection type between HTTP and LDAP to be aware of as well as the nomenclature of bind and authenticate; LDAP uses different definitions for these terms that you have to learn.




