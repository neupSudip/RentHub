const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }

      if (decodedData.exp < decodedData.iat) {
        return "expired";
      }

      return next();
    } else {
      res.redirect("http://localhost:5000");
    }
  } catch (error) {
    console.log(error);
  }
};
