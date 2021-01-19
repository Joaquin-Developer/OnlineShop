addEventListener("load", function() {
    const path = window.location.pathname;
    
    if (path === "/") {
        document.getElementById("navLinkHome").classList.add("active");
    } else if (path === "/search") {
        document.getElementById("navLinkSearch").classList.add("active");
    } else if (true) {
        // completar con los demás ...
    }
});
