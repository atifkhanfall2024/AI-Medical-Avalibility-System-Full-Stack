const { CompareToken } = require("../../helpers/JWT/token");
const UserModel = require("../../models/UserModel");

const Me = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ user: null });
    }
   //console.log(token);
    const decoded = await CompareToken(token);
    //console.log(decoded.id);
    const user = await UserModel.findById(decoded.id).select('-Password');

    res.status(200).json({ user });

  } catch (err) {
    res.status(401).json({ user: null });
  }
};

module.exports = Me;