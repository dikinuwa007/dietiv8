const calorieFunctionDefinition = {
  name: "getFoodCalorie",
  description: "Get Food Or Drink Calorie Based On User Input",
  parameters: {
    type: "object",
    properties: {
      calorie: {
        type: "integer",
      },
      name: {
        type: "string",
      },
      isError: {
        type: "boolean"
      },
      errorMessage: {
        type: "string"
      }
    },
    required: ["calorie", "name", "isError"],
    // required: ["calorie", "name"],
  },
};

module.exports = calorieFunctionDefinition