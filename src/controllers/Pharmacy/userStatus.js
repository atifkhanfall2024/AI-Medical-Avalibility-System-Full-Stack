const RequestModel = require("../../models/RequestModel");
const PharmacyModel = require("../../models/PharmacyModel");

const PharmacyRequests = async (req, res) => {
  try {

    // 1. Get pharmacy
    const pharmacy = await PharmacyModel.findOne({
      userId: req.user._id
    });
   
    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found"
      });
    }

    const pharmacyLocation = pharmacy.location.coordinates;

   
    const requests = await RequestModel.find({
      status: "pending",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: pharmacyLocation
          },
          $maxDistance: 5000
        }
      }
    }).populate("userId" , "FullName PhoneNumber");

    res.status(200).json({
      success: true,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = PharmacyRequests;