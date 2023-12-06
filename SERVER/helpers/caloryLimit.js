const axios = require('axios')

async function setCaloryLimit(user, currentWeight) {
  let dob = new Date(user.dateBirth);
  let month_diff = new Date() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = Math.abs(year - 1970);
  // console.log(user.activityLevel,'<<<<<<<<<<<<<<<<');
  let activitylevel = "level_" + user.activityLevel;
//   console.log('age=',age,'|| gender==',user.gender,'|| height=',user.height,'|| weight==',currentWeight,'||activityLevel==',activitylevel);
  const options = {
    method: "GET",
    url: "https://fitness-calculator.p.rapidapi.com/dailycalorie",
    params: {
      age: age,
      gender: user.gender,
      height: user.height,
      weight: currentWeight,
      activitylevel: activitylevel,
    },
    headers: {
      "X-RapidAPI-Key": "665ed1e6f9msh6d85de1ba97e8adp1c24b6jsn6a9bcfc0b7f8",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    },
  };
  try {
    const { data } = await axios(options);
    let calorieLimit = Math.round(data.data.BMR);
    // console.log(calorieLimit);
    return calorieLimit;
  } catch (error) {
    // console.log(error);
    return null;
  }
}
module.exports=setCaloryLimit