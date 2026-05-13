const ConversationalModel = require("../../models/ConversationalModel");

const GetChats = async (req, res) => {
  try {
    const { id } = req.params; 
    const userid = req.user._id;
    console.log( ' userid ' , userid);

    let chat = await ConversationalModel.findOne({
      participants: { $all: [userid, id] },
    });

    if (!chat) {
      chat = await ConversationalModel.create({
        participants: [userid, id],
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    console.log("GetChats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = GetChats;