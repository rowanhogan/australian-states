
(function() {

  var map = L.map('map', {
    attributionControl: false
  });

  L.tileLayer('http://{s}.tile.stamen.com/{style}/{z}/{x}/{y}.png', { style: 'toner-background' }).addTo(map);

  $.getJSON("states.min.geojson", function(data) {

    var info = L.control();

    info.update = function (props) {
      this._div.innerHTML = (props ? '<b>' + props['STATE_NAME'] + '</b>' : 'Hover over a state');
    };

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    info.addTo(map);

    var geojson = L.geoJson(data, {
      style: function (feature) {
        return {
          color: '#3498db',
          weight: 2,
          fillOpacity: 0.5
        };
      },
      onEachFeature: function (feature, layer) {
        // layer.bindPopup(feature.properties['STATE_NAME']);

        layer
        .on('mouseover', function(e) {
          layer.setStyle({
            weight: 4,
            fillOpacity: 0.8
          });
          info.update(layer.feature.properties);
        })
        .on('mouseout', function(e) {
          geojson.resetStyle(layer);
          info.update();
        })
      }
    })

    geojson.addTo(map);
    var bounds = geojson.getBounds();

    map.fitBounds(bounds);

    map.options.maxBounds = bounds;
    map.options.minZoom = map.getZoom();
  });

})();
