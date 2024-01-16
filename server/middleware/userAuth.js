// Middleware function to check if the user has the specified role
function authRole(role) {
  return (req, res, next) => {
    // Check if the role in the request body matches the specified role
    if (req.body.role !== role) {
      // If not, send a 401 response and stop further processing
      res.status(401).send('Not allowed');
    } else {
      // If they match, allow the request to proceed
      next();
    }
  };
}

// Export the authRole function to be used in other modules
module.exports = {
  authRole,
};
