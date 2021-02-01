const { response } = require("express");
const database = require("../controllers/DatabaseQueries");
const router = require("express").Router();

// routes:

router.get("/", function(request, response) {
    //res.json({ project: "OnlineShop" });
    response.render("index.html", { title: "Home - Online Shop v1.0" });
});

router.get("/login", function(req, res) {
    // get html/css/js login
    res.render("login.html", { title: "Login - Online Shop v1.0" });
});

router.post("/login_autentication", database.login);

router.post("/request-code-verification", (req, res) => {
    
    if (searchMailInArray(req.body.mail)) {
        res.json({ status: false });

    } else {
        // mail not missing in array:
        const code = createVerificationCode();
        allCodes.push({
            code: code,
            mail: req.body.mail,
        });
        res.json({ status: true, mail: mail, code: code });
    }

});



// router.post("loginautentication", )

// invalid routes:
// router.get("*", function(req, res) {
//     res.status(404).send("<h1>404 - Not Found</h1><hr><p>Ruta inválida</p>");
// });

// Verification-code LOGINC:

// all verification codes:
let allCodes = [];

function createVerificationCode() {
    let code = null;
    do {
        code = Math.round(Math.random() * 999999);  // 6 digits
    } while(searchCodeInArray(code) === false);

    return code;
}

/**
 * Optimizar las dos funciones de abajo:
 * podrían ser una sola función, y mas óptima :)
 */

function searchMailInArray(mail) {
    if (allCodes.length === 0) return false;
    for (const elem of allCodes) {
        if (elem.mail === mail) return true;
    }
    return false;
}

function searchCodeInArray(code) {
    // return true if the code belongs to the array
    /**
     * Optimizar esta función
     * mas adelante implementar busqueda binaria (los códigos deberían estar ordenados)...
     */
    if (allCodes.length === 0) return false;

    for (const elem of allCodes) {
        if (elem.code === code) return true;
    }
    return false;
}

function verifyVerificationCode(code, mail) {
    for (const elem of allCodes) {
        if (elem.code === code && elem.mail === mail) return true;
    }
    return false;
}

// export Routes:
module.exports = router;
