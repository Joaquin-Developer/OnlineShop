
const router = require("express").Router();

// routes:

router.get("/", function(req, res) {
    //res.json({ project: "OnlineShop" });
    res.render("index.html");
});

module.exports = router;
