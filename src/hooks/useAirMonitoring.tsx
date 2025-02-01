import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "@api/index";
import { AMD_type_v2 } from "../types/airMonitoring";

// Define the interface for each air monitoring detail item


interface UseAirMonitoringReturn {
  // AirMonitoringDetails: AirMonitoringDetail[];
  AirMonitoringDetails: AMD_type_v2[];
  loading: boolean;
  numberOfStates: number;
}

const useAirMonitoring = (): UseAirMonitoringReturn => {
  const [AirMonitoringDetails, setAirMonitoringDetails] = useState<
  AMD_type_v2[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfStates, setNumberOfStates] = useState<number>(0);

  // Fetch air monitoring details from the API
  const fetchAirMonitoringDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/air-monitoring`);
      // console.log("fetchAirMonitoringDetails", response);

      if (response.status === 200 || response.data.status === "success") {
        setAirMonitoringDetails(response.data.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Error fetching air monitoring details");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch state from Google Geocoding API
  const getStateFromCoordinates = async (lat: number, lon: number) => {
    const apiKey = "AIzaSyDzofLb9GTpwTJDg2U-l0Ez-Ya4iw5dVss"; // Your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        // Iterate over address components to find the state
        const result = data.results[0];
        const stateComponent = result.address_components.find(
          (component: { types: string | string[] }) =>
            component.types.includes("administrative_area_level_1")
        );
        return stateComponent ? stateComponent.long_name : null;
      } else {
        throw new Error("Geocoding API error");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUniqueStatesCount = async () => {
    const uniqueStates = new Set();
    for (const item of AirMonitoringDetails) {
      const state = await getStateFromCoordinates(item.lat, item.lon);
      if (state) {
        uniqueStates.add(state);
      }
    }
    setNumberOfStates(uniqueStates.size);
  };

  useEffect(() => {
    fetchAirMonitoringDetails();
  }, []);

  useEffect(() => {
    if (AirMonitoringDetails.length > 0) {
      getUniqueStatesCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AirMonitoringDetails]);

  return { AirMonitoringDetails, loading, numberOfStates };
};

export default useAirMonitoring;
