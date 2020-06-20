function verifyToken(req, res, next) {
  let BEARER = req.headers["authorization"];

  if (typeof BEARER !== "undefined") {
    let arr = BEARER.split(" ");
    req.token = arr[1];
    next();
  } else {
    res.sendStatus("403");
  }
}

module.exports = verifyToken;
