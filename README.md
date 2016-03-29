# nodejs-leaflet
A simple ExpressJS app that includes a Leaflet example. This is a modified lesson from a Udemy class I was taking. It uses the jade templating language and pulls in Bootstrap and Mapbox libraries.

In October 2015, to make it more useful, I changed the local authentication to use our LDAP and CruzID Blue process. Upon successful authentication, we drop the authenticated user on a "profile" page that outputs their LDAP object info.

The mapbox library and token is for a version of my styled mobile map. Displays the standard map using OSM data that is themed for UC Santa Cruz. More about the Mapbox theming is found at http://petermcmillan.com/

The real secret to getting 100% height and width via Bootstrap 3 was to restructure the divs and classes a little and add some specific CSS overwrites to handle default padding and margins found in Bootstrap 3.

Start the app with ```npm start``` at the command line.

Here's a screen shot of a CruzID Blue login that authenticates against the ADC CruzID Blue LDAP server.

<img src="cruzid-blue-screenshot.png" alt="CruzID Blue mock up login page">

Here's a shot of the apps main page.

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
```node ./bin/www```

In the bin/www file you'll see the configuration for getting the https server configured. 

# Authentication
We've installed passport-ldapauth and some dependencies THe secret here was setting the bindDN to '' and then querying the ldap server. We run this all via SSL, so that entailed setting up ldap.conf to point to our LDAP and issuing a valid InCommon cert for my development workstation. 

So the basics are that the login form posts our username and password. The passport-ldapauth strategy does a passport.authenticate call. If the we don't fail with a 401 unauthorized error, we are authenticated via the LDAP bind process for the users uid that was passed in.

THere's the differences in connection type between HTTP and LDAP to be aware of as well as the nomenclature of bind and authenticate; LDAP uses different definitions for these terms that you have to learn.

# User Object LDAP Data
```
{  
   "dn":"uid=peterm,ou=People,dc=crm,dc=ucsc,dc=edu",
   "controls":[  

   ],
   "givenName":"Peter",
   "homeDirectory":"/afs/cats.ucsc.edu/users/y/peterm",
   "loginShell":"/bin/bash",
   "mail":"peterm@ucsc.edu",
   "sambaSID":"S-1-5-21-XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX",
   "ucscPersonGuID":"G000108642",
   "uid":"peterm",
   "uidNumber":"13403",
   "ucscPersonGivenName":"Peter",
   "gidNumber":"100000",
   "sn":"McMillan",
   "ucscPersonSn":"McMillan",
   "ucscPersonMail":"peterm@ucsc.edu",
   "ucscPersonPubDivision":[  
      "Information Technology Services",
      "Business & Administrative Services",
      "Chancellor's Office/EVC"
   ],
   "ucscPersonPubPhoneticGivenName":"Peter",
   "ucscPersonPubOfficeHours":"M-F 8-5",
   "ucscPersonPubPhoneticSn":"McMillan",
   "ucscPersonPubMailStop":"Chancellor's Office",
   "cn":[  
      "Peter McMillan",
      "Peter S Mc Millan"
   ],
   "ucscPersonPubDepartmentNumber":"Information Technology Services",
   "ucscPersonPubTitle":[  
      "Director, Client Relationship Management",
      "Divisional Liaison for all administrative divisions"
   ],
   "ucscPersonPubRoomNumber":"273 Kerr Hall",
   "ucscPersonPubStreet":"273 Kerr Hall",
   "ucscPersonPubL":"Santa Cruz",
   "ucscPersonPubSt":"CA",
   "ucscPersonPubPostalCode":"95064",
   "ucscPersonTelephoneNumber":"831-459-5830",
   "objectClass":[  
      "ucscPerson",
      "top",
      "eduPerson",
      "inetOrgPerson",
      "sambaSamAccount",
      "posixAccount",
      "organizationalPerson",
      "person",
      "ucscMain"
   ]
}
```


