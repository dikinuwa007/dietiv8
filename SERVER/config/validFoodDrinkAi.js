const validatorFunctionDefinition = {
    name: "checkUserInput",
    description: "Check The User Input If It A Valid Food Or Valid Drink",
    parameters: {
      type: "object",
      properties: {
        validFood: {
          type: "boolean",
        },
        validDrink: {
          type: "boolean",
        }
      },
      required: ["validFood", "validDrink"],
    },
  };

module.exports = validatorFunctionDefinition