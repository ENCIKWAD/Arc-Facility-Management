const protect = (req, res, next) => {
    if (!req.user) {
      //return res.status(401).json({ message: "Not authenticated" });
      return res.redirect('/'); // Redirect to login page if not authenticated
    }
    next(); // User is authenticated, proceed
  };
  
  const adminOnly = (req, res, next) => {
    console.log("User role:", req.user); // Log the user role for debugging
    if (!req.user) {
      //return res.status(401).json({ message: "Not authenticated" });
      return res.redirect('/'); // Redirect to login page if not authenticated
    }
  
    if (req.user.role !== "admin") {
      return res.redirect('/unauthorized'); // Redirect to unauthorized page if not an admin
    }
  
    next(); // User is an admin, proceed
  };
  
  module.exports = { protect, adminOnly };
  