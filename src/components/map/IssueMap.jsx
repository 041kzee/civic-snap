import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const IssueMap = ({ center = [12.9716, 77.5946], zoom = 13, issues = [], onMapClick }) => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        onClick={onMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {issues.map((issue) => (
          <Marker key={issue.id} position={[issue.lat, issue.lng]}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">{issue.title}</h3>
                <p className="text-xs text-slate-500">{issue.category}</p>
                <div className="mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full bg-slate-100`}>
                    {issue.status}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IssueMap;
