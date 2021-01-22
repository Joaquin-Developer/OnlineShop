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
const userNameElem = document.querySelector("#txtNewUsername");
const passwElem = document.querySelector("#txtNewPassword");

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

