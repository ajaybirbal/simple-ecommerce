//Checks status of navigation menu
let menuFull = false;

$(document).ready(function () {
    //Handle navigation button
    let navButton = document.getElementById("nav_button");
    navButton.addEventListener('click', function (event) {
        toggleMenu();
    })
});

let toggleMenu = function () {
    let menuArea = document.getElementById("nav_container");
    let containerArea = document.getElementsByClassName("body_container")[0];

    if (menuFull) {
        menuArea.style.left = "-135px";
        containerArea.style.left = "85px";
        menuFull = false;
    } else {
        menuArea.style.left = "0%";
        containerArea.style.left = "220px";
        menuFull = true;
    }

    console.log(menuFull);
}