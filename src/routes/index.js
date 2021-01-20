const { response } = require("express");

const router = require("express").Router();

// routes:

router.get("/", function(request, response) {
    //res.json({ project: "OnlineShop" });
    response.render("index.html", { title: "Home - Online Shop v1.0" });
});

router.get("/login", function(req, res) {
    res.render("login.html", { title: "Login - Online Shop v1.0" });
});

router.post("/login-autentication", function(req, res) {

    res.status(500).send("ERROR DE LOGIN");

});


module.exports = router;
