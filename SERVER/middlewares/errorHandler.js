function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  // console.log(err,'<<<<ERRORRRRR');
  if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = `Email Already Exists`;
  } else if (err.name === "current_weight") {
    status = 400;
    message = `Current Weight is required`;
  } else if (err.name === "calorie_null") {
    status = 400;
    message = `Calorie is required`;
  } else if (err.name === "eaten_null") {
    status = 400;
    message = `Eaten is required`;
  } else if (err.name === "invalid_email_password") {
    status = 401;
    message = `error invalid email or password`;
  }
  // else if (err.name === "not_found") {
  //     status = 404;
  //     message = `data with id ${err.id} not found`;
  //   }
  else if (err.name === "forbidden") {
    status = 403;
    message = `forbidden`;
  } else if (err.name === `SequelizeValidationError`) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "menu_not_found") {
    status = 404;
    message = "Menu Recommendation Is Empty Try Create One";
  } else if (err.name === "history_not_found") {
    status = 404;
    message = "History Is Not Found";
  } else if (err.name === "invalid_food") {
    status = 401;
    message = err.message;
  }
  // else if (err.name === "agent_error") {
  //     status = 500
  //     message = 'Open Api Error'
  //   }
  // else if (err.name === "menurec_error") {
  //     status = 500
  //     message = 'Open Api Error'
  //   }
  // else if (err.name === "age_not_found") {
  //     status = 400
  //     message = "Date Of Birth Required"
  //   }
  else if (err.name === "food_null") {
    status = 400;
    message = "Food is required";
  }
  res.status(status).json({ message });
}
module.exports = errorHandler;
