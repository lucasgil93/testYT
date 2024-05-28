import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default marker icon issue in leaflet with react-leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapItem() {
  const position = [53.26940903114829, -8.928875929566289];
  
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-600">
      <h2 className='text-5xl text-white pt-10 m-4'>Our location</h2>
      <p className='text-white w-1/2 mb-4'>Nested in the charming town of Oranmore, Galway, Sakura Sushi offers an authentic taste of Japan in a serene and welcoming setting. Conveniently located in the heart of Oranmore, our restaurant is easily accessible for both locals and visitors exploring the scenic west of Ireland.</p>

      <div className="h-3/4 w-3/4 mb-6">
        <MapContainer center={position} zoom={17} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Sakura Sushi <br /> sushi made right
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
