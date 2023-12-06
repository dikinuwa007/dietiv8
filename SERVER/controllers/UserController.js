const bcrypt = require("bcryptjs");
const calorieLimit = require('../helpers/caloryLimit')
const { User } = require("../models");
const { createToken, verifyToken } = require("../helpers/jwt");
const axios = require("axios");
const getAge = require("../helpers/getAge");
class UserController {
  static async register(req, res, next) {
    try {
      let {
        gender,
        username,
        email,
        password,
        weight,
        height,
        dateBirth,
        activityLevel,
        extra,
        targetWeight,
      } = req.body;
      let calorieLimitVal = await calorieLimit(req.body,req.body.weight)
      let user = await User.create({
        gender,
        username,
        email,
        password,
        weight,
        height,
        dateBirth,
        activityLevel,
        extra,
        calorieLimit:calorieLimitVal,
        targetWeight,
      });
      return res.status(201).json({
        gender: user.gender,
        username: user.username,
        email: user.email,
        weight: user.weight,
        height: user.height,
        extra: user.extra,
        calorieLimit: user.calorieLimit,
        targetWeight: user.targetWeight,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "emailpasswordempty" };
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "invalid_email_password" };
      }
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw { name: "invalid_email_password" };
      }

      const payload = {
        id: user.id,
        gender: user.gender,
        username: user.username,
        email: user.email,
        weight: user.weight,
        height: user.height,
        extra: user.extra,
        calorieLimit: user.calorieLimit,
        targetWeight: user.targetWeight,
        activityLevel: user.activityLevel,
        dateBirth:user.dateBirth
      };
      const token = createToken(payload, process.env.SECRET);
      return res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

   static async userFindById(req, res, next) {
    const id = req.user.id
    try {
      let user = await User.findByPk(id)
      if(!user){
      throw{name:'not_found'}
      }
      delete user.password
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
   static async update(req, res, next) {
    const id = req.user.id
    try {
      let {
        gender,
        username,
        email,
        password,
        weight,
        height,
        dateBirth,
        activityLevel,
        extra,
        targetWeight,
      } = req.body;
      let calorieLimitVal = await calorieLimit(req.body,req.body.weight)
      let user = await User.update({
        gender,
        username,
        email,
        password:bcrypt.hashSync(password),
        weight,
        height,
        dateBirth,
        activityLevel,
        extra,
        calorieLimit:calorieLimitVal,
        targetWeight,
      },{where:{id}});
        const payload = {
        id: id,
        gender: gender,
        username: username,
        email: email,
        weight: weight,
        height: height,
        extra: extra,
        calorieLimit: calorieLimitVal,
        targetWeight: targetWeight,
        activityLevel: activityLevel,
        dateBirth:dateBirth
      };
      const token = createToken(payload, process.env.SECRET);
      return res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
