
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
            let response = await fetch("/login-autentication", request);

            if (response.ok) {
                // show html ...
                console.log("ok");
            } else {
                console.log(response.data);
                
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.error("Error: " + error);
        }

    } else {
        // data missing
        console.error("Data missing: username/password");
    }

});

// check show-password event:
const checkShowPassword = document.getElementById("checkShowPassword");

checkShowPassword.addEventListener("change", function() {
    if (checkShowPassword.checked)
        inputPassword.type = "text";
    else
        inputPassword.type = "password";
});

