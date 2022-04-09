// utility function that will send an error for us whenever there is no user:
function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireActiveUser(req, res, next) {
  if (!req.user.active) {
    next({
      name: "missingUserError",
      message: "You must be an active user to perform this action",
    });
  }
  next();
}

module.exports = {
  requireUser,
  requireActiveUser,
};
