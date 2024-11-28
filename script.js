import * as ipg from './passwordGenerator.js';

function renderNewPassword(form){
    let formData = new FormData(form);
    let gs = new ipg.GenerationSettings(
        formData.get("passwordLength"),
        formData.get("useLowercase"),
        formData.get("useUppercase"),
        formData.get("useNumbers"),
        formData.get("useSpecialChars")
    );

    document.getElementById("password").textContent = new ipg.PasswordGenerator(gs).generate();
}

onload = () => {
    let form = document.getElementById("password-options-form");

    renderNewPassword(form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderNewPassword(form);
    });
}