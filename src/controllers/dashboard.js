const dashboard = function (req, res) {

    res.render("dashboard", { userisloggedin: true, Admin: true });
}

module.exports=dashboard;