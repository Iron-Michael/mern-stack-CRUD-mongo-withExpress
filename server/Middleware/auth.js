const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      res.status(401).send(401);
    }

    const decoded = jwt.verify(token, "jwtsecret");
    req.body = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
};
