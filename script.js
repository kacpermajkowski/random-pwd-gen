import {GenerationSettings, PasswordGenerator} from './passwordGenerator.js';

function renderPassword(password){
    document.getElementById("password").textContent = password;
}

function createGenerationSettings(form){
    let formData = new FormData(form);
    return new GenerationSettings(
        formData.get("passwordLength"),
        formData.get("useLowercase"),
        formData.get("useUppercase"),
        formData.get("useNumbers"),
        formData.get("useSpecialChars")
    );
}

function generatePassword(gs){
    return new PasswordGenerator(gs).generate();
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

function initializeSliderSynchronization(){
    let slider = document.getElementById("slider");
    let silderNumber = document.getElementById("sliderNumber");

    slider.addEventListener("input", (event) => {
        silderNumber.value = slider.value;
    })
    silderNumber.addEventListener("change", (event) => {
        slider.value = sliderNumber.value;
    })
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
    initializeSliderSynchronization();

    checkboxUpdate(checkboxes);
    renderAndGeneratePassword(form);
}