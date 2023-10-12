function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const calculateRadius = (region) => {
  const earthRadius = 6371;
  const { latitudeDelta, longitudeDelta } = region;
  const minDelta = Math.min(latitudeDelta, longitudeDelta);
  const maxDelta = minDelta / 2;
  const maxDistance = earthRadius * 2 * Math.PI * maxDelta;
  const radius = Math.max(maxDistance / 2, 100);

  return radius * 10;
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
