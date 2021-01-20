
const router = require("express").Router();

// routes:

router.get("/", function(request, response) {
    //res.json({ project: "OnlineShop" });
    response.render("index.html", { title: "Home - Online Shop v1.0" });
});

module.exports = router;
