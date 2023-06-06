const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // console.log("here");
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          msg: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: "Auth Failed",
      success: false,
    });
  }
};
