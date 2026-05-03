const axios = require("axios");
require('dotenv').config()
const getCoordinates = async (address) => {
  try {
    const API = process.env.KEY;
    console.log("api " , API);
    console.log("address " , address);

    const res = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: address,
          key: API,
        },
      }
    );

    const data = res.data;

    if (!data.results.length) {
      throw new Error("Invalid address");
    }

    const { lng, lat } = data.results[0].geometry;

    return [lng, lat];
  } catch (error) {
    throw new Error(error.message || "Geocoding failed");
  }
};

module.exports = getCoordinates;