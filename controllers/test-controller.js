module.exports.testController = function (req, res) {
    const gotData = req.body;
    console.log("Received this:", gotData);
    res.status(200).json({ message: "Client data received.", gotData })
}