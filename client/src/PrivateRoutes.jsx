import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
const LastLocationContext = createContext();

export const LastLocationProvider = ({ children }) => {

  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            console.log("userLocation set by navigator");
          },
          (error) => {
            console.error("Error getting user location:", error);
            fetch("https://api.ipify.org?format=json")
              .then((response) => response.json()) 
              .then((data) => {
                console.log("User location from fetch:", data.ip);

                fetch(`http://ip-api.com/json/${data.ip}`)
                  .then(response => response.json())
                  .then(geolocationData => {
                    setUserLocation(geolocationData)

                  })
                  .catch(err => console.error(err));
              })
              .catch((err) => console.error(err));
          }
        );
      }
    };

    getUserLocation();
 }, []);

  const [lastLocation, setLastLocation] = useState(null);
  return (
    <LastLocationContext.Provider
      value={{ lastLocation, setLastLocation, userLocation }}
    >
      {children}
    </LastLocationContext.Provider>
  );
};

export const useLastLocation = () => useContext(LastLocationContext);

const PrivateRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLastLocation } = useLastLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLastLocation(location);
      navigate("/login");
    }
  }, [isAuthenticated, location, setLastLocation, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;
