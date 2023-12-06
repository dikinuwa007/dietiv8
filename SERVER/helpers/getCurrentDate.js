function getCurrentDate() {
    const currentString = new Date().toLocaleDateString();
    const currentDate = new Date(currentString)
    return currentDate
}
module.exports = getCurrentDate