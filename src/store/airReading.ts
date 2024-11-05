import { AQIData } from "../types/airMonitoring";

import { create } from "zustand";

interface amt_data_type{
  AQI_datas:AQIData[];
  set_AQI_datas:(state:AQIData[])=>void;
  filtered_AQI_datas:AQIData[];
  set_filtered_AQI_datas:(state:AQIData[])=>void;
}
const useAqtStore = create<amt_data_type>((set) => ({
  AQI_datas:[
    {
      id: "",
      country: "",
      state: "",
      lga: "",
      city: "",
      AQI: "",
      pm_1: "",
      pm_2: "",
      pm10: "",
      temp: "",
      humidity: "",
      heat: "",
      voltage: "",
      date:"",
    },
  ],
set_AQI_datas: (state) => set({ AQI_datas: state }),
  filtered_AQI_datas:[
    {
      id: "",
      country: "",
      state: "",
      lga: "",
      city: "",
      AQI: "",
      pm_1: "",
      pm_2: "",
      pm10: "",
      temp: "",
      humidity: "",
      heat: "",
      voltage: "",
      date:"",
    },
  ],
set_filtered_AQI_datas: (state) => set({ AQI_datas: state }),

}));

export default useAqtStore;
