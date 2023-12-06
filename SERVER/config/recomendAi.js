const recomendFunctionDefinition =  {
    name: "getMenu",
    description: "Get Food Menu Recomendation With Limit Calorie And User Restriction Based On User Input",
    parameters: {
        type: "object",
        properties: {
            breakfast: {
                type: "string"
            },
            breakfastCalorie:{
                type: "number"
            },
            lunch: {
                type: "string"
            },
            lunchCalorie:{
                type: "number"
            },
            dinner: {
                type: "string"
            },
            dinnerCalorie:{
                type: "number"
            },
            snack: {
                type: "string"
            },
            snackCalorie:{
                type: "number"
            },
            message: {
                type: "string"
            }
       },
       required: ["breakfast", "lunch", "dinner", "snack", "string", "calorieSnack", "calorieDinner", "calorieLunch", "calorieBreakfast"]
    },
}

module.exports = recomendFunctionDefinition