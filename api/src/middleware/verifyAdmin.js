const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "ADMIN") {
    return res.sendStatus(403);
  }
  next();
};

export default verifyAdmin;
