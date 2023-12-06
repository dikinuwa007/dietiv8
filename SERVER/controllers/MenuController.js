const { Menu, History, sequelize, Food, FoodEaten } = require("../models/index");
const { Op } = require("sequelize");

class MenuController {
  static async getMenu(req, res, next) {
    try {
      const { historyId } = req.params;
      if (historyId) {
        throw { name: "history_not_found" };
      }
      const menuTarget = await Menu.findOne({ where: { historyId } });
      if (!menuTarget) throw { name: "menu_not_found" };
      res.status(200).json(menuTarget);
    } catch (error) {
      next(error);
    }
  }

  static async createMenu(req, res, next) {
    try {
      const { historyId } = req.params;
      const listEat = req.body;
      const newMenu = await Menu.create({
        breakfastEaten: false,
        lunchEaten: false,
        dinnerEaten: false,
        snackEaten: false,
        historyId,
        ...listEat,
      });
      res.status(201).json(newMenu);
    } catch (error) {
      next(error);
    }
  }

  static async eatMenu(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { historyId } = req.params;
      let { eaten, calorie, name } = req.body;
      calorie = Number(calorie)
      if (calorie == "") {
        throw { name: "calorie_null" };
      }
      if (eaten == "") {
        throw { name: "eaten_null" };
      }
      const eatenBool = `${eaten}Eaten`;
      const historyTarget = await History.findByPk(historyId);
      const calorieGain = historyTarget.calorieGain + calorie;
      const isOver = calorieGain > historyTarget.calorieLimit;
      await Menu.update(
        { [eatenBool]: true },
        { where: { historyId } },
        { transaction: t }
      );
      await History.update(
        { isOver, calorieGain },
        { where: { id: historyId } },
        { transaction: t }
      );
      const foodTarget = await Food.findOrCreate(
        {
          where: { name: { [Op.iLike]: `${name}` } },
          defaults: {
            name,
            calorie,
          },
          transaction: t
        }
      );
      await FoodEaten.create({foodId: foodTarget[0].id, historyId}, {transaction: t})
      await t.commit();
      res.status(201).json({ message: "Food has been inputed" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = MenuController;
