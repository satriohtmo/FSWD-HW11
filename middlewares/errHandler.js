const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ statusCode: 400, message: err.errors[0].message });
      break;
    case "EmailRequired":
      res.status(400).json({ statusCode: 400, message: "Email is required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ statusCode: 400, message: "Password is required" });
      break;
    case "Unauthorized":
      res.status(400).json({ statusCode: 400, message: "Invalid name / password" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ statusCode: 401, message: "Please Log-in first" });
      break;
    case "Forbidden":
      res.status(403).json({ statusCode: 403, message: "You dont have access" });
      break;
    case "NotFound":
      res.status(404).json({ statusCode: 404, message: "Data not found" });
      break;
    default:
      res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
