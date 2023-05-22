const jwt = require("jsonwebtoken");
const secretKey = "apaya";

function generateToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

function decodetoken(token) {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}

module.exports = {
  generateToken,
  decodetoken,
};
