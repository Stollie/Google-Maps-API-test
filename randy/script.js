$(document).ready(function(){

	showStatus("Vul een indicator in om uw locatie op te vragen.");

	$('#indicator').focusout(function() {
	
		// Als er een indicator is
		if( $(this).val() != '') {

			// Als geolocation bestaat
			if (navigator.geolocation) {
			
				showStatus("Locatie opvragen..");
				navigator.geolocation.getCurrentPosition(startTimer);
			
			} else {
			
				showStatus("Uw locatie kon niet worden opgevraagd.");
			
			}
		
		} else {
			
			showStatus("Vul een indicator in om uw locatie op te vragen.");
			
		}
	
	});

});

// Global vars
var map;
var cou = 0;

function updatePosition(position) {
	
	// Haal de nieuwe locatie op
	navigator.geolocation.getCurrentPosition(showNewMarker);

	function showNewMarker(position) {
		
		// Bereid de variablen voor
		var ind = $('#indicator').val();
		    cou++;
		var tim = getCurrentTime();

		var acc = position.coords.accuracy;		
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		
		var ret = ""+ind+", "+cou+", "+tim+", "+acc + ", "+lat + ", "+lon + "";
		
		// Zet de nieuwe locatie in een latlon object
	  	var latlon = new google.maps.LatLng(lat, lon);
		
		// Plaats een marker
		var marker = new google.maps.Marker({
			position		: latlon, 
			map				: map, 
			title			:""+ret+""
		});
		
		// Plaats een cirkel
		var circle = new google.maps.Circle({
		    center			: latlon,
		    map				: map,
		    radius			: acc,
		    fillOpacity		: 0.1,
		    strokeOpacity	: 0.2
		});

		// Plaats de data in de #data ul		
		$('#data').append("<li>"+ret+"</li>");
	
		// Stop de gegevens in een json data object 
		data = {
			ind: ind,	// Indicator
	    	cou: cou,	// Counter
	    	tim: tim,	// Time
	        acc: acc,	// Accuracy
	        lat: lat,	// Latitude
	        lon: lon	// Longitude
	    }; 
	    
	    $.get('part.save.php', data, function(dataR) { 
			console.log(dataR);
	    });
		
		showStatus("Locatie "+cou+"x opgeslagen.");

	}

}



function startTimer(position) {

	// Bereid de variablen voor
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;

	// Zet de nieuwe locatie in een latlon object
  	var latlon = new google.maps.LatLng(lat, lon);

	// Vul het mapObject met een Google Maps Map :)
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 17,
		center: latlon,
		mapTypeControl: false,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// Herhaal elke 10 seconden
	setInterval(function() { updatePosition(position) }, 10000); 

	showStatus("Timer gestart, het eerste resultaat zal binnen 10 seconden verschijnen.");

}

function getCurrentTime() {
	
	var date 	= new Date();
	var hours 	= date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	if(seconds < 10) { seconds = "0"+seconds; }
	if(minutes < 10) { minutes = "0"+minutes; }
	if(hours < 10) { hours = "0"+hours; }
	
	var time = hours + ":" + minutes + ":" + seconds;
	
	
	return time;
	
}

function showStatus(message) {

	$('#status').html(message);

}

