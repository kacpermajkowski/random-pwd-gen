import { GenerationSettings, PasswordGenerator } from './passwordGenerator.js';
function renderPassword(password) {
    let passwordElement = document.getElementById("password");
    if (passwordElement != null) {
        passwordElement.textContent = password;
    }
    else {
        throw new Error("Could not locate element to render password in (expected #password).");
    }
}
function createGenerationSettings(form) {
    let formData = new FormData(form);
    const length = parseInt(formData.get("passwordLength")) || 64;
    const lowercase = formData.get("useLowercase")?.toString() != null;
    const uppercase = formData.get("useUppercase")?.toString() != null;
    const numbers = formData.get("useNumbers")?.toString() != null;
    const special = formData.get("useSpecialChars")?.toString() != null;
    return new GenerationSettings(length, lowercase, uppercase, numbers, special);
}
function generatePassword(gs) {
    return new PasswordGenerator(gs).generate();
}
function checkboxUpdate(checkboxes) {
    let isAtLeastOneCheckboxChecked = Array.from(checkboxes).some(i => i.checked);
    if (!isAtLeastOneCheckboxChecked) {
        document.getElementById("lowercaseCheckbox").checked = true;
    }
}
function initializeCheckboxUpdateHooks(checkboxes) {
    checkboxes.forEach(cb => {
        cb.addEventListener("change", (event) => {
            checkboxUpdate(checkboxes);
        });
    });
}
function initializeSubmitInputHook(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderAndGeneratePassword(form);
    });
}
function initializeSliderSynchronization() {
    let slider = document.getElementById("slider");
    let sliderNumber = document.getElementById("sliderNumber");
    if (slider != null && sliderNumber != null) {
        slider.addEventListener("input", (event) => {
            sliderNumber.value = slider.value;
        });
        sliderNumber.addEventListener("change", (event) => {
            slider.value = sliderNumber.value;
        });
    }
}
function renderAndGeneratePassword(form) {
    let gs = createGenerationSettings(form);
    let password = generatePassword(gs);
    renderPassword(password);
}
function getForm() {
    let form = document.getElementById("password-options-form");
    if (form == null)
        throw new Error("Could not locate input form to pull generation settings from.");
    return form;
}
function getCheckboxes() {
    let inputs = document.querySelectorAll('input[type="checkbox"]');
    if (inputs == null)
        throw new Error("Could not find any checkboxes.");
    return inputs;
}
onload = () => {
    let form = getForm();
    let checkboxes = getCheckboxes();
    initializeCheckboxUpdateHooks(checkboxes);
    initializeSubmitInputHook(form);
    initializeSliderSynchronization();
    checkboxUpdate(checkboxes);
    renderAndGeneratePassword(form);
};
