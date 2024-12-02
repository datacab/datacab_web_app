import { AMD_type_v2 } from "../types/airMonitoring";

import { create } from "zustand";

interface amt_data_type{
  AQI_datas:AMD_type_v2[] | undefined;
  set_AQI_datas:(state:AMD_type_v2[] | undefined)=>void;
  filtered_AQI_datas:AMD_type_v2[] | undefined;
  set_filtered_AQI_datas:(state:AMD_type_v2[] | undefined)=>void;
}
const useAqtStore = create<amt_data_type>((set) => ({
  AQI_datas: [
    {
      id: "",
      device_uid: "",
      serial_number: "",
      location: "",
      lat: 0,
      lon:0,
      createdAt:"",
     updatedAt: "",
      airReading: [
        {
          id: "",
          aqi: 0,
          humidity:0,
          pm01_0: 0,
          pm02_5: 0,
          pm10_0: 0,
          pressure: 0,
          temperature: 0,
          voltage: 0,
          device_uid: "",
          captured: 0,
          createdAt: "",
          updatedAt: "",
          airQualityReadingId: ""
        },
       
      ],
      histories: [
        {
          id: "",
          date: "",
          aqi: 0,
          pm1_0: 0,
          pm2_5: 0,
          pm10_0: 0,
          aiReadingId: ""
        },
      ]
    }
  ],
set_AQI_datas: (state) => set({ AQI_datas: state }),
  filtered_AQI_datas:[
    {
      id: "",
      device_uid: "",
      serial_number: "",
      location: "",
      lat: 0,
      lon:0,
      createdAt:"",
     updatedAt: "",
      airReading: [
        {
          id: "",
          aqi: 0,
          humidity:0,
          pm01_0: 0,
          pm02_5: 0,
          pm10_0: 0,
          pressure: 0,
          temperature: 0,
          voltage: 0,
          device_uid: "",
          captured: 0,
          createdAt: "",
          updatedAt: "",
          airQualityReadingId: ""
        },
       
      ],
      histories: [
        {
          id: "",
          date: "",
          aqi: 0,
          pm1_0: 0,
          pm2_5: 0,
          pm10_0: 0,
          aiReadingId: ""
        },
      ]
    }
  ],
set_filtered_AQI_datas: (state) => set({ AQI_datas: state }),

}));

export default useAqtStore;
