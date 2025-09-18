const { getUsername } = require("../middlewares/get-username");

module.exports.userController = async function (req, res) {
    try {

        const response = await fetch("https://api.api-ninjas.com/v1/randomuser", {
            headers: {
                'X-Api-Key': '1CES/KHMQYvawK9VS/NRBQ==1Z3VR9Df2AsMr1ic'
            }
        });
        const userdata = await response.json();
        if (userdata.message) {
            console.log(userdata.message);
            // res.redirect('/');
        }

        res.render("pages/userData", { userdata });
    }
    catch {
        console.log("Cannot get user data!");
        res.send("Process Failure, please go back!")
    }
    // res.redirect("/");
}