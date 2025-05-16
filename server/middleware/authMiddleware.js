const protect = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    next(); // User is authenticated, proceed
  };
  
  const adminOnly = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  
    next(); // User is an admin, proceed
  };
  
  module.exports = { protect, adminOnly };
  