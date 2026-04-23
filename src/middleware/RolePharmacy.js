const RoleCheck = async(req,res , next)=>{

    try {
       
        if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.Role !== "Pharmacy") {
    return res.status(403).json({ message: "Access denied. Pharmacy only" });
  }

  next();

    } catch (error) {
         return res.status(500).json({ message: error.message || error });
    }

}

module.exports = RoleCheck