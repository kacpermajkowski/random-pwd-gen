import {GenerationSettings, PasswordGenerator} from './passwordGenerator.js';

function renderPassword(password: string){
    let passwordElement = document.getElementById("password");
    if(passwordElement != null){
        passwordElement.textContent = password;
    } else {
        throw new Error("Could not locate element to render password in (expected #password).");
    }
}

function createGenerationSettings(form: HTMLFormElement): GenerationSettings {
    let formData = new FormData(form);

    const length = parseInt(formData.get("passwordLength") as string) || 64; 
    const lowercase = formData.get("useLowercase")?.toString() != null;
    const uppercase = formData.get("useUppercase")?.toString() != null;
    const numbers = formData.get("useNumbers")?.toString() != null;
    const special = formData.get("useSpecialChars")?.toString() != null;

    return new GenerationSettings(length, lowercase, uppercase, numbers, special);
}

function generatePassword(gs: GenerationSettings): string{
    return new PasswordGenerator(gs).generate();
}

function checkboxUpdate(checkboxes: NodeListOf<HTMLInputElement>){
    let isAtLeastOneCheckboxChecked = Array.from(checkboxes).some(i => i.checked);
    if(!isAtLeastOneCheckboxChecked){
        (document.getElementById("lowercaseCheckbox") as HTMLInputElement).checked = true;
    }
}

function initializeCheckboxUpdateHooks(checkboxes: NodeListOf<HTMLInputElement>){
    checkboxes.forEach(cb => {
        cb.addEventListener("change", (event) => {
            checkboxUpdate(checkboxes);
        });
    });
}

function initializeSubmitInputHook(form: HTMLFormElement){
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderAndGeneratePassword(form);
    });
}

function initializeSliderSynchronization(){
    let slider = document.getElementById("slider") as HTMLInputElement;
    let sliderNumber = document.getElementById("sliderNumber") as HTMLInputElement;

    if(slider != null && sliderNumber != null){
        slider.addEventListener("input", (event) => {
            sliderNumber.value = slider.value;
        })
        sliderNumber.addEventListener("change", (event) => {
            slider.value = sliderNumber.value;
        })
    }
}

function renderAndGeneratePassword(form: HTMLFormElement){
    let gs = createGenerationSettings(form);
    let password = generatePassword(gs);
    renderPassword(password);
}

function getForm(): HTMLFormElement{
    let form: HTMLFormElement | null = document.getElementById("password-options-form") as HTMLFormElement;
    if(form == null)
        throw new Error("Could not locate input form to pull generation settings from.");
    return form;
}

function getCheckboxes(): NodeListOf<HTMLInputElement>{
    let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    if(inputs == null)
        throw new Error("Could not find any checkboxes.")
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
}