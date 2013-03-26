$(function() {
    var $container = $("#container");
    var $form = $container.find("form");    

    var success = function(position) {
        var center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        
        buildMap(center);
    }    
    var error = function(msg) {
        var center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        
        buildMap(center);
    }
    
    var buildMap = function(center) {
        
        var mapOptions = {
          center: center,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
    
    // Vraag de huidige locatie op
    if (navigator.geolocation) {
           
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        console.log('not supported');
    }

    $form
        .on("submit", function(event) {
            event.preventDefault();
            console.log("Adres ophalen");
            
            $.getJSON(
                "http://maps.googleapis.com/maps/api/geocode/json",
                {"sensor": false, "address": $form.find("input").val()}
            )
            .done(function(data){
                console.log(data);
            })
            .fail(function() {
                console.log( "You FAIL" ); 
            });
        });
});