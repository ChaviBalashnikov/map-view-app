import mapboxgl from 'mapbox-gl';

const ACCES_TOKEN = "pk.eyJ1IjoiY2hhdmliIiwiYSI6ImNseWFqdm1wazB4dWcyanNkYjRtcG5ieTMifQ.pu5uhAJW9FSKS5N-OmBZCA"

export const initializeMap = (container) => {
  mapboxgl.accessToken = ACCES_TOKEN;
  return new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-95.7129, 37.0902],
    zoom: 10
  });
};

export const addGeoJSONLayer = (map, geoJSON, weatherData) => {
  if (map.isStyleLoaded()) {
    addLayer(map, geoJSON, weatherData);
  } else {
    map.on('style.load', () => {
      addLayer(map, geoJSON, weatherData);
    });
  }
};

function addLayer(map, geoJSON, weatherData) {
  if (map.getSource('boundary')) {
    map.removeLayer('boundary-fill');
    map.removeSource('boundary');
  }

  map.addSource('boundary', {
    type: 'geojson',
    data: geoJSON
  });

  map.addLayer({
    id: 'boundary-fill',
    type: 'fill',
    source: 'boundary',
    layout: {},
    paint: {
      'fill-color': '#888888',
      'fill-opacity': 0.4
    }
  });

  const coordinates = geoJSON.features[0].geometry.coordinates[0];
  const bounds = coordinates.reduce((bounds, coord) => {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  map.fitBounds(bounds, {
    padding: 20
  });

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'boundary-fill', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const coordinates = e.lngLat;
    const localTime = new Date(weatherData.location.localtime).toLocaleTimeString();
    const description = `<p>Current temperature: ${weatherData.current.temp_c} °C</p> <p>Current Time: ${localTime}</p>`;
    popup
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', 'boundary-fill', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}