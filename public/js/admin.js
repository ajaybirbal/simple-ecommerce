//Checks status of navigation menu
let menuFull = false;

$(document).ready(function () {
    //Handle navigation button
    let navButton = document.getElementById("nav_button");
    navButton.addEventListener('click', function (event) {
        toggleMenu();
    })

    //Handle add new product box
    document.getElementById("showAddProductBox").addEventListener('click', function (event) {
        showAddProductPopup();
    });
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
}

let showAddProductPopup  = function(){
    let popUp = document.getElementById("add-new-product");
    let blackOverlay = document.getElementById("black-overlay");
    let crossPopup = document.getElementById("cross-add-product");

    popUp.style.opacity = "1";
    blackOverlay.style.display = "block";

    crossPopup.addEventListener('click', event => {
        popUp.style.opacity = "0";
        blackOverlay.style.display = "none";
    })

    //Add code if someone clicks on somewhere else close the popup
}