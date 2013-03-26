<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet" />
  </head>
  <body>
    <div id="container">
        <div class="row">
            <div class="span9" id="map-canvas"></div>
        </div>
        <div class="row">
            <form class="span3" method="get">
                <fieldset>
                    <input type="text" placeholder="Vul adres in" name="address">
                    <button type="submit" class="btn">Lat Lon ophalen</button>
                </fieldset>
            </form>            
        </div>

    </div> <!-- /container -->      
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?sensor=false&libaries=geometry">
    </script>
    <script type="text/javascript"
      src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js">
    </script>
    <script type="text/javascript"
      src="js/markerclusterer.js">
    </script>       
    <script type="text/javascript"
      src="js/site.js">
    </script>   
  </body>
</html>