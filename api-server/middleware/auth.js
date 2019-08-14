const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = data;
      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  } else {
    const data = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(data);
  }
};

module.exports = auth;
