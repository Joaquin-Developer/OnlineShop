addEventListener("load", function() {
    const path = window.location.pathname;
    
    if (path === "/") {
        document.getElementsByClassName("nav-link")[0].classList.add("active");
    } else if (path === "/comprar") {
        document.getElementsByClassName("nav-link")[1].classList.add("active");
    } else if (path === "/acercade") {
        document.getElementsByClassName("nav-link")[3].classList.add("active");
    }
});
