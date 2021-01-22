
const btnLogin = document.getElementById("btnLogin");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");

// Login send-form event:
btnLogin.addEventListener("click", async function(event) {
    event.preventDefault();

    if (inputUsername.value && inputPassword.value) {
        
        const data = {
            username: inputUsername.value,
            password: inputPassword.value
        }
        try {
            const request = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            // fetch("")
            //     .then()
            //     .catch();


            let response = await fetch("/login-autentication", request);

            if (response.ok) {
                // show html ...

                // programar ...

                console.log("ok");
            } else {
                showErrorAlert(response.statusText);                
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.error("Error: " + error);
        }

    } else {
        showErrorAlert("Error: Debe indicar su usuario y contraseña");
        console.error("Data missing: username/password");
    }

});

function showErrorAlert(errorText) {

    const errorAlert = document.getElementById("errorLogin");
    // primero, elimino los childs del errorAlert en caso de tenerlos:
    if (errorAlert.firstChild) { 
        errorAlert.removeChild(errorAlert.firstChild);
    }
    // luego, agrego el nuevo child:
    errorAlert.appendChild(document.createTextNode(errorText));
    errorAlert.style.display = "block";  // hacemos visible

    setTimeout(() => {
        errorAlert.style.display = "none";  // luego de 5 seg, hacemos invisible
    }, 5000);
}

// check show-password event:
const checkShowPassword = document.getElementById("checkShowPassword");

checkShowPassword.addEventListener("change", () => {
    if (checkShowPassword.checked)
        inputPassword.type = "text";
    else
        inputPassword.type = "password";
});

// Show form create user:
document.getElementById("createUser").addEventListener("click", (event) => {
    
    event.preventDefault();
    ocultLoginForm();
    // change title:
    const showFormElem = document.querySelector(".showFormRegisterUser")
    // remove childs:
    while (showFormElem.firstChild) {
        showFormElem.removeChild(showFormElem.firstChild);
    }
    let h2Elem  = document.createElement("H2");
    h2Elem.appendChild(document.createTextNode("Registro de Usuario:"));
    showFormElem.appendChild(h2Elem);
    
    showCreareUserForm();
});

function ocultLoginForm() {
    document.querySelector(".formLogin").classList.add("none");
}

function showCreareUserForm() {
    const form = document.getElementById("formCreateUser");
    form.classList.remove("none");
    form.classList.add("block");
}
