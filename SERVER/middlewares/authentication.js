const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthenticated" };
    }
    const payload = verifyToken(access_token); 
    const find = await User.findByPk(payload.id);
    // if (!find) {
    //   throw { name: "unauthenticated" };
    // }

    req.user = {
      id: find.id,
      calorieLimit: find.calorieLimit,
      weight: find.weight,
      activityLevel:find.activityLevel,
      height:find.height,
      dateBirth:find.dateBirth,
      gender:find.gender,
      extra: find.extra
    };
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = { authentication };
