const RequestModel = require("../../models/RequestModel");

const SetStatus = async(req,res)=>{

    try {
        
          const { id, status } = req.params;

    const updated = await RequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated
    });

 } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

}

module.exports = SetStatus