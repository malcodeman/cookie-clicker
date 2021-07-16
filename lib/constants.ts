const DEFAULT_PLANT_NAME = "Kashiwazaki-Kariwa plant";
const INITIAL_COMPONENTS = [
  {
    id: "solar_panel",
    name: "Solar Panel",
    price: 15,
    count: 0,
    perSecond: 0.1,
  },
  {
    id: "wind_turbine",
    name: "Wind Turbine",
    price: 100,
    count: 0,
    perSecond: 1,
  },
];

const EXPORTS = {
  DEFAULT_PLANT_NAME,
  INITIAL_COMPONENTS,
};

export default EXPORTS;
