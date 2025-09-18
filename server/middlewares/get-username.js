module.exports = async function (req, res, next) {
    console.log("MiddleWare chala bhai.")
    next();
}
