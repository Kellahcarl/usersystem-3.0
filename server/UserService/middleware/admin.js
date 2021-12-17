// Authorization check -> isAdmin or not
module.exports = function (req, res, next) {
  // isAdmin variable encapsulated in User Schema and on JWT Token Creation,this variable is embedded
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send("Forbidden/Only Admin has access/Access Denied...");
  next();
};
