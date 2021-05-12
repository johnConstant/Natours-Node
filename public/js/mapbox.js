const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9obmNvbnN0YW50IiwiYSI6ImNrb2x5cGtwZDB4emYydnFmaTk4bnhrNXcifQ.Hur0x9nZYH5a_plTIR0z0w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/johnconstant/ckolz106j56df17p9mgxos4iw',
  scrollZoom: false,
  //   center: [-118, 34],
  //   zoom: 4,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  // Create Marker
  const element = document.createElement('div');
  element.className = 'marker';
  // Add Marker
  new mapboxgl.Marker({ element, anchor: 'bottom' })
    .setLngLat(location.coordinates)
    .addTo(map);
  // Add Popup
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  // Extend Map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: { top: 200, bottom: 150, left: 100, right: 100 },
});
