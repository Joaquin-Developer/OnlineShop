/**
 * Register user functions (login.html)
 */

const firstNameElem = document.querySelector("#first_name");
const secondNameElem = document.querySelector("#second_name");
const firstSurnameElem = document.querySelector("#first_surname");
const secondSurnameElem = document.querySelector("#second_surname");
const emailElem = document.querySelector("#email");
const dirElem = document.querySelector("#dir");
const verificationCodeElem = document.querySelector("#verification_code");
const btnVerificationCode = document.getElementById("btnVerificationCode");
const userNameElem = document.querySelector("#txtNewUsername");
const passwElem = document.querySelector("#txtNewPassword");

const socket = io();

addEventListener("load", () => {
    btnVerificationCode.addEventListener("click", requestVerificationCode);
    verificationCodeElem.disabled = true;
});

document.querySelector("#btnRegisterUser").addEventListener("click", function(event) {

    event.preventDefault();

    if (validString(firstNameElem.value) && validString(secondNameElem.value) 
        && validString(firstSurnameElem.value) && validString(secondSurnameElem.value)
        && emailElem.value && dirElem.value && verificationCodeElem.value && userNameElem.value && passwElem.value)
    {
        // valid/not-missing data:
        alert("ok");
        // fetch request try-catch...

        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameElem.value,
                secondName: secondNameElem.value,
                firstSurname: firstSurnameElem.value,
                secondSurname: secondSurnameElem.value,
                email: emailElem.value,
                dir: dirElem.value,
                username: userNameElem.value,
                password: passwElem.value,
                verificationCode: verificationCodeElem.value
            })
        };

        // fetch ...
        
        
        
    } else {
        // if missing data:
        showErrorAlert("Error: Faltan datos y/o hay datos inválidos");    // function from Login.js
    }

});


function validString(text) {
    if (text === "") { return false; }
    let array = text.replaceAll(" ", "").split("");

    for (let i = 0; i < array.length; i++) {
        if (array[i] === "") {
            continue;
        }
        if (! isNaN(array[i])) {
            return false;
        }
    }
    return true;
}

// verification code functions:

// this function is added in eventListener from btnVerificationCode
function requestVerificationCode(event) {
    event.preventDefault();
    if (! emailElem.value) { 
        showErrorAlert("Error: Debe ingresar un email");    // function from Login.js file
        return;
    }
    socket.emit("request-verification-code", emailElem.value, (data) => {
        if (data) {
            console.log("Request verification code ok");
            // then, remove the event and add event for verify-code and set visbility:
            btnVerificationCode.removeEventListener("click", requestVerificationCode);
            btnVerificationCode.style.visibility = "hidden";
            // set input:
            document.querySelector("#verification_code").placeholder = "Ingrese código obtenido";
            verificationCodeElem.disabled = false;
        } else {
            showErrorAlert("Se produjo un error al solicitar un código de verificación.");
        }
    });

}

async function post_requestVerificationCode(event) {

    event.preventDefault();
    if (! emailElem.value) { 
        showErrorAlert("Error: Debe ingresar un email");    // function from Login.js file
        return;
    }
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: emailElem.value })
    };

    const response = await fetch("/", request);

}

