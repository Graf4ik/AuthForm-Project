document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const form = document.querySelector("form");

    const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    /* Password character conversion */

    [].forEach.call(document.querySelectorAll("Input"), function (input) {
        input.oninput = function () {
            input.value = input.value.replace(/./gm, "*");
            input.style.fontFamily = "'Calisto MT Regular'"
            input.style.letterSpacing = "3px"
        };
    });

    /* Resize */

    let doResize = true;

    $(window).resize(function () {

        if (doResize) {
            document.querySelector("form").style.backdropFilter = "blur(10px)"
            document.querySelector("form").style.boxShadow = "0 2px 32px rgba(0,0,0,0.5)";
        } else {
            doResize = false;
        }
        setTimeout(function () {
            document.querySelector("form").style.backdropFilter = "none"
            document.querySelector("form").style.boxShadow = "none";
        }, 500);
    });

    /* Telephone mask */

    $(function () {
        $("#inputTel").mask("8(***)-***-**-**");
    });

    /* Validator */

    const validateElem = (elem) => {
        
        if (elem.name === "password") {
            if (elem.value.length < 5 && elem.value != '') {
                elem.nextElementSibling.textContent = "Пароль должен содержать минимум 5 символов";
            } else {
                elem.nextElementSibling.textContent = "";
            }
        }

        if (elem.name === 'tel') {
            if (!regex.test(elem.value)) {
                document.getElementById("Img").style.display = "Block";
                elem.style.color = "#b40000";
            } else {
                elem.nextElementSibling.textContent = "";
                document.getElementById("Img2").style.display = "Block";
            }
        }
    }
    /* Blur */

    for (let elem of form.elements) {
        if (
            !elem.classList.contains('form-check') &&
            elem.tagName != 'BUTTON'
        ) {
            elem.addEventListener("blur", () => {
                validateElem(elem);
            });
        }
    }

    /* Input screening out */

    form.addEventListener("submit", (even) => {
        even.preventDefault();

        for (let elem of form.elements) {
            if (!elem.classList.contains('form-check') && elem.tagName != 'BUTTON') {
                if (elem.value === "") {
                    elem.nextElementSibling.textContent = "Данное поле не заполнено!";
                } else {
                    elem.nextElementSibling.textContent = "";
                }
            }
        }
    });

    /* Enable button */

    $(document).ready(function (){
        enableButton();
        $('#inputTel, #inputPassword').change(enableButton);
    });
    
    function enableButton(){
        if (regex.test($('.tel').val()) &&
            $('#inputPassword').val().length  >= 5) {
            $('.btn').attr("disabled", false);
        }
        else {
            $('.btn').attr("disabled", true);
        }
    }
});