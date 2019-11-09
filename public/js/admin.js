//Simple ui effects goes here

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
    let burger_1 = document.getElementById("burger_1");
    let burger_2 = document.getElementById("burger_2");
    let burger_3 = document.getElementById("burger_3");
    
    if (menuFull) {
        menuArea.style.left = "-135px";
        containerArea.style.left = "85px";
        
        burger_1.classList.add("burger_1_reverse");
        burger_2.classList.add("burger_2_reverse");
        burger_3.classList.add("burger_3_reverse");

        burger_1.classList.remove("burger_1_animation");
        burger_2.classList.remove("burger_2_animation");
        burger_3.classList.remove("burger_3_animation");
        
        menuFull = false;
    } else {
        menuArea.style.left = "0%";
        containerArea.style.left = "220px";

        //Animates menu burger
        burger_1.classList.add("burger_1_animation");
        burger_2.classList.add("burger_2_animation");
        burger_3.classList.add("burger_3_animation");
        menuFull = true;

        burger_1.classList.remove("burger_1_reverse");
        burger_2.classList.remove("burger_2_reverse");
        burger_3.classList.remove("burger_3_reverse");
    }
}

