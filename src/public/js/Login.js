
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
            let response = await fetch("http://127.0.0.1:54927/user_autentication", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                let loginStatus = await response.json();

                if (loginStatus.status) {
                    console.log("login correcto");
                } else {
                    console.log("login incorrecto");
                }

                if (confirm("¿Desea mantener la sesión iniciada?")) {
                    sessionStorage.setItem("user-name", data.username);
                }
            } else {
                showErrorAlert(response.statusText);                
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.error(error);
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
    
    showCreateUserForm();
});

function ocultLoginForm() {
    document.querySelector(".formLogin").classList.add("none");
}

function showCreateUserForm() {
    const form = document.getElementById("formCreateUser");
    form.classList.remove("none");
    form.classList.add("block");
}

