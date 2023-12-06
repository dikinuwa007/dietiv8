const { Food, sequelize, FoodEaten, History } = require("../models");
const { Op } = require("sequelize");
const OpenAiController = require("../controllers/OpenAiController");

function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

class FoodController {
  static async filterFoods(req, res, next) {
    try {
      let option = {};
      let { filter } = req.query;
      if (filter) {
        option.where = { name: { [Op.iLike]: `%${filter}%` } };
      }
      option.order = [["name", "ASC"]];
      const foods = await Food.findAll(option);
      // if(!foods){
      // throw{name:'internal server error'}
      // }
      res.status(200).json(foods);
    } catch (error) {
      next(error);
    }
  }

  static async inputFood(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { historyId } = req.params;
      // if(historyId)
      const { food } = req.body;
      if (!food) {
        throw { name: "food_null" };
      }
      const historyTarget = await History.findByPk(historyId);

      if (!historyTarget) {
        throw { name: "history_not_found" };
      }

      let foodEaten = await Food.findOne({
        where: { name: { [Op.iLike]: food } },
      });
      if (!foodEaten) {
        const { name, calorie, isError, errorMessage } =
          await OpenAiController.countCalorie(food);
        if (isError) throw { name: "invalid_food", message: errorMessage }; //for testing
        foodEaten = await Food.create({ name, calorie }, { transaction: t });
      }
      const calorieGain = historyTarget.calorieGain + foodEaten.calorie;
      const isOver = calorieGain > historyTarget.calorieLimit;
      await FoodEaten.create(
        { foodId: foodEaten.id, historyId },
        { transaction: t }
      );
      await History.update(
        { isOver, calorieGain },
        { where: { id: historyId } },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json({ message: "Food has been inputed" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = FoodController;
