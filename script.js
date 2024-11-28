function getPasswordGeneratorCharPool(lowercase, uppercase, numbers, special){
    let lowercaseChars = "abcdefghijklmnoprstuvxyz";
    let uppercaseChars = lowercaseChars.toUpperCase();
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*()_+"

    let pool = (lowercase ? lowercaseChars : "") + 
           (uppercase ? uppercaseChars : "") +
           (numbers ? numberChars : "") +
           (special ? specialChars : "");

    return pool == "" ? lowercaseChars : pool;
}

function generatePassword(length = 64, lowercase = true, uppercase = true, numbers = true, special = true){
    let charPool = getPasswordGeneratorCharPool(lowercase, uppercase, numbers, special);
    let pass = "";
    for(let i = 0; i < length; i++){
        let charNumber = Math.floor(Math.random() * charPool.length);
        pass += charPool.at(charNumber);
    }
    return pass;
}

function renderNewPassword(form){
    let formData = new FormData(form);
    document.getElementById("password").textContent = generatePassword(
        length = formData.get("passwordLength"),
        lowercase = formData.get("useLowercase"),
        uppercase = formData.get("useUppercase"),
        numbers = formData.get("useNumbers"),
        special = formData.get("useSpecialChars")
    );
}

onload = () => {
    let form = document.getElementById("password-options-form");
    renderNewPassword(form);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderNewPassword(form);
    });
}