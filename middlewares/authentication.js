const { User } = require("../models");
const { decodetoken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const readToken = decodetoken(access_token);
    const user = await User.findOne({ where: { id: readToken.id } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
