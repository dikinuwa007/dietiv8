const getAge = require("../helpers/getAge");
const { User } = require("../models/index");

class FitnesController {
  static async getBmi(req, res, next) {
    try {
      const { id } = req.user;
      const userFind = await User.findByPk(id);
      const axios = require("axios");

      const age = getAge(userFind.dateBirth)
      const options = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/bmi",
        params: {
          age,
          weight: userFind.weight,
          height: userFind.height,
        },
        headers: {
          "X-RapidAPI-Key": "665ed1e6f9msh6d85de1ba97e8adp1c24b6jsn6a9bcfc0b7f8",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      const {data} = await axios.request(options);
      const response = data.data
      const bmiRange = response.healthy_bmi_range.split(" ")
      const bmiMin = Number(bmiRange[0])
      const bmiMax = Number(bmiRange[2])
      const result = {
        bmiMax, bmiMin,
        bmi: response.bmi,
        health: response.health
      } 
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FitnesController;
