import '../../Map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon, point } from 'leaflet';
import { useLocation } from 'react-router-dom';
import StationDetailsPage from './StationDetailsPage';
import FavoriteStations from './FavoriteStations';

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require('../../assets/placeholder.png'),
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

export default function Map() {
  let { station } = useLocation();
  let { stations } = useLocation();

  if (station) localStorage.setItem('station', JSON.stringify(station));

  if (!station) {
    station = JSON.parse(localStorage.getItem('station'));
  }

  let markers;
  if (stations?.length > 1) {
    markers = stations.map((station) => (
      <Marker
        position={[station.latitude, station.longitude]}
        icon={customIcon}
      >
        <Popup>{station.name}</Popup>
      </Marker>
    ));
  } else {
    markers = (
      <Marker
        position={[station.latitude, station.longitude]}
        icon={customIcon}
      >
        <Popup>{station.name}</Popup>
      </Marker>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <MapContainer
            center={[station.latitude, station.longitude]}
            zoom={13}
          >
            {/* OPEN STREEN MAPS TILES */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {/* Mapping through the markers */}
              {markers}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
        <div className="col-3">
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              {stations?.length > 1 ? (
                <h5 className="card-title">Stations</h5>
              ) : (
                <h5 className="card-title">Station Details</h5>
              )}
            </div>
            <ul className="list-group list-group-flush">
              {stations?.length > 1 ? (
                stations.map((station) => (
                  <li className="list-group-item">{station.name}</li>
                ))
              ) : (
                <StationDetailsPage station={station} />
              )}
            </ul>
          </div>
        </div>

        <div className="col-3">
          <FavoriteStations />
        </div>
      </div>
    </div>
  );
}
