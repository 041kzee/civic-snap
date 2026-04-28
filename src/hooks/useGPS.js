import { useState, useEffect } from 'react';

const useGPS = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { coords, error };
};

export default useGPS;
