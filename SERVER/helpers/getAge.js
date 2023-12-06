function getAge(dateBirth) {
  let today = new Date();
  if(typeof dateBirth === "string") dateBirth = new Date(dateBirth)
  let age = today.getFullYear() - dateBirth.getFullYear();
  let m = today.getMonth() - dateBirth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < dateBirth.getDate())) {
//       age--;
//   }
  return age;
//   let dob = new Date(dateBirth);
//   let month_diff = new Date() - dob.getTime();
//   let age_dt = new Date(month_diff);
//   let year = age_dt.getUTCFullYear();
//   let age = Math.abs(year - 1970);
//   return age;
}

module.exports = getAge;
