module.exports = async function (req, res, next) {
    setTimeout(() => {
        console.log("Verified.");
        next();
    }, 3000);
}
