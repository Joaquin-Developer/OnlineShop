
const router = require("express").Router();

// routes:

router.get("/", function(request, response) {
    //res.json({ project: "OnlineShop" });
    res.render("index.html");
});

module.exports = router;
