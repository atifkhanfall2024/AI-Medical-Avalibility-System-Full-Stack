const AdminRoleCheck = async(req,res , next)=>{

    try {
       
        if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.Role !== "Admin") {
    return res.status(403).json({ message: "Access denied."});
  }

  if(req.user.status !== "Approved"){
    return res.status(403).json({ message: "Access denied . Not Approved Yet"});
  }

  next();

    } catch (error) {
         return res.status(500).json({ message: error.message || error });
    }

}

module.exports = AdminRoleCheck