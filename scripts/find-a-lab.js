(function($) {
  var markers = [];

  function mapInit() {
    var mapOptions = {
      zoom: 10,
      disableDefaultUI: true,
      center: new google.maps.LatLng(42.361145, -71.057083),
    };

    var map = new google.maps.Map(
      document.getElementById("orders_map"),
      mapOptions
    );
    var autocomplete = new google.maps.places.Autocomplete(
      $(".find-lab-address").get(0)
    );
    var infoWindow = new google.maps.InfoWindow();

    infoWindow.setOptions({
      pixelOffset: new google.maps.Size(0, 5),
      disableAutoPan: false,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var dataAddress = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(dataAddress);
      });
    }

    document.querySelector("#lab-form").addEventListener("submit", function(e) {
      e.preventDefault();

      var radius = $("#radius-select").val();
      var postData = {
        address: $(".find-lab-address").val(),
        radius: radius,
      };

      // https://www.insidetracker.com/customer/lab/load-markers/
      $.ajax({
        url: "https://dev3.segterra.com/customer/lab/load-markers/",
        type: "post",
        dataType: "json",
        data: postData,
        success: function(responseData) {
          if (responseData.data) {
            var yourCoords = responseData.data.you;
            var labs = responseData.data.labs;
            clearMarkers();
            addMarkers(map, labs, infoWindow);
            setMap(map, yourCoords, radius);
          }
        },
      });
    });
  }

  google.maps.event.addDomListener(window, "load", function() {
    setTimeout(function() {
      mapInit();
    }, 500);
  });

  function setMap(map, coords, radius) {
    var dataAddress = new google.maps.LatLng(coords.lat, coords.lng);

    var zoom = 10;
    switch (radius) {
      case 10:
        zoom = 10;
        break;
      case 20:
        zoom = 9;
        break;
      case 30:
        zoom = 9;
        break;
      case 50:
        zoom = 8;
        break;
      case 100:
        zoom = 7;
        break;
      case 500:
        zoom = 4;
        break;
    }

    map.setCenter(dataAddress);
    map.setZoom(zoom);
  }

  function addMarkers(map, locations, infoWindow) {
    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          locations[i]["lat"],
          locations[i]["lng"]
        ),
        map: map,
      });

      markers.push(marker);

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          var tmplHtml = $("#info-box").tmpl(locations[i]);
          var html = tmplHtml.html();

          return function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );

      google.maps.event.addListener(infoWindow, "domready", function() {
        var infoBox = $(".gm-style-iw");
        var infoBoxWrapper = infoBox.prev();

        infoBox.parent().addClass("gm-style-iw--style");

        infoBoxWrapper.children(":nth-child(2)").css({
          "box-shadow": "none",
          "background-color": "transparent",
        });

        infoBoxWrapper.children(":nth-child(1)").css({
          "border-top-width": "16px",
        });

        infoBoxWrapper
          .children(":nth-child(3)")
          .find(":nth-child(2)")
          .children()
          .css({
            "transform": "skewX(-30.6deg)",
            "box-shadow": "none",
          });

        infoBoxWrapper
          .children(":nth-child(3)")
          .find(":nth-child(1)")
          .children()
          .css({
            "transform": "skewX(30.6deg)",
            "box-shadow": "none",
          });
      });
    }
  }

  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
})(jQuery);
