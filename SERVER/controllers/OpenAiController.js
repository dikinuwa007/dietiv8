const agent = require("../config/configOpenAi");

class OpenAiController {
  static async getMenu(req, res, next) {
    try {
      const { calorieLimit, extra } = req.user;
      // const caloryLimit = 1400
      // const extra = ""
      let promtRec = `Get healthy menu food for 1 day with calorie limit ${calorieLimit}`;
      if (extra) promtRec += `With Restriction ${extra}`;
      const menuRec = await agent(promtRec);
    //   if (!menuRec) {
    //     throw { name: "menurec_error" };
    //   }
      res.status(201).json(menuRec);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async countCalorie(food) {
    try {
      // const { food } = req.params
      const countCalorieAgent = await agent(
        //old countCalorie
        `Count the food/drink calorie of ${food}`
      );
      // if(!countCalorieAgent){
      //   throw{name:'agent_error'}
      //   }
      return countCalorieAgent; //old countCalorie
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OpenAiController;
