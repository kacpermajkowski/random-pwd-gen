import * as ipg from './passwordGenerator.js';

function renderPassword(password){
    document.getElementById("password").textContent = password;
}

function createGenerationSettings(form){
    let formData = new FormData(form);
    return new ipg.GenerationSettings(
        formData.get("passwordLength"),
        formData.get("useLowercase"),
        formData.get("useUppercase"),
        formData.get("useNumbers"),
        formData.get("useSpecialChars")
    );
}

function generatePassword(gs){
    return new ipg.PasswordGenerator(gs).generate();
}

function checkboxUpdate(checkboxes){
    let isAtLeastOneCheckboxChecked = Array.from(checkboxes).some(i => i.checked);
    if(!isAtLeastOneCheckboxChecked){
        document.getElementById("lowercaseCheckbox").checked = true;
    }
}

function initializeCheckboxUpdateHooks(checkboxes){
    checkboxes.forEach(cb => {
        cb.addEventListener("change", (event) => {
            checkboxUpdate(checkboxes);
        });
    });
}

function initializeSubmitInputHook(form){
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderAndGeneratePassword(form);
    });
}

function renderAndGeneratePassword(form){
    let gs = createGenerationSettings(form);
    let password = generatePassword(gs);
    renderPassword(password);
}

onload = () => {
    let form = document.getElementById("password-options-form");
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    initializeCheckboxUpdateHooks(checkboxes);
    initializeSubmitInputHook(form);

    checkboxUpdate(checkboxes);
    renderAndGeneratePassword(form);
}