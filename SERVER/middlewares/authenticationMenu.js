const { Menu, History } = require("../models/index")

async function validMenu(req, res, next) {
    try {
        const userId = req.user.id
        const { historyId } = req.params
        const historyTarget = await History.findOne({where: {id: historyId}})
        if(!historyTarget) throw({name: "history_not_found"})
        if(historyTarget.userId !== userId) throw({name: "forbidden"})
        next()
    } catch(error) {
        next(error)
    }
}

module.exports = validMenu